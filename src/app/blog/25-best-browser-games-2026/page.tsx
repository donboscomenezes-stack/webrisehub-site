import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const title = "25 Best Browser Games to Play When You're Bored in 2026";
const description =
  "Discover 25 browser games for quick breaks, strategy sessions, multiplayer competition, relaxing play, and everything in between.";
const publishedAt = "2026-09-20";
const canonicalUrl = "https://webrisehub.com/blog/25-best-browser-games-2026";
const imageUrl = "https://webrisehub.com/blog/25-best-browser-games-2026.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: "article",
    title,
    description,
    url: canonicalUrl,
    publishedTime: publishedAt,
    authors: ["WebRiseHub"],
    images: [{ url: imageUrl, width: 1731, height: 909, alt: title }]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl]
  }
};

type GameEntry = {
  name: string;
  bestFor: string;
  paragraphs: string[];
  reasons: string[];
  href?: string;
  actionLabel?: string;
  tip?: string;
  tipLabel?: string;
};

const games: GameEntry[] = [
  {
    name: "Lock In",
    bestFor: "Focus and concentration challenges",
    paragraphs: [
      "How long can you stay locked in?",
      "Lock In turns focus into a simple challenge. Instead of complicated controls or a long tutorial, you can jump straight into an experience designed to test your concentration.",
      "It's particularly good when you're bored but still want something that keeps your brain engaged."
    ],
    reasons: ["Simple concept", "Easy to start", "Tests concentration", "Great for short sessions", "Gives you a reason to try again"],
    href: "/games/lock-in/",
    actionLabel: "Play Lock In",
    tipLabel: "Challenge yourself",
    tip: "Play once, remember your result, and see whether you can beat it on your next attempt."
  },
  {
    name: "Circle Game",
    bestFor: "Accuracy challenges",
    paragraphs: [
      "Drawing a circle sounds easy. Then someone gives you a score.",
      "Circle Game turns one of the simplest things you can draw into a surprisingly difficult accuracy challenge. Draw your circle and see how close you can get to the ideal shape.",
      "The concept takes seconds to understand, which makes it perfect when you only have a few minutes. And once you get a score, you'll probably want another attempt."
    ],
    reasons: ["Takes seconds to understand", "Short rounds", "Easy to replay", "Perfect for challenging friends", "Gives you an instant score to beat"],
    href: "/games/circel/",
    actionLabel: "Play Circle Game",
    tipLabel: "Challenge yourself",
    tip: "Give yourself three attempts and see if you can improve your score every round."
  },
  {
    name: "Getaway",
    bestFor: "Fast arcade action",
    paragraphs: [
      "Sometimes you don't want to solve anything. You just want to move.",
      "Getaway gives you a quick arcade-style experience where the challenge is staying in control and keeping your run alive.",
      "There isn't a huge learning curve standing between you and the action. You can jump in, understand what's happening, and start chasing a better run."
    ],
    reasons: ["Fast-paced gameplay", "Simple controls", "Short sessions", "Replayable", "Great for beating your previous run"],
    href: "/games/getaway/",
    actionLabel: "Play Getaway",
    tipLabel: "Challenge yourself",
    tip: "Instead of worrying about a perfect run, simply try to survive longer than you did last time."
  },
  {
    name: "Don't Touch Red",
    bestFor: "Reaction speed",
    paragraphs: [
      "The rule is right there in the name: don't touch red.",
      "Sounds easy enough, until you actually have to react quickly.",
      "Don't Touch Red works because you understand the objective almost immediately. The challenge comes from maintaining your concentration as the game tests your reactions."
    ],
    reasons: ["Extremely simple rules", "Tests your reactions", "Quick rounds", "Easy to replay", "Great for score chasing"],
    href: "/games/dont-touch-red/",
    actionLabel: "Play Don't Touch Red",
    tipLabel: "Challenge yourself",
    tip: "Don't rush your first attempt. Learn the rhythm first, then start chasing a better score."
  },
  {
    name: "Stack",
    bestFor: "Timing and precision",
    paragraphs: [
      "Simple games can become surprisingly difficult when timing matters.",
      "Stack challenges you to keep building while maintaining your accuracy. Every move matters, and small mistakes can quickly make the next one more difficult.",
      "That creates the classic one-more-try feeling that works so well in quick browser games."
    ],
    reasons: ["Simple controls", "Tests timing", "Short sessions", "Satisfying progression", "Easy to replay"],
    href: "/games/stack/",
    actionLabel: "Play Stack",
    tipLabel: "Challenge yourself",
    tip: "Don't focus on speed. Find your rhythm and see how high you can go."
  },
  {
    name: "X0 Arena",
    bestFor: "Quick strategy",
    paragraphs: [
      "You already know the basic idea: X. O. Three in a row.",
      "But knowing how Tic-Tac-Toe works doesn't necessarily mean you'll win.",
      "X0 Arena takes the familiar strategy game and turns it into a quick browser challenge that's perfect when you want something competitive without committing to a long match."
    ],
    reasons: ["Familiar rules", "Fast matches", "Requires strategy", "Easy to learn", "Great for quick breaks"],
    href: "/games/x0-arena",
    actionLabel: "Play X0 Arena",
    tipLabel: "Challenge yourself",
    tip: "Don't just try to create your own winning line. Watch what your opponent is building on every turn."
  },
  {
    name: "Chess",
    bestFor: "Strategy and thinking",
    paragraphs: [
      "Some games never really get old. Chess is one of them.",
      "Every match presents a different problem. You have to think ahead, protect your pieces, predict your opponent's moves, and decide when to attack.",
      "That makes chess a good choice when you want your browser break to involve a little more thinking."
    ],
    reasons: ["Classic strategy", "Every game is different", "Rewards planning", "Easy to understand but difficult to master", "Great replay value"],
    href: "/games/chess",
    actionLabel: "Play Chess",
    tipLabel: "Quick tip",
    tip: "Before making a move, ask yourself: What can my opponent do next? That habit alone can prevent a lot of unnecessary mistakes."
  },
  {
    name: "Build Life",
    bestFor: "Something completely different",
    paragraphs: [
      "Build Life isn't a traditional high-score game. It's more of an interactive experience.",
      "Instead of asking how quickly you can react or how many points you can score, it encourages you to think about how you're spending your time.",
      "That makes it an interesting change of pace after playing several competitive games."
    ],
    reasons: ["Different from traditional browser games", "Interactive", "Thought-provoking", "Easy to explore", "Doesn't require gaming experience"],
    href: "/games/build-life",
    actionLabel: "Try Build Life",
    tipLabel: "Challenge yourself",
    tip: "Be realistic with the information you enter. The experience becomes much more interesting when you use numbers that actually reflect your habits."
  },
  {
    name: "Wordle",
    bestFor: "Word puzzles",
    paragraphs: [
      "Wordle is one of the easiest games to fit into a short break.",
      "You have six attempts to identify a five-letter word. After each guess, the game gives you clues showing whether letters are correct, misplaced, or not part of the answer.",
      "It's simple enough to understand immediately but still requires careful thinking."
    ],
    reasons: ["Quick daily challenge", "Simple rules", "Tests vocabulary", "Doesn't require fast reactions", "Easy to share with friends"],
    tipLabel: "Quick tip",
    tip: "Start with a word containing several common vowels and consonants. Your first guess should help you collect information."
  },
  {
    name: "Agar.io",
    bestFor: "Competitive multiplayer",
    paragraphs: [
      "Agar.io starts with a wonderfully simple idea: you're a small cell.",
      "Eat smaller objects to grow while avoiding players who are large enough to eat you.",
      "As your cell grows, your decisions become more important. Attacking another player can help you grow quickly, but one bad move can end your run."
    ],
    reasons: ["Multiplayer competition", "Simple mechanics", "Quick to learn", "Different every round", "High replay value"],
    tipLabel: "Quick tip",
    tip: "Bigger isn't always better. Smaller cells can often escape dangerous situations more easily."
  },
  {
    name: "Skribbl.io",
    bestFor: "Playing with friends",
    paragraphs: [
      "You don't need to be good at drawing to enjoy Skribbl.io. Actually, being bad at drawing might make it more entertaining.",
      "One player receives a word and attempts to draw it while everyone else tries to guess what it is.",
      "The worse the drawing becomes, the funnier the guesses usually get."
    ],
    reasons: ["Great with friends", "Easy to understand", "Creative", "Funny", "Works well for groups"],
    tipLabel: "Quick tip",
    tip: "If you're drawing, establish the general shape or category first before worrying about details."
  },
  {
    name: "Cookie Clicker",
    bestFor: "Idle-game fans",
    paragraphs: [
      "Cookie Clicker begins with an extremely simple objective: click the cookie. That's basically it. At first.",
      "Eventually, your cookies allow you to purchase upgrades that generate even more cookies automatically. What begins as a silly clicking game gradually turns into an enormous numbers-and-upgrades machine."
    ],
    reasons: ["Very easy to start", "Constant progression", "Plenty of upgrades", "Surprisingly addictive", "Good for casual play"],
    tip: "Just be warned: 'I'll play for five minutes' doesn't always work with this one."
  },
  {
    name: "Townscaper",
    bestFor: "Relaxing",
    paragraphs: [
      "Not every game needs enemies, points, timers, or leaderboards.",
      "Townscaper lets you create colorful seaside towns by placing structures and watching your little environment grow.",
      "There isn't much pressure to accomplish anything. And that's exactly the appeal."
    ],
    reasons: ["Relaxing", "Creative", "Visually satisfying", "No complicated objectives", "Great when you want to unwind"],
    tipLabel: "Quick tip",
    tip: "Don't try to build something perfect. Experiment and see what develops."
  },
  {
    name: "Friday Night Funkin'",
    bestFor: "Rhythm-game fans",
    paragraphs: [
      "If slow games aren't your thing, try something with a beat.",
      "Friday Night Funkin' challenges you to hit directional inputs in time with the music.",
      "The basic concept is straightforward, but faster songs can quickly test your timing and concentration."
    ],
    reasons: ["Music-driven gameplay", "Fast", "Challenging", "Easy to understand", "Rewards practice"],
    tipLabel: "Quick tip",
    tip: "Watch the incoming pattern instead of focusing too much on the key you just pressed."
  },
  {
    name: "A Dark Room",
    bestFor: "Mystery and discovery",
    paragraphs: [
      "A Dark Room doesn't tell you everything immediately. That's part of what makes it interesting.",
      "The experience begins with a minimal interface and gradually develops into something much larger involving resources, exploration, and discovery.",
      "Explaining too much would ruin some of the fun."
    ],
    reasons: ["Mysterious", "Minimalist", "Gradually becomes deeper", "Rewards curiosity", "Good for longer sessions"],
    tipLabel: "Quick tip",
    tip: "Avoid looking up guides immediately. Discovering what happens next is part of the experience."
  },
  {
    name: "Pokémon Showdown",
    bestFor: "Pokémon battle fans",
    paragraphs: [
      "What if you like Pokémon battles more than spending hours building a team? Pokémon Showdown gets you into the strategy quickly.",
      "You can battle using different team formats and focus on moves, matchups, predictions, and competitive decision-making."
    ],
    reasons: ["Fast battles", "Strategic", "Multiplayer", "Lots of variety", "Great for experienced Pokémon players"],
    tipLabel: "Quick tip",
    tip: "Random battles are a fun place to start because they force you to adapt to whatever team you're given."
  },
  {
    name: "Guess Where You Are",
    bestFor: "Geography fans",
    paragraphs: [
      "You're dropped somewhere in the world. Now figure out where.",
      "Look for road signs, languages, architecture, landscapes, road markings, and anything else that might reveal your location.",
      "It's part geography quiz and part detective game."
    ],
    reasons: ["Tests observation", "Makes geography fun", "Every location feels different", "Good alone or with friends", "Rewards attention to detail"],
    tipLabel: "Quick tip",
    tip: "Don't immediately search for a city. First identify clues that might reveal the country."
  },
  {
    name: "Crafting Loop",
    bestFor: "Minecraft fans",
    paragraphs: [
      "You've crafted hundreds of items in Minecraft. But how well do you actually remember the recipes?",
      "Crafting Loop turns that knowledge into a timed challenge.",
      "Once a countdown is involved, recipes you've used countless times can suddenly become harder to remember."
    ],
    reasons: ["Familiar concept", "Fast", "Tests memory", "Good for Minecraft players", "Easy to replay"],
    tipLabel: "Challenge yourself",
    tip: "Start slowly, then reduce the available time as you improve."
  },
  {
    name: "An Average Day at the Cat Cafe",
    bestFor: "Cozy-game fans",
    paragraphs: [
      "Sometimes you don't want competition. You want cats and a café.",
      "An Average Day at the Cat Cafe provides a charming little management experience with a few surprises along the way.",
      "It's a good option when you want something lighter and more relaxed."
    ],
    reasons: ["Cozy atmosphere", "Cute visual style", "Easy to approach", "Different from competitive games", "Good for relaxing"],
    tip: "Take your time with this one. Part of the fun is noticing the details."
  },
  {
    name: "Dungeon Crawl: Stone Soup",
    bestFor: "Players who want something deeper",
    paragraphs: [
      "Ready for something considerably more complicated?",
      "Dungeon Crawl: Stone Soup is a traditional roguelike built around exploration, combat, character development, equipment, and difficult decisions.",
      "Unlike many quick browser games, this one takes time to learn. But that depth is also why players keep coming back."
    ],
    reasons: ["Deep gameplay", "Lots of character options", "Strategic combat", "High replay value", "Great for longer sessions"],
    tipLabel: "Beginner tip",
    tip: "Don't make winning your first objective. Learn how the systems work."
  },
  {
    name: "Fallen London",
    bestFor: "Story lovers",
    paragraphs: [
      "If you care more about stories than reflexes, Fallen London offers something different.",
      "The game revolves around reading, making choices, meeting unusual characters, completing activities, and gradually exploring its strange world.",
      "It's a game that rewards curiosity."
    ],
    reasons: ["Strong storytelling", "Interesting world", "Lots to discover", "Choice-driven", "Suitable for longer sessions"],
    tip: "Don't rush through the text. The writing is a major part of the experience."
  },
  {
    name: "Isleward",
    bestFor: "Online RPG fans",
    paragraphs: [
      "Isleward brings RPG and roguelike elements into a browser-based multiplayer experience.",
      "You can explore, fight creatures, find equipment, develop your character, and encounter other players.",
      "It requires more time than something like Circle Game, but that's exactly what makes it useful when you have a longer break."
    ],
    reasons: ["Multiplayer", "Exploration", "Character progression", "RPG mechanics", "Plenty to discover"],
    tip: "Experiment with different approaches before settling on the style you enjoy most."
  },
  {
    name: "Kingdom of Loathing",
    bestFor: "Comedy and RPG fans",
    paragraphs: [
      "Not every RPG needs dramatic cinematics.",
      "Kingdom of Loathing has built its identity around deliberately simple visuals, strange characters, ridiculous enemies, unusual classes, and lots of jokes.",
      "It's an RPG that knows it doesn't need to take itself seriously."
    ],
    reasons: ["Funny writing", "RPG progression", "Unique visual style", "Lots of content", "Doesn't feel like a typical fantasy game"],
    tip: "Read the item descriptions. Some of the best jokes are hidden there."
  },
  {
    name: "Wilds.io",
    bestFor: "Multiplayer action",
    paragraphs: [
      "Want something more aggressive?",
      "Wilds.io combines multiplayer combat with exploration, equipment, items, and different objectives.",
      "Because you're playing against other people, each encounter can unfold differently."
    ],
    reasons: ["Multiplayer", "Action-focused", "Competitive", "Fast encounters", "Replayable"],
    tipLabel: "Quick tip",
    tip: "Don't attack everything immediately. Sometimes positioning matters more than aggression."
  },
  {
    name: "Neptune's Pride",
    bestFor: "Long-term strategy",
    paragraphs: [
      "Most games on this list help you spend a few minutes. Neptune's Pride can become something you check for days.",
      "You control a space empire, expand across systems, move fleets, negotiate with other players, and make long-term strategic decisions.",
      "The slow pace changes how you approach the game. A decision you make now may not pay off for hours."
    ],
    reasons: ["Deep strategy", "Multiplayer diplomacy", "Long-term planning", "Large-scale competition", "Very different from quick browser games"],
    tipLabel: "Quick tip",
    tip: "Don't ignore diplomacy. Sometimes a reliable neighbor is more valuable than another territory."
  }
];

