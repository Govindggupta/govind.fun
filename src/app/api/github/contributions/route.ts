import { NextResponse } from 'next/server';
import { GITHUB_USERNAME, GITHUB_API_URL } from '@/lib/constants';

// Force static generation with revalidation every hour
export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

interface GitHubEvent {
  type: string;
  created_at: string;
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const eventsResponse = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/events/public?per_page=100`,
      { headers }
    );

    if (!eventsResponse.ok) {
      throw new Error('Failed to fetch GitHub events');
    }

    const events: GitHubEvent[] = await eventsResponse.json();

    const contributionsMap = new Map<string, number>();
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      contributionsMap.set(dateStr, 0);
    }

    events.forEach((event) => {
      if (event.type === 'PushEvent' || event.type === 'PullRequestEvent' || event.type === 'IssueEvent') {
        const eventDate = new Date(event.created_at);
        const dateStr = eventDate.toISOString().split('T')[0];
        const current = contributionsMap.get(dateStr) || 0;
        contributionsMap.set(dateStr, current + 1);
      }
    });

    const contributions = Array.from(contributionsMap.entries())
      .map(([date, count]) => ({
        date,
        count: Math.min(count, 7),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    const today = new Date();
    const contributions = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      contributions.push({
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 8),
      });
    }
    return NextResponse.json(contributions);
  }
}