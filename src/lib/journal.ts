import type { Editorial } from "./editorial";
export type Article = Editorial & { slug: string; minutes: number; game: string; accent: string; image: string; date: string };
export const articles: Article[] = [
  {
    slug: "how-we-built-where-am-i-browser-geography-game",
    title: "How We Built Where Am I: Designing a Browser Geography Game",
    eyebrow: "Behind the build",
    minutes: 8,
    game: "where-am-i",
    accent: "purple",
    image: "/blog/how-we-built-where-am-i.webp",
    date: "October 5, 2026",
    description: "A behind-the-scenes look at how we designed Where Am I, a browser-based geography game built around visual clues, observation, and location guessing.",
    sections: [
      { id: "introduction", title: "Turning Geography Into a Browser Game", paragraphs: [
        "Geography games have a simple appeal: show players an unfamiliar place and ask them to figure out where they are. The concept is easy to understand, but building a version that feels fair, fast, and genuinely fun requires more thought than simply putting a location on a screen.",
        "That was the idea behind Where Am I, a browser geography game designed around observation and deduction. Instead of asking players to recall capitals or identify flags, the game challenges them to study their surroundings, notice useful clues, and make an informed guess.",
        "We wanted the experience to work directly in the browser with as little friction as possible. No complicated setup. No long tutorial. A player should be able to open the game, understand the challenge almost immediately, and start exploring."
      ] },
      { id: "core-game-idea", title: "Starting With a Simple Game Loop", paragraphs: [
        "The first decision was to keep the core game loop extremely simple. The player is placed in a location, examines the available visual information, decides where they think they are, and submits a guess.",
        "That simplicity is important. Geography already provides the complexity. Roads, architecture, vegetation, languages, signs, landscapes, and infrastructure can all become clues, so the interface itself does not need to compete for the player's attention.",
        "A good round creates a small investigation. Players begin with limited information and gradually form a theory about the location."
      ], bullets: [
        "Explore the location and look for recognizable details.",
        "Use environmental and geographic clues to narrow down the possibilities.",
        "Choose a location based on the evidence available.",
        "Submit the guess and discover how close the answer was."
      ] },
      { id: "designing-the-clues", title: "Making Visual Clues Part of the Gameplay", paragraphs: [
        "One of the most interesting parts of designing Where Am I was deciding what information players should rely on. The game becomes much more engaging when the answer is not immediately obvious but the location still contains enough information to support a reasonable guess.",
        "A road sign might reveal a language. Driving direction can eliminate entire groups of countries. Architecture can suggest a region, while mountains, coastlines, vegetation, road markings, and utility poles can provide additional evidence.",
        "The goal is not to hide the answer completely. It is to give players enough clues to investigate without turning every round into an instant identification."
      ], bullets: [
        "Road signs, place names, and visible languages",
        "Architecture and building styles",
        "Road markings and driving direction",
        "Vegetation, terrain, climate, and landscapes",
        "Vehicles, infrastructure, and street design",
        "Regional details that become recognizable with experience"
      ] },
      { id: "browser-first-design", title: "Designing the Experience for the Browser", paragraphs: [
        "Building Where Am I as a browser game shaped many of our design decisions. Browser games need to feel immediate. Every unnecessary screen, interaction, or delay increases the chance that a player leaves before completing a round.",
        "We therefore treated the browser as part of the product design rather than simply the place where the game runs. The interface keeps the location itself at the center of the experience while controls and supporting information remain easy to understand.",
        "Responsive behavior was equally important. A geography game can be played on a large desktop monitor, a laptop, or a phone, and each screen size changes how much information the player can comfortably inspect. The layout therefore needs to remain usable without overwhelming smaller displays."
      ], bullets: [
        "Fast entry into the first round",
        "Minimal interface around the main geography experience",
        "Clear controls with predictable interactions",
        "Responsive layouts for desktop and mobile browsers",
        "Limited visual distractions while players investigate a location"
      ] },
      { id: "location-data", title: "Working With Locations and Geography Data", paragraphs: [
        "A location-based game depends heavily on the quality of its underlying geographic information. Coordinates may look simple as data, but turning them into a satisfying game requires thinking about how locations are selected, displayed, validated, and evaluated.",
        "Randomness alone does not necessarily create a good geography game. A technically valid coordinate can still produce an uninteresting or confusing round. Location selection needs to support the gameplay rather than simply provide geographic variety.",
        "This means considering the balance between recognizable areas and more difficult locations, while avoiding rounds where players have almost no useful information. The objective is variety without sacrificing playability."
      ] },
      { id: "guessing-and-feedback", title: "Making Every Guess Feel Meaningful", paragraphs: [
        "Submitting a guess should not feel like the end of the interaction. It is also the moment when the player learns something.",
        "Showing the relationship between the guessed location and the actual location turns the result into useful feedback. A player might discover that they correctly identified the country but chose the wrong region, or that a landscape they associated with one part of the world actually belongs somewhere completely different.",
        "That feedback creates the learning loop behind the game: observe, infer, guess, compare, and remember. Over time, details that once seemed meaningless begin to become recognizable geographic signals."
      ] },
      { id: "difficulty", title: "Balancing Challenge and Fairness", paragraphs: [
        "Difficulty in a geography game is difficult to measure because players arrive with very different levels of knowledge. One person may recognize a country from its road markings while another may need a readable city name before feeling confident.",
        "Rather than making difficulty depend entirely on obscure locations, we focused on the amount and quality of information available to the player. A challenging location can still feel fair when careful observation reveals useful clues.",
        "The best rounds sit somewhere between obvious and impossible. Players should occasionally recognize a location immediately, but the most satisfying guesses usually come from combining several smaller clues."
      ] },
      { id: "performance", title: "Keeping the Game Fast", paragraphs: [
        "Performance matters particularly in a game built around exploration. If locations load slowly or interface elements hesitate during interaction, the investigation quickly becomes frustrating.",
        "We kept the surrounding interface lightweight and treated loading behavior as part of the overall game experience. The goal was to make moving from opening the game to exploring a location and submitting a guess feel continuous.",
        "This is one of the advantages of building a focused browser game: when the interface stays small and purposeful, more attention can be given to the interaction that actually matters."
      ] },
      { id: "what-we-learned", title: "What We Learned While Building Where Am I", paragraphs: [
        "Building Where Am I reinforced an important lesson about small web games: simple concepts still benefit from careful product decisions. The game does not need dozens of mechanics to create depth because geography itself provides the variation.",
        "The challenge is deciding what to leave out. Every additional control, rule, or screen has to justify the attention it takes away from exploring the location."
      ], bullets: [
        "A simple core loop can create significant replay value when the underlying content varies naturally.",
        "Good location selection matters as much as the interface.",
        "Difficulty should come from deduction rather than missing information.",
        "Fast feedback makes each round more satisfying and educational.",
        "Browser games benefit from reducing the number of steps between opening the page and actually playing."
      ] },
      { id: "why-geography-games-work", title: "Why Geography Games Are So Engaging", paragraphs: [
        "Geography games sit somewhere between a puzzle and exploration. Players are not simply answering a question; they are gathering evidence from an environment and testing a theory.",
        "They also change the way players notice everyday details. Road lines, bollards, license plates, utility poles, languages, and building materials can suddenly become meaningful. The more someone plays, the larger their mental library of geographic clues becomes.",
        "That combination of curiosity, deduction, and discovery is what we wanted Where Am I to capture."
      ] },
      { id: "conclusion", title: "Final Thoughts", paragraphs: [
        "Where Am I started with a straightforward question: can we turn the experience of figuring out an unfamiliar location into a quick browser game?",
        "The final experience is intentionally simple. Explore what is around you, look for clues, make a guess, and find out how close you were. Behind that loop are decisions about location selection, interface design, performance, difficulty, and feedback that help each round feel worthwhile.",
        "If you enjoy geography, visual puzzles, or simply testing how much you notice about the world around you, give Where Am I a try."
      ], links: [{ label: "Play Where Am I", href: "/games/where-am-i/index.html" }] }
    ]
  },
  {
    slug: "10-quick-games-5-minutes", title: "10 Quick Games to Play When You Have 5 Minutes to Spare", eyebrow: "Game guide", minutes: 12, game: "word-lock", accent: "orange", image: "/blog/10-quick-games-5-minutes.png", date: "September 24, 2026",
    description: "Turn a short break into a complete challenge with ten browser games that start quickly and fit into five minutes.",
    sections: [
      { id: "observe", title: "Look at the empty space, too", paragraphs: ["When a circle looks wrong, the line is not always the problem. A shape can be smooth but stretched, or round but much smaller than the reference. Before drawing, look at the width and height of the target and how much empty space surrounds it. Imagine the top, bottom, left, and right edges of a box around the circle. Those four points give you a plan for the stroke.", "In Circle Game, Keep reference visible leaves a small version of the target on screen. Use it when learning proportions. Drawing from memory is a different challenge; there is no need to combine both challenges on every attempt."] },
      { id: "steady", title: "Aim for a deliberate stroke", paragraphs: ["Choose a starting point that feels comfortable and move around the imagined center. If you pause to correct every tiny wobble, it is easy to create a thick patch or a sharp corner. Try a comfortable, continuous movement, then inspect the result before deciding what needs work.", "The game has no speed bonus. The timer shows elapsed time, while the score comes from similarity, size, position, and outline. Rushing the last quarter of the circle will not earn extra points. On a touchscreen, make sure your drawing hand is not obscuring the point where the line should close."] },
      { id: "feedback", title: "Treat the result as four pieces of feedback", paragraphs: ["Read the individual measures before replaying. A low position result suggests that the drawing is off-center. A low size result suggests that you have covered too much or too little of the board. Shape and outline results point toward the silhouette and how closely the line follows the reference.", "The comparison overlay aligns normalized drawings, so it is useful for inspecting proportions and outline differences. It does not replace the size and position measures, which evaluate different aspects of the original drawing. The overall score gives shape similarity the largest weight, but improving a weak supporting measure can still make a visible difference."] },
      { id: "practice", title: "Change one variable at a time", bullets: ["Repeat the same shape with roughly the same brush size.", "Choose one target: more even proportions, better centering, or a closer scale.", "Use Undo for a stray stroke and Clear for a fresh attempt.", "Compare the metric you were trying to improve, not only the total.", "Switch to a square or triangle when you want a different challenge."], paragraphs: ["Your best is saved per shape in this browser, so you can return to a familiar target later. The score is a guide to this particular matching task, not a judgment of your creativity. A few focused attempts are usually more interesting than endlessly chasing one percentage."], links: [{ label: "Try Circle Game", href: "/games/circle-game/" }] },
    ],
  },
  {
    slug: "15-free-browser-games-no-download", title: "15 Free Browser Games You Can Play Without Downloading Anything", eyebrow: "Game guide", minutes: 13, game: "cell-rush", accent: "green", image: "/blog/15-free-browser-games-no-download.png", date: "September 21, 2026",
    description: "Open a tab and start playing. These quick challenges, puzzles, multiplayer games, and relaxed adventures need no installation.",
    sections: [
      { id: "scale", title: "Small numbers become easier to see", paragraphs: ["An hour is familiar. A decade is harder to picture. Build Life connects those scales by multiplying the daily phone-time estimate you choose across longer periods. One hour per day becomes seven hours per week and 365 hours over a 365-day year. Converting that annual total into full 24-hour days gives about 15.2 days.", "At four hours a day, the annual total is 1,460 hours. Across ten years, that is 14,600 hours, or about 1.67 years when expressed as continuous 24-hour time. This does not mean you spend entire calendar years doing nothing else; it is another unit for the same accumulated hours."] },
      { id: "assumptions", title: "Every comparison has assumptions", paragraphs: ["The experiment also expresses time as movies, books, workdays, and other activities. Those comparisons use fixed durations. A movie is modeled as 2.1 hours, a book as six hours, and a workday as eight hours. Real films, books, and working schedules vary, so these numbers are reference points rather than precise forecasts.", "There is another limitation: time is not perfectly interchangeable. Ten spare minutes during a commute are different from a clear afternoon. A visual comparison can help you notice scale without implying that every minute on a phone could have become reading, travel, or concentrated practice."] },
      { id: "context", title: "Put your estimate in context", paragraphs: ["Phone time can include directions, work, conversations, photos, and entertainment. The experiment does not classify any of it. It also does not connect to your device’s usage report. The input is your estimate, and the output is arithmetic based on that estimate.", "Try comparing nearby settings rather than jumping from one extreme to another. Reducing an estimate by half an hour per day changes the annual total by 182.5 hours. That is a concrete comparison you can inspect without claiming that one number is right for everyone."] },
      { id: "explore", title: "Use the scenes to ask a better question", paragraphs: ["The day planner, calendar, and longer-term views invite you to imagine alternatives. Instead of asking whether your total is good or bad, ask which parts of it feel worthwhile and which parts you would personally choose differently. The page cannot answer that for you.", "You can explore freely without an account. Inputs remain in the current session and reset when the page reloads. Save a result card if you want a record of one scenario, and review the numbers before sharing it. The experiment is a prompt for reflection, not a measurement service or a personalized recommendation."], links: [{ label: "Explore Build Life", href: "/games/build-life/" }] },
    ],
  },
  {
    slug: "25-best-browser-games-2026", title: "25 Best Browser Games to Play When You're Bored in 2026", eyebrow: "Game guide", minutes: 18, game: "where-am-i", accent: "purple", image: "/blog/25-best-browser-games-2026.png", date: "September 20, 2026",
    description: "Find your next game without downloading a thing, from reaction challenges and puzzles to multiplayer games and relaxed adventures.",
    sections: [
      { id: "local", title: "A saved score does not always mean an account", paragraphs: ["Circle Game remembers results using browser local storage. After a completed drawing, the game updates a small record containing your best result, total score, completed count, streak, and best for each shape. This lets the next visit show familiar statistics without asking you to register.", "The record belongs to this site in this browser profile. Opening the game in another browser, on another device, or in a separate private-browsing session does not bring the record with you. There is no account-based score synchronization or online leaderboard in this version."] },
      { id: "daily", title: "A daily challenge and a daily score are different", paragraphs: ["Today’s Challenge rotates the target shape according to your device’s calendar date. The displayed best comes from your saved best for that shape across all attempts. It is not a score that resets at midnight, and it does not compare you with other players.", "This distinction is useful when a familiar shape returns. You are trying to improve a personal best, not protect a daily ranking. You can replay the challenge, choose another shape, or leave and return at your own pace."] },
      { id: "clearing", title: "What happens when storage is cleared", paragraphs: ["Removing this site’s data through your browser also removes the saved drawing statistics. Private-browsing data is generally temporary, and browser settings may block storage altogether. The game can still calculate an on-screen result when persistent storage is unavailable, but it cannot promise to remember that result after the page closes.", "If a best score disappears, check whether you switched browser profiles or recently cleared site data. There is no remote backup from which WebRiseHub can restore local results. Sharing a score copies or sends a text summary; it does not create a backup of the underlying statistics."] },
      { id: "session", title: "Not every experience needs a saved result", paragraphs: ["Build Life uses a different model. Your daily-hours input and interactive choices live in the open page and reset on reload. A saved result card is an image you choose to download, not a profile stored by the site.", "Knowing this before you play makes it easier to decide what to keep. Read each game’s guide for its storage behavior, and use the cookie policy for the distinction between local game data and any advertising technologies. Browser storage is a convenience, not a reason to include personal or sensitive information in a game."], links: [{ label: "Read the cookie policy", href: "/cookie-policy/" }, { label: "Play Circle Game", href: "/games/circle-game/" }] },
    ],
  },
];
