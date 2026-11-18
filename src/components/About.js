import React from 'react';
import { FaPaperPlane, FaFileAlt } from "react-icons/fa";
import { ReactTyped } from 'react-typed';
import { profile } from '../data/profile';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#F7F0E6] dark:bg-[#1A1412] text-[#2B231D] dark:text-[#F4ECE3] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Text Column */}
          <motion.div 
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#5C4033] dark:text-[#E6C594] text-xs font-bold uppercase tracking-widest bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#42352E] px-3.5 py-1.5 rounded-full mb-4 font-sans">
              {profile.titles[0]}
            </span>

            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#5C4033] dark:text-[#E6C594] mb-6 min-h-[2rem] flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ReactTyped
                strings={profile.titles}
                typeSpeed={50}
                backSpeed={50}
                backDelay={2000}
                loop
                className="typed-text font-serif italic text-[#5C4033] dark:text-[#E6C594]"
              />
            </motion.h2>

            <div className="space-y-4 mb-8">
              {profile.bio.map((p, i) => (
                <motion.p 
                  key={i} 
                  className="text-[#332721] dark:text-[#D6C7B8] text-base sm:text-lg font-sans leading-relaxed"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a 
                href="#contact" 
                className="bg-[#5C4033] text-white hover:bg-[#4A3328] dark:bg-[#E6C594] dark:text-[#2B231D] dark:hover:bg-[#F5D6A0] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest font-sans inline-flex items-center gap-2 shadow-md transition-all duration-200"
              >
                <FaPaperPlane className="text-xs" />
                <span>Get In Touch</span>
              </a>
              <a
                href="/Hayate_Yamamoto_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5C4033] text-white hover:bg-[#4A3328] dark:bg-[#E6C594] dark:text-[#2B231D] dark:hover:bg-[#F5D6A0] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest font-sans inline-flex items-center gap-2 shadow-md transition-all duration-200"
              >
                <FaFileAlt className="text-xs" />
                <span>View CV</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="w-full lg:w-[30rem] flex flex-col items-center shrink-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Stoneware Card Frame */}
            <div className="bg-[#EFE6D8] dark:bg-[#251E1A] border border-[#E2D6C5] dark:border-[#382E28] rounded-3xl p-4 shadow-sm relative group w-full max-w-lg transition-colors duration-300">
              <img
                src={profile.image}
                alt={`${profile.name} working at a computer`}
                className="w-full h-auto rounded-2xl border border-[#E2D6C5] dark:border-[#382E28] object-cover"
                loading="lazy"
              />

              {/* Quick Info Tag inside card */}
              <div className="mt-4 pt-3 border-t border-[#E2D6C5]/70 dark:border-[#382E28]/70 text-center">
                <p className="text-xs text-[#8C7A6B] dark:text-[#9E8E81] font-sans font-medium">
                  {profile.location} · {profile.workMode}
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