const quickPicks = [
  ["Want a focus challenge?", "Play Lock In", "/games/lock-in/"],
  ["Want something different?", "Try Build Life", "/games/build-life"],
  ["Want a quick accuracy challenge?", "Play Circle Game", "/games/circel/"],
  ["Want strategy?", "Play Chess", "/games/chess"],
  ["Want something competitive and quick?", "Try X0 Arena", "/games/x0-arena"],
  ["Want fast arcade action?", "Play Getaway", "/games/getaway/"],
  ["Want to test your reactions?", "Try Don't Touch Red", "/games/dont-touch-red/"],
  ["Want a simple skill challenge?", "Play Stack", "/games/stack/"]
];

function ChoiceList({ title: heading, items }: { title: string; items: string[] }) {
  return (
    <div className="article-choice">
      <h3>{heading}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

export default function BrowserGamesArticle() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: { "@type": "Organization", name: "WebRiseHub" },
    publisher: { "@type": "Organization", name: "WebRiseHub" },
    mainEntityOfPage: canonicalUrl
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article className="article-shell">
          <header className="article-header">
            <a className="article-back" href="/blog"><ArrowLeft size={16} /> All articles</a>
            <p className="article-kicker">Game Guide</p>
            <h1>{title}</h1>
            <p className="article-deck">{description}</p>
            <div className="article-byline">
              <span>By WebRiseHub</span>
              <time dateTime={publishedAt}>September 20, 2026</time>
              <span><Clock3 aria-hidden="true" size={15} /> 18 min read</span>
            </div>
          </header>

          <figure className="article-hero">
            <img src="/blog/25-best-browser-games-2026.png" alt={title} />
          </figure>

          <div className="article-layout">
            <aside className="article-toc" aria-label="Article contents">
              <strong>In this guide</strong>
              <a href="#quick-picks">Quick picks</a>
              <a href="#the-list">The 25 games</a>
              <a href="#choose">Choose by mood</a>
              <a href="#why-browser-games">Why browser games</a>
              <a href="#faq">FAQ</a>
            </aside>

            <div className="article-body">
              <p className="article-lead">Bored, but don&apos;t want to download another game, create an account, or spend twenty minutes learning how to play?</p>
              <p>Sometimes you just want to open a browser and start playing.</p>
              <p>That&apos;s what makes browser games so useful. Whether you have two minutes between tasks or an entire evening to kill, there are plenty of games you can jump into without turning gaming into a commitment.</p>
              <p>From quick reaction challenges and drawing games to chess, puzzles, multiplayer games, and relaxing experiences, we&apos;ve put together <strong>25 browser games to try when you&apos;re bored in 2026.</strong></p>
              <p>Some take less than a minute to understand. Others might keep you around much longer than you planned.</p>
              <p>Let&apos;s find something to play.</p>

              <section id="quick-picks" className="article-section">
                <h2>Need a Game Right Now?</h2>
                <p>Don&apos;t want to scroll through all 25? Start with one of these:</p>
                <div className="quick-picks">
                  {quickPicks.map(([prompt, label, href]) => (
                    <a href={href} key={label}><span>{prompt}</span><strong>{label}</strong><ArrowRight size={16} /></a>
                  ))}
                </div>
                <p>Or keep scrolling to find the right game for your mood.</p>
              </section>

              <section id="the-list" className="article-section">
                <h2>The 25 Best Browser Games</h2>
                {games.map((game, index) => (
                  <section className="game-entry" id={`game-${index + 1}`} key={game.name}>
                    <p className="game-number">{String(index + 1).padStart(2, "0")}</p>
                    <h2>{game.name}</h2>
                    <p className="best-for"><strong>Best for:</strong> {game.bestFor}</p>
                    {game.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    <h3>Why play it?</h3>
                    <ul>{game.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
                    {game.href ? <a className="article-play" href={game.href}>{game.actionLabel} <ArrowRight size={16} /></a> : null}
                    {game.tip ? <p className="article-tip">{game.tipLabel ? <strong>{game.tipLabel}: </strong> : null}{game.tip}</p> : null}
                  </section>
                ))}
              </section>

              <section id="choose" className="article-section">
                <h2>Which Browser Game Should You Play?</h2>
                <p>Still can&apos;t decide? Start with how much time you have and the kind of experience you want.</p>
                <div className="article-choice-grid">
                  <ChoiceList title="If You Have 2 Minutes" items={["Circle Game", "Don't Touch Red", "X0 Arena", "Stack"]} />
                  <ChoiceList title="If You Have 5–10 Minutes" items={["Lock In", "Getaway", "Chess", "Wordle", "Agar.io"]} />
                  <ChoiceList title="If You Want Something Relaxing" items={["Build Life", "Townscaper", "An Average Day at the Cat Cafe"]} />
                  <ChoiceList title="If You Want Competition" items={["X0 Arena", "Chess", "Agar.io", "Skribbl.io", "Pokémon Showdown", "Wilds.io"]} />
                  <ChoiceList title="If You Want Something Deeper" items={["A Dark Room", "Dungeon Crawl: Stone Soup", "Fallen London", "Isleward", "Neptune's Pride"]} />
                </div>
              </section>

              <section id="why-browser-games" className="article-section">
                <h2>Why Browser Games Are Perfect When You&apos;re Bored</h2>
                <p>The best thing about browser games isn&apos;t necessarily their graphics or complexity. It&apos;s how quickly you can get from <strong>&quot;I want to play something&quot;</strong> to <strong>actually playing something.</strong></p>
                <p>You don&apos;t always need another large download. You don&apos;t need to spend half an hour configuring settings. And a game doesn&apos;t need hundreds of hours of content to be worth playing.</p>
                <p>Sometimes a one-minute reaction challenge is enough. Sometimes you want to draw a circle and see whether you can score 95%. Sometimes you want to play chess. And sometimes you just want to stack things until everything falls apart.</p>
                <p>That&apos;s what makes browser games so useful: <strong>you choose how much time you want to give them.</strong></p>
              </section>

              <section id="faq" className="article-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  <section><h3>What are the best browser games to play when you&apos;re bored?</h3><p>For something quick, try Circle Game, Don&apos;t Touch Red, Stack, X0 Arena, or Getaway. For strategy, try Chess. For something more unusual and interactive, try Build Life.</p></section>
                  <section><h3>What can I play when I&apos;m bored for five minutes?</h3><p>Choose games with simple rules and short rounds. Good options include Circle Game, Lock In, Don&apos;t Touch Red, Stack, X0 Arena, and Getaway.</p></section>
                  <section><h3>What are some games I can play directly in my browser?</h3><p>WebRiseHub currently offers Lock In, Build Life, Circle Game, Chess, X0 Arena, Getaway, Don&apos;t Touch Red, and Stack, all playable directly in your browser.</p></section>
                  <section><h3>What browser game should I play if I like competition?</h3><p>Try Chess or X0 Arena if you enjoy strategy. If you prefer competing against your own previous performance, try Circle Game, Don&apos;t Touch Red, Stack, Getaway, or Lock In.</p></section>
                  <section><h3>What should I play when I don&apos;t want anything complicated?</h3><p>Start with Circle Game, Don&apos;t Touch Red, Stack, or X0 Arena. Their objectives are easy to understand, so you can spend your time playing instead of learning complicated controls.</p></section>
                </div>
              </section>

              <section className="article-section article-ending">
                <h2>One More Game?</h2>
                <p>Being bored doesn&apos;t mean you need another app, another subscription, or a massive game installation. Sometimes you just need something fun to do for the next five minutes.</p>
                <p>Draw a better circle. Stay locked in. Stack a little higher. Survive a little longer. Win a chess match. Or try something completely different.</p>
                <p>The important part? <strong>Stop scrolling and start playing.</strong></p>
                <a className="article-final-cta" href="/#games">Explore free browser games <ArrowRight size={18} /></a>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </div>
  );
}
