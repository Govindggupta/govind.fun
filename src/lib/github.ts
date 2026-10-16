import { GITHUB_API_URL, GITHUB_USERNAME } from './constants';

const CONTRIBUTIONS_API_URL = 'https://github-contributions-api.jogruber.de/v4';

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
}

export interface Contribution {
  date: string;
  count: number;
  level: number;
}

export interface ContributionsData {
  contributions: Contribution[];
  total: number | null;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  pushed_at: string;
}

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

/**
 * Fetched once at build time and baked into the static HTML, so the page is
 * fully rendered on first paint. Throws when GitHub is unreachable so a broken
 * deploy fails loudly instead of shipping a blank page.
 */
export async function getGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`, {
    headers: githubHeaders(),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub user request failed (${response.status} ${response.statusText})`
    );
  }

  const user = await response.json();

  return {
    login: user.login,
    name: user.name ?? null,
    avatar_url: user.avatar_url,
    bio: user.bio ?? null,
    public_repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    location: user.location ?? null,
  };
}

/**
 * Contribution calendar data from the public contributions API (no token
 * required). Resolves with an empty calendar when the service is down so a
 * flaky third party can't block a deploy.
 */
export async function getContributions(): Promise<ContributionsData> {
  try {
    const response = await fetch(
      `${CONTRIBUTIONS_API_URL}/${GITHUB_USERNAME}?y=last`,
      {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(15_000),
      }
    );

    if (!response.ok) {
      throw new Error(`Contribution request failed (${response.status})`);
    }

    const data = await response.json();

    return {
      contributions: Array.isArray(data?.contributions) ? data.contributions : [],
      total: typeof data?.total?.lastYear === 'number' ? data.total.lastYear : null,
    };
  } catch (error) {
    console.warn('Could not load GitHub contributions:', error);
    return { contributions: [], total: null };
  }
}

/**
 * Own (non-fork) public repos, used for project stars/languages and the
 * "journey" stats. Soft-fails to an empty list so the site still builds.
 */
export async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers: githubHeaders(),
        signal: AbortSignal.timeout(15_000),
      }
    );

    if (!response.ok) {
      throw new Error(`Repos request failed (${response.status})`);
    }

    const repos = await response.json();

    return (Array.isArray(repos) ? repos : [])
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        description: repo.description ?? null,
        html_url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language ?? null,
        stargazers_count: repo.stargazers_count ?? 0,
        topics: Array.isArray(repo.topics) ? repo.topics : [],
        created_at: repo.created_at,
        pushed_at: repo.pushed_at,
      }));
  } catch (error) {
    console.warn('Could not load GitHub repos:', error);
    return [];
  }
}
