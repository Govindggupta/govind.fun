/**
 * Curated site content — verified against github.com/Govindggupta and
 * govindgupta.me. Copy is written in first person, based on Govind's own
 * words from his previous site.
 */

export const site = {
  name: "Govind Gupta",
  role: "Full Stack Developer",
  location: "Surat, Gujarat, India",
  email: "contact@govindgupta.me",
  pronouns: "he/him",
  github: "https://github.com/Govindggupta",
  linkedin: "https://linkedin.com/in/govindggupta",
  twitter: "https://x.com/3g_g0vind",
  discord: "https://discord.com/users/govind_5649",
  blog: "https://govindgupta.me",
  source: "https://github.com/Govindggupta/govind.fun",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const aboutLead =
  "Started after 12th — wasn't a plan, was an exploration. Tried different paths, found this one felt right. Never looked back.";

export const aboutParagraphs = [
  "What pulls me in is the invisible layer underneath — rate limiting, real-time sync, databases talking to servers, a million people watching the same stream in the same second. That stuff genuinely excites me.",
  "I built Brainly from scratch — no AI, no shortcuts. It taught me more than anything else, and I'm still proud of it.",
  "I see code as infrastructure for everything — mechanical, robotics, automation, any field. If something can be made faster or smarter, code is how.",
  "Right now I'm open to work — internships and collaborations, anything interesting. And learning is how I unwind: I pick up new frameworks not because I have to, but because it's fun. Open sourcerer at heart.",
];

export const capabilities = [
  {
    title: "Full-Stack Web",
    description:
      "TypeScript-first products end to end — Next.js and React up front, Node/Bun and SQL or document databases behind, shipped on Vercel and Docker.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma"],
  },
  {
    title: "Real-time Systems",
    description:
      "Live multiplayer games, chats and polls — sockets, sync and the state-management gremlins that come with them. The invisible layer is my favourite layer.",
    tags: ["WebSockets", "Real-time sync", "Multiplayer", "Live polls"],
  },
  {
    title: "AI-Powered Products",
    description:
      "Products that actually use models — an AI interview platform, a web-scraping agent, a PR-review bot — with LangChain and Pinecone in the mix.",
    tags: ["LangChain", "Pinecone", "Agents", "LLMs"],
  },
  {
    title: "Developer Tooling",
    description:
      "Automation and setups that make shipping faster — PR preview deploys on GitHub Pages, a hand-rolled Neovim config, dotfiles that travel.",
    tags: ["GitHub Actions", "Neovim", "Linux", "Docker"],
  },
];

export const stackMarquee = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "LangChain",
  "Pinecone",
  "Docker",
  "Linux",
  "Neovim",
  "Git",
  "Bun",
];

export interface Project {
  name: string;
  description: string;
  href: string;
  year: string;
  tags: string[];
  /** Matches the GitHub repo name (case-insensitive) to pull stars/language. */
  repoName?: string;
  live?: boolean;
}

export const projects: Project[] = [
  {
    name: "PulseBoard",
    description: "Live poll maker — create a poll, share a link, watch results stream in.",
    href: "https://pulseboard.govindgupta.me",
    year: "2026",
    tags: ["Next.js", "Real-time"],
    repoName: "PulseBoard",
    live: true,
  },
  {
    name: "govindgupta.me",
    description: "My small home on the internet — minimal, monochrome, built in public.",
    href: "https://govindgupta.me",
    year: "2025",
    tags: ["Next.js", "Blog", "MDX"],
    repoName: "govindgupta.me",
    live: true,
  },
  {
    name: "Chess",
    description: "A real-time multiplayer chess game — play a friend from anywhere.",
    href: "https://chess-sand-sigma.vercel.app",
    year: "2025",
    tags: ["TypeScript", "WebSockets"],
    repoName: "chess",
    live: true,
  },
  {
    name: "NextHire",
    description: "An AI-powered interview preparation platform.",
    href: "https://github.com/Govindggupta/NextHire",
    year: "2025",
    tags: ["AI", "Next.js"],
    repoName: "NextHire",
  },
  {
    name: "Brainly",
    description: "A second brain built from scratch — no AI, no shortcuts. My proudest build.",
    href: "https://github.com/Govindggupta/Brainly",
    year: "2026",
    tags: ["TypeScript", "From scratch"],
    repoName: "Brainly",
  },
  {
    name: "govind.fun",
    description: "This site — a playground to try amazing things. ⚡",
    href: "https://github.com/Govindggupta/govind.fun",
    year: "2026",
    tags: ["Next.js", "Parallax"],
    repoName: "govind.fun",
  },
];

export const timeline = [
  {
    year: "2022",
    text: "Wrote my first line on GitHub. Pure exploration after 12th — and it stuck.",
  },
  {
    year: "2024",
    text: "Went deep on the web: React, JavaScript, Node. Dozens of small builds, one big direction.",
  },
  {
    year: "2025",
    text: "GenAI cohort, real-time apps and NextHire — AI-powered products became my playground.",
  },
  {
    year: "2026",
    text: "Building in public: PulseBoard, govind.fun, a cleaner dotfiles setup. Open to work.",
  },
];
