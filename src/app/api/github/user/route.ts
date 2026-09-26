import { NextResponse } from 'next/server';
import { GITHUB_USERNAME, GITHUB_API_URL } from '@/lib/constants';

export const dynamic = 'force-static';
export const revalidate = 3600;

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub user');
    }

    const user: GitHubUser = await response.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}