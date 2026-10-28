# WebRiseHub website guidelines

Version: 1.0  
Created and sources reviewed: 28 October 2026  
Owner: WebRiseHub site owner; maintained with the project  
Scope: the entire website and all existing and future games

## 1. Purpose and how to use this guide

WebRiseHub is a collection of original free browser games and interactive experiences. Help visitors find an appropriate game, understand its real requirements, play successfully and discover something relevant next. A good change improves the experience and the site's accuracy as well as its search readiness.

Apply this guide to the homepage, `/games/`, every individual game, category hubs, the blog, informational pages, shared navigation, images, metadata and features such as multiplayer chat. It applies to human-written and AI-assisted work alike. A task concerning Firefight must not silently change another game's behavior. A shared component change must be checked across the pages it affects.

Use the sections relevant to the task. Documentation edits need documentation checks; an article does not require a gameplay overhaul; gameplay changes require checks of affected mechanics. Do not turn every small change into a site-wide rewrite or approval exercise. The user's explicit current instructions take precedence. Explain material conflicts and uncertainties instead of silently guessing.

This document contains two different kinds of information:

- **Google guidance:** summarized and linked in section 2. Follow the current official sources when interpreting Google's policies.
- **WebRiseHub project rules:** the practical choices in sections 3-10. These are our implementation and editorial standards, not additional requirements attributed to Google.

Recheck the sources when a future decision depends on changed policy. This dated review does not imply that Google guidance can never change.

## 2. Google guidance used here

### Generative AI and review

Google describes useful roles for generative AI in research and structuring original material. It stresses accuracy, relevance and quality, with manual fact-checking before publication. Review extends to titles, descriptions, structured data and image alt text. Explain automation when that context would help the audience. Merchant Center's specific AI labelling rules concern its product feeds and images; do not automatically apply them to every game page. [Official AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=en)

### Helpful content and playable experiences

Content should serve people and demonstrate original value. Google's discussion of main content includes interactive games and tools: gameplay itself matters. There is no preferred word count to target. Give accurate authorship and explain creation or testing methods where readers would reasonably expect them; never fabricate creators or expertise. [Helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

### Spam avoidance

Creating many low-value pages mainly to manipulate rankings can constitute scaled content abuse, regardless of how they were produced. Do not disguise scraping or lightly rewritten material as original work. Avoid keyword stuffing, doorway pages and different content shown to crawlers for deceptive purposes. [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content)

### Search readiness

