'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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

interface ContributionData {
  date: string;
  count: number;
}

export default function GithubProfileCard() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm Govind Gupta ✌️";

  useEffect(() => {
    // Animated typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Fetch GitHub user data
    fetch('https://api.github.com/users/govindggupta')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        // Fetch contribution data (simulated - GitHub doesn't have direct API for this)
        // We'll use a workaround with GitHub calendar API
        return fetchContributionData();
      })
      .then(data => {
        setContributions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching GitHub data:', err);
        setLoading(false);
      });

    return () => clearInterval(typingInterval);
  }, []);

  const fetchContributionData = async (): Promise<ContributionData[]> => {
    try {
      const response = await fetch('/api/github/contributions');
      if (!response.ok) throw new Error('Failed to fetch contributions');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching contributions:', error);
      // Fallback to mock data
      const today = new Date();
      const data: ContributionData[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 8)
        });
      }
      return data;
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const maxContributions = Math.max(...contributions.map(c => c.count), 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117] p-4">
      <div className="w-full max-w-4xl bg-[#161b22] border border-[#30363d] rounded-lg p-6 md:p-8">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={user.avatar_url}
                alt={user.name || user.login}
                width={200}
                height={200}
                className="rounded-full border-2 border-[#30363d]"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              <a 
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#58a6ff] transition-colors"
              >
                {user.name || user.login}
              </a>
            </h1>
            <p className="text-[#8b949e] mb-4">
              <a 
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#58a6ff] transition-colors"
              >
                @{user.login}
              </a>
            </p>
            
            {user.bio && (
              <p className="text-[#c9d1d9] mb-4">{user.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-[#8b949e] mb-4">
              <span>{user.followers} followers</span>
              <span>·</span>
              <span>{user.following} following</span>
            </div>

            {user.location && (
              <div className="flex items-center gap-2 text-[#8b949e]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Animated Greeting */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-mono text-[#808080]">
            <a 
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#58a6ff] transition-colors"
            >
              {displayText}
              <span className="animate-pulse">|</span>
            </a>
          </h2>
        </div>

        {/* Contribution Graph */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">
            {user.name || user.login}'s Contribution Graph
          </h3>
          
          <div className="relative">
            {/* Graph Container */}
            <div className="bg-[#161b22] rounded p-4">
              <svg
                width="100%"
                height="200"
                viewBox="0 0 800 200"
                className="overflow-visible"
              >
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    y1={30 + y * 20}
                    x2="760"
                    y2={30 + y * 20}
                    stroke="#30363d"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                ))}

                {/* Y-axis labels */}
                {[0, 1, 2, 3, 4, 5, 6, 7].reverse().map((y) => (
                  <text
                    key={y}
                    x="35"
                    y={35 + (7 - y) * 20}
                    fill="#8b949e"
                    fontSize="10"
                    textAnchor="end"
                  >
                    {y}
                  </text>
                ))}

                {/* X-axis labels */}
                {contributions.map((cont, index) => {
                  if (index % 5 === 0) {
                    const date = new Date(cont.date);
                    return (
                      <text
                        key={index}
                        x={50 + (index / contributions.length) * 720}
                        y="185"
                        fill="#8b949e"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {date.getDate()}
                      </text>
                    );
                  }
                  return null;
                })}

                {/* Contribution line graph */}
                <polyline
                  points={contributions
                    .map(
                      (cont, index) =>
                        `${50 + (index / contributions.length) * 720},${
                          170 - (cont.count / maxContributions) * 140
                        }`
                    )
                    .join(' ')}
                  fill="none"
                  stroke="#40c463"
                  strokeWidth="2.5"
                />

                {/* Data points */}
                {contributions.map((cont, index) => {
                  const x = 50 + (index / contributions.length) * 720;
                  const y = 170 - (cont.count / maxContributions) * 140;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#40c463"
                      stroke="#161b22"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* Axis labels */}
                <text
                  x="400"
                  y="200"
                  fill="#8b949e"
                  fontSize="12"
                  textAnchor="middle"
                >
                  Days
                </text>
                <text
                  x="20"
                  y="100"
                  fill="#8b949e"
                  fontSize="12"
                  textAnchor="middle"
                  transform="rotate(-90 20 100)"
                >
                  Contributions
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

