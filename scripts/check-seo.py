"""Audit a Next static export using only Python's standard library.

Run after the production build:
  python scripts/check-seo.py --output-dir PATH [--live]
Live mode performs read-only requests to the canonical public URLs.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import argparse, csv, json, subprocess, xml.etree.ElementTree as ET

class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.title=[]; self.headings=[]; self.meta={}; self.canonicals=[]
        self.links=[]; self.assets=[]; self.schemas=[]; self.errors=[]
        self.capture=None; self.buffer=[]; self.ignore=0
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical': self.canonicals.append(a.get('href',''))
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag in ['img','script'] and a.get('src'): self.assets.append(a['src'])
        if tag=='link' and a.get('rel') in ['stylesheet','icon','manifest']: self.assets.append(a.get('href',''))
        if tag=='title' or tag=='h1' or (tag=='script' and a.get('type')=='application/ld+json'):
            self.capture=tag; self.buffer=[]
    def handle_data(self, data):
        if self.capture: self.buffer.append(data)
    def handle_endtag(self,tag):
        if tag==self.capture:
            value=''.join(self.buffer).strip()
            if tag=='title': self.title.append(value)
            elif tag=='h1': self.headings.append(value)
            else:
                try: self.schemas.append(json.loads(value))
                except Exception as e: self.errors.append(str(e))
            self.capture=None; self.buffer=[]

def local_file(base, href):
    path=unquote(urlsplit(urljoin(base,href)).path)
    target=export/path.lstrip('/')
    if path.endswith('/') or target.is_dir(): target=target/'index.html'
    if not target.exists() and not target.suffix: target=target/'index.html'
    return target

parser=argparse.ArgumentParser(); parser.add_argument('--output-dir',required=True); parser.add_argument('--live',action='store_true')
args=parser.parse_args(); root=Path(__file__).resolve().parents[1]; export=root/'out'
output=Path(args.output_dir); output.mkdir(parents=True,exist_ok=True)
urls=[x.text for x in ET.parse(export/'sitemap.xml').findall('.//{*}loc')]
rows=[]; issues=[]; incoming={u:set() for u in urls}
updated=['/games/','/games/firefight/','/games/webrise-farm/','/games/tank-arena/','/games/word-lock/','/blog/10-quick-games-5-minutes/','/blog/15-free-browser-games-no-download/']
keywords={'/':'free browser games','/games/':'online browser games','firefight':'3D browser shooter','webrise-farm':'farming browser game','tank-arena':'tank browser game','word-lock':'five letter word game online','10-quick-games-5-minutes':'quick browser games','15-free-browser-games-no-download':'best browser games no download','circel':'shape drawing game','where-am-i':'location guessing game','wild-arena':'browser survival arena game','lock-in':'marker timing game','stack':'tower stacking game','getaway':'arcade police chase game','cell-rush':'cell growth arena game','dont-touch-red':'red hazard reaction game','chess':'browser chess against computer','x0-arena':'3D tic tac toe','build-life':'screen time interactive experiment','little-explorer':'3D village exploration game','let-it-grow':'driving and farm building game'}
for url in urls:
    path=urlsplit(url).path; file=local_file(url,url)
    if not file.exists(): issues.append({'url':url,'issue':'Missing sitemap document'}); continue
    doc=Document(file.read_text(encoding='utf8')); page_issues=[]
    if len(doc.title)!=1 or not doc.title[0]: page_issues.append('Title missing or repeated')
    if not doc.meta.get('description'): page_issues.append('Missing description')
    if doc.canonicals!=[url]: page_issues.append('Canonical differs from sitemap URL or is missing/repeated')
    if not doc.headings: page_issues.append('No initial HTML H1')
    if len(doc.headings)>1: page_issues.append('Multiple initial HTML H1s')
    if 'noindex' in doc.meta.get('robots','').lower(): page_issues.append('Sitemap contains noindex')
    if not doc.meta.get('og:title'): page_issues.append('Missing Open Graph title')
    if doc.errors: page_issues.append('Invalid JSON-LD')
    broken=[]
    for href in doc.links:
        destination=urljoin(url,href); parts=urlsplit(destination)
        if parts.netloc!='webrisehub.com': continue
        canonical=parts._replace(query='',fragment='').geturl()
        if canonical in incoming and canonical!=url: incoming[canonical].add(url)
        if not local_file(url,href).exists(): broken.append(href)
    missing_assets=[asset for asset in doc.assets if urlsplit(urljoin(url,asset)).netloc=='webrisehub.com' and not local_file(url,asset).exists()]
    if broken: page_issues.append('Broken local anchors: '+', '.join(sorted(set(broken))))
    if missing_assets: page_issues.append('Missing HTML-linked assets: '+', '.join(missing_assets))
    for issue in page_issues: issues.append({'url':url,'issue':issue})
    source_path='public'+path+'index.html'
    before=None
    try: before=Document(subprocess.check_output(['git','show','HEAD:'+source_path],cwd=root,stderr=subprocess.DEVNULL).decode('utf8'))
    except subprocess.CalledProcessError: pass
    slug=path.strip('/').split('/')[-1]
    rows.append({'url':url,'primary_keyword':keywords.get(path,keywords.get(slug,doc.headings[0] if doc.headings else 'needs review')),'title':' | '.join(doc.title),'description':doc.meta.get('description',''),'h1':' | '.join(doc.headings),'canonical':' | '.join(doc.canonicals),'robots':doc.meta.get('robots','index, follow (default)'),'status':'updated' if path in updated else ('needs review' if page_issues else 'unchanged'),'internal_link_recommendation':'Keep relevant category, game and guide links; review low incoming counts below.','issues':' ; '.join(page_issues),'baseline_title':before.title[0] if before and before.title else ''})
for row in rows:
    row['incoming_pages']=len(incoming[row['url']]); row['incoming_sources']=' ; '.join(sorted(incoming[row['url']]))
    path=urlsplit(row['url']).path
    row['internal_link_recommendation']=(
        'Keep links from Action and Games; retain reciprocal Firefight beginner guide link.' if path=='/games/firefight/' else
        'Keep Casual and Games links; link from future verified farming editorial.' if path=='/games/webrise-farm/' else
        'Keep Action and Games links; retain Firefight and Wild Arena recommendations.' if path=='/games/tank-arena/' else
        'Keep Puzzle, Games, quick-games and no-download guide links.' if path=='/games/word-lock/' else
        'Consider a contextual link from the relevant game guide.' if '/blog/' in path and row['incoming_pages']<3 else
        'Keep directory/category discovery and relevant game or guide links.')
for key in ['title','description']:
    values={}
    for row in rows: values.setdefault(row[key],[]).append(row['url'])
    for value, pages in values.items():
        if len(pages)>1: issues.append({'urls':pages,'issue':'Duplicate '+key})
with (output/'seo-metadata-matrix.csv').open('w',encoding='utf-8-sig',newline='') as stream:
    writer=csv.DictWriter(stream,fieldnames=rows[0].keys()); writer.writeheader(); writer.writerows(rows)

live=[]
def fetch(url):
    try:
        with urlopen(Request(url,headers={'User-Agent':'WebRiseHub-SEO-QA/1.0'}),timeout=20) as response:
            text=response.read().decode('utf8','replace'); d=Document(text)
            return {'url':url,'status':response.status,'final_url':response.url,'title':d.title,'h1':d.headings,'canonical':d.canonicals,'content_length':len(text),'robots':d.meta.get('robots',''),'x_robots_tag':response.headers.get('X-Robots-Tag','')}
    except Exception as e: return {'url':url,'error':str(e)}
if args.live:
    with ThreadPoolExecutor(max_workers=6) as pool: live=list(pool.map(fetch,urls+['http://webrisehub.com/','https://www.webrisehub.com/','https://webrisehub.com/seo-qa-nonexistent-page/']))
    (output/'production-http-audit.json').write_text(json.dumps(live,indent=2),encoding='utf8')

# A meaningful regression guard: raw game HTML must retain game mount IDs and scripts.
guards=[]
for slug in ['firefight','webrise-farm','tank-arena','word-lock']:
    path='public/games/'+slug+'/index.html'; before=subprocess.check_output(['git','show','HEAD:'+path],cwd=root).decode('utf8'); after=(root/path).read_text(encoding='utf8')
    import re
    scripts=lambda s: re.findall(r'<script[^>]+src="([^"]+)"',s)
    ids=lambda s: set(re.findall(r'\bid="([^"]+)"',s))
    before_scripts=scripts(before); after_scripts=scripts(after)
    # The reviewed chat adapter is additive; existing gameplay entry points must
    # still match exactly. No other script replacement is permitted by this guard.
    if slug=='firefight':
        before_scripts=[src for src in before_scripts if src!='./chat/chat.mjs']
        after_scripts=[src for src in after_scripts if src!='./chat/chat.mjs']
    guards.append({'game':slug,'same_game_scripts':before_scripts==after_scripts,'all_mount_ids_retained':ids(before)<=ids(after)})
report={'sitemap_urls':len(urls),'documents_audited':len(rows),'issues':issues,'game_mount_guards':guards,'thin_incoming':[{'url':u,'incoming':len(v)} for u,v in incoming.items() if len(v)<3],'priority_page_issues':[i for i in issues if urlsplit(i['url']).path in updated]}
import re
report['dedicated_article_guards']=[]
for slug, expected in [('10-quick-games-5-minutes',10),('15-free-browser-games-no-download',15)]:
    source=(export/'blog'/slug/'index.html').read_text(encoding='utf8')
    count=len(re.findall(r'class="game-entry"',source))
    report['dedicated_article_guards'].append({'slug':slug,'expected_entries':expected,'actual_entries':count,'passed':count==expected})
    if count!=expected:
        report['priority_page_issues'].append({'url':'https://webrisehub.com/blog/'+slug+'/', 'issue':f'Expected full dedicated article with {expected} game entries; got {count}'})
(output/'seo-check-results.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(json.dumps(report,indent=2))
if report['priority_page_issues'] or not all(g['same_game_scripts'] and g['all_mount_ids_retained'] for g in guards): raise SystemExit(1)
