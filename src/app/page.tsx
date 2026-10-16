import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Capabilities from '@/components/Capabilities';
import Work from '@/components/Work';
import Journey from '@/components/Journey';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/fx/ScrollFX';
import { getContributions, getGitHubUser, getRepos } from '@/lib/github';

// All GitHub data is fetched at build time — the exported HTML is fully
// rendered, zero runtime API calls.
export default async function Home() {
  const [user, contributionsData, repos] = await Promise.all([
    getGitHubUser(),
    getContributions(),
    getRepos(),
  ]);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  return (
    <>
      <Nav />
      <main>
        <Hero user={user} />
        <About user={user} />
        <Capabilities />
        <Work repos={repos} />
        <Journey
          contributions={contributionsData.contributions}
          totalContributions={contributionsData.total}
          repoCount={repos.length}
          totalStars={totalStars}
          followers={user.followers}
        />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
