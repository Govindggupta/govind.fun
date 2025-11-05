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

export default function GithubProfileCard() {
  const [user, setUser] = useState<GitHubUser | null>(null);
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
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching GitHub data:', err);
        setLoading(false);
      });

    return () => clearInterval(typingInterval);
  }, []);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const githubActivityGraphUrl = `https://github-readme-activity-graph.vercel.app/graph?username=${user.login}&theme=github-compact&hide_border=true`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117] p-4">
      <div className="w-full max-w-6xl bg-[#161b22] border border-[#30363d] rounded-lg p-6 md:p-8">
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

        {/* Main Content: Photo on Left, Graph on Right */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Profile Image */}
          <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
            <div className="relative mb-4">
              <Image
                src={user.avatar_url}
                alt={user.name || user.login}
                width={280}
                height={280}
                className="rounded-full border-2 border-[#30363d]"
              />
            </div>
            
            {/* Profile Info */}
            <div className="text-center lg:text-left">
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
                <p className="text-[#c9d1d9] mb-4 text-sm">{user.bio}</p>
              )}

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-[#8b949e] mb-4">
                <span>{user.followers} followers</span>
                <span>·</span>
                <span>{user.following} following</span>
              </div>

              {user.location && (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[#8b949e]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - GitHub Activity Graph */}
          <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#c9d1d9] mb-4">
              {user.name || user.login}'s GitHub Activity Graph
            </h3>
            
            <div className="w-full">
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Image
                  src={githubActivityGraphUrl}
                  alt={`${user.name || user.login}'s GitHub activity graph`}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded"
                  unoptimized
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

