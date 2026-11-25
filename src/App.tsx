import { About } from './components/About';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { FeaturedProject } from './components/FeaturedProject';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ParticleSelfCanvas } from './components/ParticleSelfCanvas';
import { Skills } from './components/Skills';

function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}

export function App() {
  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-[#e5f04e] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>

      {/* z-0: Pure Obsidian Backdrop */}
      <BackgroundCanvas />

      {/* z-20: Scroll-Driven Interactive 3D Particle Self (sits ABOVE hero backdrop text z-10, BELOW foreground UI z-30) */}
      <ParticleSelfCanvas />

      {/* z-50: Floating Centered Capsule Navigation Dock */}
      <Navbar />

      {/* Notice: <main> has no z-index so Hero's z-10 backdrop text & z-30 foreground overlay sandwich z-20 particles cleanly */}
      <main id="main-content">
        <Hero />

        {/* z-30: Editorial Content Sections floating smoothly over dispersed 3D particles */}
        <div className="relative z-30 bg-gradient-to-b from-transparent via-black/60 to-black/85">
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <FeaturedProject />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Certificates />
          <SectionDivider />
          <Education />
          <SectionDivider />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
