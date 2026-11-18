import React from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { profile } from "../data/profile";
import { trackGithubClick } from "../lib/analytics";

const Footer = () => {
  return (
    <footer className="border-t border-[#E2D6C5] dark:border-[#382E28] bg-[#F7F0E6] dark:bg-[#1A1412] text-[#2B231D] dark:text-[#F4ECE3] py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-8 justify-between items-start">
          <div className="space-y-3 max-w-md">
            <h3 className="font-serif text-2xl font-normal text-[#2B231D] dark:text-[#F4ECE3]">
              {profile.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#332721] dark:text-[#D6C7B8] font-sans leading-relaxed">
              {profile.bio[0]}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#E6C594] mb-4 font-sans">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-sans">
              <li>
                <a className="text-[#332721] dark:text-[#D6C7B8] hover:text-[#5C4033] dark:hover:text-[#E6C594] transition-colors" href="#about">
                  About Studio
                </a>
              </li>
              <li>
                <a className="text-[#332721] dark:text-[#D6C7B8] hover:text-[#5C4033] dark:hover:text-[#E6C594] transition-colors" href="#experience">
                  Experience
                </a>
              </li>
              <li>
                <a className="text-[#332721] dark:text-[#D6C7B8] hover:text-[#5C4033] dark:hover:text-[#E6C594] transition-colors" href="#projects">
                  Selected Work
                </a>
              </li>
              <li>
                <a className="text-[#332721] dark:text-[#D6C7B8] hover:text-[#5C4033] dark:hover:text-[#E6C594] transition-colors" href="#skills">
                  Capabilities
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C4033] dark:text-[#E6C594] mb-4 font-sans">
              Connect
            </h4>
            <ul className="flex items-center gap-3">
              {profile.social.github && (
                <li>
                <a
                  className="w-10 h-10 rounded-full bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#382E28] flex items-center justify-center text-[#2B231D] dark:text-[#F4ECE3] hover:bg-[#5C4033] dark:hover:bg-[#E6C594] hover:text-white dark:hover:text-[#2B231D] hover:border-[#5C4033] dark:hover:border-[#E6C594] transition-all"
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGithubClick('Footer')}
                  aria-label="GitHub">
                  <FaGithub size={18} />
                </a>
                </li>
              )}
              {profile.social.email && (
                <li>
                <a
                  className="w-10 h-10 rounded-full bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#382E28] flex items-center justify-center text-[#2B231D] dark:text-[#F4ECE3] hover:bg-[#5C4033] dark:hover:bg-[#E6C594] hover:text-white dark:hover:text-[#2B231D] hover:border-[#5C4033] dark:hover:border-[#E6C594] transition-all"
                  href={`mailto:${profile.social.email}`}
                  aria-label="Email">
                  <FaEnvelope size={18} />
                </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E2D6C5]/70 dark:border-[#382E28]/70 text-center text-xs font-sans text-[#8C7A6B] dark:text-[#9E8E81] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. Warm Coffee Chestnut Editorial Edition.
          </p>
          <p>
            Crafted slowly, built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
