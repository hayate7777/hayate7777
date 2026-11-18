import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { profile } from '../data/profile';
import { translations } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const content = translations[language];
  const links = [
    { id: 'about', label: content.nav.about },
    { id: 'experience', label: content.nav.experience },
    { id: 'projects', label: content.nav.projects },
    { id: 'skills', label: content.nav.skills },
    { id: 'education', label: content.nav.education },
    { id: 'contact', label: content.nav.contact },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const handleLanguageToggle = () => {
    setMenuOpen(false);
    toggleLanguage();
  };

  return (
    <header className="sticky top-3 z-50 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="bg-[#EFE6D8]/95 dark:bg-[#251E1A]/95 backdrop-blur-md border border-[#E2D6C5] dark:border-[#382E28] rounded-full px-6 py-3 shadow-md">
        <nav className="flex items-center justify-between">
          <button
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B231D] dark:text-[#F4ECE3] hover:text-[#5C4033] dark:hover:text-[#E6C594] transition-colors"
            onClick={() => scrollToSection('about')}
          >
            {profile.name}
          </button>
          <div className="flex items-center gap-3">
            <ul className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#332721] dark:text-[#D6C7B8]">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    className="hover:text-[#2B231D] dark:hover:text-[#F4ECE3] transition-colors"
                    href={`#${link.id}`}
                    onClick={() => scrollToSection(link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleLanguageToggle}
              aria-label={content.languageButton.ariaLabel}
              className="text-xs font-bold tracking-wide text-[#5C4033] dark:text-[#E6C594] border border-[#B8AA94] dark:border-[#4A3D36] rounded-full px-3 py-2 hover:bg-[#E7DDCD] dark:hover:bg-[#342A24] transition-colors"
            >
              {content.languageButton.label}
            </button>
            <div className="lg:hidden">
              <button
                type="button"
                className="text-xl text-[#2B231D] dark:text-[#F4ECE3]"
                onClick={toggleMenu}
                aria-label={content.nav.toggleMenu}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </nav>
      </div>
      {menuOpen && (
        <div className="lg:hidden mt-2 bg-[#EFE6D8] dark:bg-[#251E1A] border border-[#E2D6C5] dark:border-[#382E28] rounded-3xl p-6 shadow-xl">
          <ul className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-wider text-[#332721] dark:text-[#D6C7B8]">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  className="block hover:text-[#2B231D] dark:hover:text-[#F4ECE3]"
                  href={`#${link.id}`}
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