Use descriptive language and crawlable links, and meet the technical and spam requirements. Eligibility and best practices do not guarantee crawling, indexing or ranking. [Search Essentials](https://developers.google.com/search/docs/essentials)

## 3. Evidence and editorial responsibility

Before editing, identify the actual page, its source, its intended audience, the requested change and the evidence supporting it. Read the relevant game code and existing first-party guide; inspect the local build and production page where accessible. Treat research reports as leads to verify. A competitor's feature does not establish a WebRiseHub feature.

For important gameplay or service claims, record a short evidence note in the task or change description:

| Field | Record |
|---|---|
| Claim | The exact statement being added, corrected or removed |
| Scope | Specific game, page, device and mode |
| Evidence | Source file, observed behavior or dated first-party information |
| Environment | Local prototype, development build, staging or production |
| Test | What was performed, with browser/device and date where relevant |
| Status | Verified, source-supported but untested, planned, or unknown |

Source inspection alone does not prove runtime compatibility. A browser demonstration does not prove a released production capability. Report these distinctions clearly.

For content work:

- Write from the actual product and the visitor's task. Include a useful observation, explanation or verified example rather than generic filler.
- Fact-check AI drafts, external references, names, counts, controls, device claims, links and metadata. Do not publish unreviewed generated drafts at scale.
- Keep the title, introduction, body and linked game consistent. An article promising ten games must actually contain ten relevant entries in the exported page.
- Do not invent personal play experience, testing, reviews, author qualifications, player counts, ratings or traffic data. Identify real authors or editorial responsibility where appropriate.
- Use original writing. Cite sources for external factual claims and clearly identify third-party games or destinations.
- Use honest publication and revision dates. Record a revision when the work changes materially; do not change dates merely to imply freshness.
- Explain meaningful AI or automation involvement when readers would reasonably want that context. Do not claim Google requires a blanket AI badge on every page.
- Review captions and generated imagery. Label illustrative art appropriately when it might be mistaken for a gameplay screenshot; preserve relevant provenance when available.

## 4. Every game needs its own fact check

Never assume all games share a framework, inputs, session length or capabilities. Before describing or changing a game, verify the applicable facts:

- Rules, goals, scoring, modes and the controls actually implemented.
- Keyboard, mouse, touch, orientation and device requirements.
- Human multiplayer, local two-player, solo bots and any server dependency.
- Saving: session-only state, local browser storage, account/cloud saving, reset behavior and storage keys.
- Offline behavior: first visit versus cached visit, reloads, asset availability and service-worker behavior.
- Account, connectivity and installation requirements; accessibility and motion/audio options.
- Approximate session descriptions, without guaranteeing that a match finishes within a fixed number of minutes.

Record unknowns. Do not copy a feature statement from one game into the directory, another game, schema or an article without evidence. Do not remove working functionality to make a description easier to write. If an existing claim cannot be established, investigate and flag the uncertainty; correct copy transparently using the available evidence and the user's instructions.

### Dated local notes, not permanent product promises

These notes describe the inspected local checkout on 28 October 2026. Reverify before changing a claim or describing a feature as live:

- **Tank Arena:** the owner's current specification is desktop-only; offline mode is planned. Do not present either mobile play or released offline support as established without new evidence and an updated specification.
- **WebRise Farm:** the inspected game describes a farm living in the current tab, with a photo as a keepsake. Offline behavior was not tested in the previous SEO work. Homepage copy in `src/components/Games.tsx` still says "Works offline", while directory copy in `src/lib/editorial.ts` no longer makes that claim. This discrepancy needs an actual offline test and deliberate reconciliation; this guide neither verifies nor disables offline functionality.
- **Firefight:** the local game includes a multiplayer client, but `public/games/firefight/config.json` is empty. The new chat is a client prototype with a loopback-only two-tab demonstration; a compatible game server is still required. Do not advertise online chat or live multiplayer as released solely because the demo works.
- **Other games:** their capability status must be established individually. The map below is an editorial plan, not a certification that all their features or devices have been tested.

Keep capability details next to the relevant game's source/README or first-party guide, and update affected catalog cards, articles and metadata together when a fact changes. Do not duplicate permanent capability tables across many documents.

## 5. Page purpose and intent ownership across the collection

Use the actual catalog in `src/lib/editorial.ts`, homepage cards in `src/components/Games.tsx`, category membership, game source and article registry to identify affected surfaces. Check for inconsistent copies rather than assuming one data source feeds every page.

The following map is WebRiseHub's current intent plan. It contains no keyword-volume or ranking claims. A new game gets its own fact check and distinct intent; the current list does not limit future additions.

| Page | Primary purpose / search intent |
|---|---|
| `/` | Introduce WebRiseHub and its free browser games |
| `/games/` | Browse the collection of online browser games |
| `/categories/` and existing category pages | Discover actual games by genre or style |
| `/games/webrise-farm/` | Farming browser game |
| `/games/firefight/` | 3D browser shooter |
| `/games/tank-arena/` | Tank browser game |
| `/games/word-lock/` | Five-letter word game online |
| `/games/let-it-grow/` | Driving and farm-building game |
| `/games/little-explorer/` | 3D village exploration game |
| `/games/where-am-i/` | Location-guessing puzzle |
| `/games/wild-arena/` | Browser survival arena game |
| `/games/cell-rush/` | Cell-growth arena game |
| `/games/lock-in/` | Marker timing challenge |
| `/games/circel/` | Shape-drawing accuracy challenge |
| `/games/build-life/` | Interactive screen-time experiment |
| `/games/chess/` | Browser chess against a computer or local opponent |
| `/games/x0-arena/` | 3D tic-tac-toe |
| `/games/getaway/` | Arcade police-chase driving challenge |
| `/games/dont-touch-red/` | Hazard-avoidance reaction challenge |
| `/games/stack/` | Tower-stacking timing challenge |
| `/blog/10-quick-games-5-minutes/` | Compare quick browser games for a short break |
| `/blog/15-free-browser-games-no-download/` | Compare browser games without a separate game installation |
| Other existing articles | Answer their specific guide, design or comparison question |
| About, contact and policy pages | Provide accurate project, contact and policy information |

The source slug `circle-game` maps to the existing public `/games/circel/` URL. Preserve this public path unless an approved migration explicitly changes it.

### Requirements by page type

| Surface | Useful content and checks |
|---|---|
| Homepage | Preserve broad collection positioning, working discovery, original-game identity and relevant featured links; do not let one game dominate all site messaging |
| Directory | Keep the playable catalog easy to reach; provide concise orientation, categories and relevant guide links |
| Game page | Prioritize play, explain the actual rules and inputs, state relevant device/connectivity/save limitations, and offer suitable related games |
| Category | Use real membership and a distinct explanation; do not create empty or near-identical categories for keyword variants |
| Guide/article | Answer the promised question with verified examples and direct relevant links; improve the existing intent owner before creating another URL |
| Shared navigation/components | Check affected games, pages, mobile layouts, links and performance; avoid a single-game assumption in shared code |
| Chat or other user contributions | Treat transient private messages as product data; do not expose or turn them into indexable SEO content. Establish server validation and moderation appropriate to the feature before a public release |

These are flexible content requirements. Do not force the same headings, FAQs, minimum word count or related-link count on every game. Link where it helps the visitor; keep substantial text from unnecessarily pushing the catalog or game down the page.

## 6. Technical SEO standards

For each intended indexable page, maintain a useful, page-specific title and description, an identifiable main heading, the correct absolute canonical, appropriate social metadata and accurate structured data where useful. WebRiseHub's preferred canonical origin is `https://webrisehub.com`. Check actual host and path behavior before changing redirects.

Use descriptive text naturally. Keep separate intents where they help users; do not generate near-duplicate pages for alternate keyword spellings. There is no project keyword-density target, minimum article length or guaranteed ranking outcome.

### Rendering and routing

- Inspect the generated initial HTML as well as the JavaScript-rendered page. Important descriptions and discovery links should be available in the HTML for the current static-export architecture.
- Keep explanatory content available to people too. Native disclosures may keep the game usable, but content must remain accessible and relevant; do not create crawler-only text.
- Establish which route/template owns a URL. Avoid generating a dynamic article path that is also owned by a dedicated article component. Check the actual exported body, not only its title.
- Preserve current URLs. Establish a replacement, redirect plan and approval before a migration.
- Verify useful pages return their expected status and unknown URLs behave as 404s. A successful build alone does not establish production HTTP behavior.

### Links and discovery

Maintain useful routes from homepage to directory, categories and games, plus relevant article-to-game and game-to-guide connections. Use ordinary anchors with valid `href` values; do not make a click handler the sole navigation route. Keep related-game recommendations relevant and identify third-party destinations. Avoid orphaning a new game or guide.

### Sitemap, robots and canonicals

Preserve a working sitemap and robots setup. Check that sitemap entries resolve to intended canonical, indexable pages, without obsolete, duplicate, private or staging URLs. Do not put private chat, local test flags or prototype endpoints in the sitemap. Flag thin categories for a deliberate decision instead of applying noindex automatically. Changes to robots, noindex or canonical ownership need evidence and review proportionate to their effect.

### Structured data and images

Preserve accurate breadcrumbs and existing useful schema. Use `VideoGame`, article or other appropriate types only for real visible page information. Never invent ratings, reviews, popularity statistics, player counts or device compatibility. Parse JSON-LD and review its meaning; parsing alone is not a rich-result eligibility test.

Use descriptive alt text for informative images and empty alt text for decorative images as appropriate. Preserve dimensions, responsive behavior and suitable loading strategy. Avoid adding oversized media, unnecessary scripts or dependencies for SEO copy. Keep the game's performance and the site's visual identity intact.

## 7. Repository implementation notes

This is a dated architecture reference. Inspect the current files before acting:

- Next.js App Router exports production HTML with trailing slashes; see `next.config.mjs` and `src/app/`.
- Some games are React routes; many are independent HTML games in `public/games/`. Root Next metadata does not automatically populate an independent public game document.
- Shared page metadata and catalog data are in `src/lib/editorial.ts`. The homepage also has separate card data in `src/components/Games.tsx`.
- Blog registry data is in `src/lib/journal.ts`; dedicated article routes coexist with `src/app/blog/[slug]/page.tsx`. Maintain unique export ownership.
- Sitemap and robots generation are in `src/app/sitemap.ts` and `src/app/robots.ts`. Cloudflare-specific redirects are in `public/_redirects`.
- Do not hand-edit minified game bundles for ordinary content work. When adding a feature alongside a built game, document the adapter assumptions and test them. Prefer original game source when available.
- Preserve storage keys, save formats, input listeners, pointer capture, canvas sizing, audio behavior, assets and service-worker/cache behavior. If a new asset is needed offline, update the appropriate game's cache manifest/version and test the update path.
- Keep backend work explicit: a local demonstration is not a hosted room service. Avoid adding dependencies or exposing endpoints without a concrete need in the requested work.

## 8. Proportionate validation and release review

Before changing files, inspect existing instructions, the working tree and affected architecture. Preserve unrelated local work. Make small, reviewable edits and verify the outcome actually delivered by the route.

| Change | Minimum relevant validation |
|---|---|
| Guidance/documentation only | Check links, named paths, commands, scope, source attribution and diff; no production rebuild solely for a Markdown edit |
| Copy, metadata or article | Build affected output; inspect initial HTML and visible body, title/description, canonical, relevant headings, links and factual claims |
| Game UI/logic or a new feature | Targeted automated checks where meaningful; launch the affected game; test changed interactions, input, storage/network behavior and console errors |
| Shared components or architecture | Check affected page types and games, desktop/mobile layouts, assets, navigation and performance-sensitive paths |
| Indexability/routing/deployment | Validate exported routes and hosting behavior, sitemap, robots, redirects, canonical ownership and rollback/release plan |

Available checks in this checkout:

```sh
npm run build
node node_modules/typescript/bin/tsc --noEmit
python scripts/check-seo.py --output-dir work/seo-qa
npm run test:firefight-chat
git diff --check
```

Install from the existing lockfile when dependencies are needed. Use the available equivalent Python executable if `python` is not on PATH. Run chat tests for relevant changes; they are not a test suite for the whole catalog. The SEO checker audits the built `out/` directory, so build before relying on its results. Its optional `--live` mode makes read-only production requests.

There is currently no dedicated project lint script or comprehensive catalog gameplay suite. Do not invent a passing result for either. Add meaningful tests for new behavior where appropriate; avoid tests that merely repeat markup or implementation details.

Report checks as passed, failed or not run, including environment and limits. Distinguish automated checks, source inspection and manual gameplay. Do not equate a local build with production release, an HTML scan with complete content review, or schema syntax validation with Google's acceptance.

Complete ordinary authorized local work without repeated confirmation. Production deployment requires explicit approval unless the current session already authorizes it. URL migrations, destructive changes and material architecture or indexability changes need a concrete review and appropriate authorization. This rule is not a reason to stop safe local work already requested.

## 9. Measurement and ongoing maintenance

Use dated Search Console evidence for current indexation, impressions, clicks, queries, landing pages, selected canonicals and crawl problems. Keep historical numbers labelled historical. Use available field performance data for performance claims; a Lighthouse run and field Core Web Vitals are different measurements.

After an approved release, inspect materially improved URLs and consider selective indexing requests. Do not repeatedly request indexing for unchanged pages. Compare meaningful periods and record release dates without inventing keyword volumes, traffic forecasts or guaranteed ranking improvements.

When introducing a game, add it to the actual catalog and discovery structure, assign a distinct useful intent, verify capabilities, check its static document or route metadata and update sitemap handling where needed. Apply the same process to future games without copying another game's claims.

Update this guide when verified product behavior, architecture, owner requirements or official guidance changes. Update affected page copy and schema together, record the evidence/date, and distinguish an intended change from one already released. A completed checklist is not a claim of universal compliance or perfect gameplay.

## 10. Suggested request and completion format

Reusable request:

> Make this change following WEBRISEHUB_GUIDELINES.md. Apply the relevant rules to every affected game and page, verify feature claims, preserve existing behavior, and report validation and unresolved limits.

A concise completion report should explain what changed and why, affected pages/files, checks performed, any unresolved issues and whether anything was deployed. Cite current official sources when making policy claims. Keep ordinary product UI focused on playing and discovery; put engineering notes and QA evidence in development documentation.
