/*
Intro suggestions you can swap in here:

1. Pragmatic software engineer building maintainable products, internal tooling, and automation.
2. PHP, Go, and TypeScript developer focused on shipping reliable systems without unnecessary complexity.
3. I build developer tools, backend systems, and AI-assisted workflows that make teams faster.
*/

type Badge = {
  label: string;
  message: string;
  color: string;
  logo?: string;
  link?: string;
  style?: "flat" | "flat-square" | "for-the-badge" | "plastic" | "social";
};

type ProjectOverride = {
  emoji?: string;
  description?: string;
};

export const profileConfig = {
  username: "aaronflorey",
  name: "Aaron Florey",
  headline:
    "Pragmatic software engineer building maintainable products, developer tools, and automation.",
  intro: [
    "I like sharp tools, dependable systems, and boring solutions to hard problems.",
    "Most of my recent work has been around PHP, Go, TypeScript, AI-assisted workflows, and platform automation.",
  ],
  quickFacts: [
    { emoji: "🌐", label: "Website", value: "[mochaka.dev](https://mochaka.dev)" },
    { emoji: "💼", label: "Company", value: "[@buckhamduffy](https://github.com/buckhamduffy)" },
    { emoji: "📍", label: "Location", value: "Australia" },
  ],
  badges: [
    {
      label: "PHP",
      message: "Laravel-first",
      color: "777BB4",
      logo: "php",
      link: "https://laravel.com",
      style: "flat-square",
    },
    {
      label: "Go",
      message: "CLI tooling",
      color: "00ADD8",
      logo: "go",
      link: "https://go.dev",
      style: "flat-square",
    },
    {
      label: "TypeScript",
      message: "Bun runtime",
      color: "3178C6",
      logo: "typescript",
      link: "https://bun.sh",
      style: "flat-square",
    },
    {
      label: "Focus",
      message: "Developer Automation",
      color: "111827",
      logo: "githubactions",
      style: "flat-square",
    },
  ],
  skillIcons: [
    "php",
    "laravel",
    "ts",
    "bun",
    "go",
    "docker",
    "cloudflare",
    "aws",
    "postgres",
    "redis",
    "linux",
    "git",
  ],
  recentProjects: {
    lookbackMonths: 6,
    maxCount: 8,
    excludeForks: true,
    excludeArchived: true,
    excludedRepoNames: ["aaronflorey", "github-profile"],
    descriptionMaxLength: 96,
  },
  waka: {
    title: "Weekly coding stats",
    sectionName: "waka",
  },
  stats: {
    theme: "tokyonight",
  },
  projectOverrides: {
    "homebrew-tap": {
      emoji: "🍺",
      description: "Homebrew tap for publishing and installing my CLI tools.",
    },
  } satisfies Record<string, ProjectOverride>,
} as const satisfies {
  username: string;
  name: string;
  headline: string;
  intro: string[];
  quickFacts: Array<{ emoji: string; label: string; value: string }>;
  badges: Badge[];
  skillIcons: string[];
  recentProjects: {
    lookbackMonths: number;
    maxCount: number;
    excludeForks: boolean;
    excludeArchived: boolean;
    excludedRepoNames: string[];
    descriptionMaxLength: number;
  };
  waka: {
    title: string;
    sectionName: string;
  };
  stats: {
    theme: string;
  };
  projectOverrides: Record<string, ProjectOverride>;
};
