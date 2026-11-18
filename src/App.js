// src/App.js
import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import { SkeletonGrid } from "./components/ui/skeleton";
import { trackPageView, initClarity } from "./lib/analytics";
import { profile } from "./data/profile";
import "./index.css";
const Experience = React.lazy(() => import("./components/Experience"));
const Projects = React.lazy(() => import("./components/Projects"));
const Skills = React.lazy(() => import("./components/Skills"));
const Education = React.lazy(() => import("./components/Education"));
const Contact = React.lazy(() => import("./components/Contact"));

function App() {
  useEffect(() => {
    initClarity();
    trackPageView();
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{profile.name} — {profile.titles[0]}</title>
        <meta
          name="description"
          content={profile.bio[0]}
        />
        <meta
          name="keywords"
          content="Hayate Yamamoto, Senior Full Stack Engineer, Software Architect, React, TypeScript, Node.js, Laravel, AWS, Docker, CI/CD, Microservices"
        />
        <meta name="author" content={profile.name} />
        <meta
          property="og:title"
          content={`${profile.name} — ${profile.titles[0]}`}
        />
        <meta
          property="og:description"
          content={profile.bio[0]}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={profile.social.website} />
        <meta property="og:site_name" content={`${profile.name} Portfolio`} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${profile.name} — ${profile.titles[0]}`}
        />
        <meta
          name="twitter:description"
          content={profile.bio[0]}
        />
        <link rel="canonical" href={profile.social.website} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "${profile.name}",
            "url": "${profile.social.website}",
            "image": "${profile.social.website}/hayate-yamamoto.png",
            "sameAs": [
              "${profile.social.github}",
              "${profile.social.linkedin}"
            ],
            "jobTitle": "${profile.titles[0]}",
            "knowsAbout": ["React", "TypeScript", "Node.js", "Laravel", "AWS", "Docker", "CI/CD", "Microservices"],
            "description": "${profile.bio[0]}",
            "email": "${profile.social.email}"
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "${profile.name} Portfolio",
            "url": "${profile.social.website}",
            "description": "${profile.bio[0]}"
          }
        `}</script>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      </Helmet>
      <Header />
      <div className="main-content">
        <About />
        <Suspense
          fallback={
            <div className="container py-16">
              <SkeletonGrid count={6} />
            </div>
          }>
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
