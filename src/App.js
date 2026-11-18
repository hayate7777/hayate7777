// src/App.js
import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import { SkeletonGrid } from "./components/ui/skeleton";
import { trackPageView, initClarity } from "./lib/analytics";
import { profile } from "./data/profile";
import { translations } from "./data/translations";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import "./index.css";
const Experience = React.lazy(() => import("./components/Experience"));
const Projects = React.lazy(() => import("./components/Projects"));
const Skills = React.lazy(() => import("./components/Skills"));
const Education = React.lazy(() => import("./components/Education"));
const Contact = React.lazy(() => import("./components/Contact"));

function AppContent() {
  const { language } = useLanguage();
  const content = translations[language];

  useEffect(() => {
    initClarity();
    trackPageView();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{profile.name} — {content.profile.titles[0]}</title>
        <meta
          name="description"
          content={content.profile.bio[0]}
        />
        <meta
          name="keywords"
          content={content.meta.keywords}
        />
        <meta name="author" content={profile.name} />
        <meta
          property="og:title"
          content={`${profile.name} — ${content.profile.titles[0]}`}
        />
        <meta
          property="og:description"
          content={content.profile.bio[0]}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={profile.social.website} />
        <meta property="og:site_name" content={content.meta.siteName} />
        <meta property="og:locale" content={language === "ja" ? "ja_JP" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${profile.name} — ${content.profile.titles[0]}`}
        />
        <meta
          name="twitter:description"
          content={content.profile.bio[0]}
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
            "jobTitle": "${content.profile.titles[0]}",
            "knowsAbout": ["React", "TypeScript", "Node.js", "Laravel", "AWS", "Docker", "CI/CD", "Microservices"],
            "description": "${content.profile.bio[0]}",
            "email": "${profile.social.email}"
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "${content.meta.siteName}",
            "url": "${profile.social.website}",
            "description": "${content.profile.bio[0]}"
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

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
