import React, { useState } from 'react';
import { projects } from '../data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { translations } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const [selectedProjIndex, setSelectedProjIndex] = useState(null);
  const { language } = useLanguage();
  const content = translations[language];
  const selectedProj = selectedProjIndex === null ? null : projects[selectedProjIndex];
  const selectedProjectContent = selectedProjIndex === null
    ? null
    : language === 'ja'
      ? content.projects.items[selectedProjIndex]
      : selectedProj;

  return (
    <section id="projects" className="py-20 sm:py-24 bg-[#F7F0E6] dark:bg-[#1A1412] text-[#2B231D] dark:text-[#F4ECE3] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#5C4033] dark:text-[#E6C594] text-xs font-bold uppercase tracking-widest block mb-2 font-sans">
            {content.projects.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#2B231D] dark:text-[#F4ECE3]">
            {content.projects.title}
          </h2>
          <p className="text-[#332721] dark:text-[#D6C7B8] text-base mt-4 font-sans leading-relaxed">
            {content.projects.description}
          </p>
        </motion.div>

        {/* Project Card Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, index) => {
            const localizedProject = language === 'ja' ? content.projects.items[index] : proj;

            return (
            <motion.div 
              key={proj.id || index}
              className="bg-[#EFE6D8] dark:bg-[#251E1A] border border-[#E2D6C5] dark:border-[#382E28] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                {/* Project Image Frame */}
                {proj.image && (
                  <div className="relative overflow-hidden h-48 border-b border-[#E2D6C5] dark:border-[#382E28] bg-[#E7DDCD] dark:bg-[#1A1412]">
                    <img 
                      src={proj.image} 
                      alt={localizedProject.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2B231D] dark:text-[#F4ECE3] mb-3">
                    {localizedProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#332721] dark:text-[#D6C7B8] font-sans leading-relaxed mb-6 line-clamp-2">
                    {localizedProject.description}
                  </p>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.technologies && proj.technologies.slice(0, 4).map((tech, techIdx) => (
                      <span 
                        key={techIdx} 
                        className="bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#42352E] text-[#2B231D] dark:text-[#E8D4C8] text-[11px] font-semibold px-3 py-1 rounded-full font-sans"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies && proj.technologies.length > 4 && (
                      <span className="bg-[#E7DDCD] dark:bg-[#342A24] text-[#8C7A6B] dark:text-[#9E8E81] text-[11px] font-semibold px-2.5 py-1 rounded-full font-sans">
                        +{proj.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Action Links Footer */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between gap-3 border-t border-[#E2D6C5]/60 dark:border-[#382E28]/60 pt-4 mt-auto">
                <button 
                  onClick={() => setSelectedProjIndex(index)}
                  className="text-xs font-bold text-[#2B231D] dark:text-[#F4ECE3] hover:text-[#5C4033] dark:hover:text-[#E6C594] transition-colors font-sans"
                >
                  {content.projects.viewDetails} &rarr;
                </button>

                <div className="flex items-center gap-2">
                  {(proj.links?.github || proj.links?.code) && (
                    <a 
                      href={proj.links.github || proj.links.code} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2.5 rounded-full bg-[#E7DDCD] dark:bg-[#342A24] text-[#2B231D] dark:text-[#F4ECE3] hover:bg-[#B8AA94] dark:hover:bg-[#4D3F38] transition-colors text-sm"
                      aria-label={content.projects.repository}
                    >
                      <FaGithub />
                    </a>
                  )}
                  {proj.links?.demo && (
                    <a 
                      href={proj.links.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-[#5C4033] dark:bg-[#E6C594] text-white dark:text-[#2B231D] hover:bg-[#4A3328] dark:hover:bg-[#F5D6A0] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-sans inline-flex items-center gap-1.5 shadow-sm"
                    >
                      {content.projects.demo} <FaExternalLinkAlt className="text-[9px]" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Modal View for Project Detail */}
        <AnimatePresence>
          {selectedProj && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjIndex(null)}
            >
              <motion.div 
                className="bg-[#F7F0E6] dark:bg-[#201A17] border border-[#E2D6C5] dark:border-[#382E28] text-[#2B231D] dark:text-[#F4ECE3] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProjIndex(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[#E7DDCD] dark:bg-[#342A24] text-[#2B231D] dark:text-[#F4ECE3] hover:bg-[#B8AA94] transition-colors"
                  aria-label={content.projects.closeDialog}
                >
                  <FaTimes />
                </button>

                <span className="text-[#5C4033] dark:text-[#E6C594] text-xs font-bold uppercase tracking-wider block mb-1 font-sans">
                  {content.projects.insight}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-4 pr-8">
                  {selectedProjectContent.title}
                </h3>

                <p className="text-sm text-[#332721] dark:text-[#D6C7B8] font-sans leading-relaxed mb-6">
                  {selectedProjectContent.description}
                </p>

                {selectedProj.gallery?.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    {selectedProj.gallery.slice(0, 2).map((image, index) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${content.projects.imageAlt(selectedProjectContent.title)} ${index + 1}`}
                        className="w-full aspect-[4/3] object-cover rounded-2xl border border-[#E2D6C5] dark:border-[#382E28]"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                {selectedProjectContent.details?.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B231D] dark:text-[#F4ECE3] font-sans">
                      {content.projects.highlights}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#332721] dark:text-[#D6C7B8] font-sans">
                      {selectedProjectContent.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#5C4033] dark:text-[#E6C594] font-bold">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProj.technologies && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B231D] dark:text-[#F4ECE3] font-sans mb-3">
                      {content.projects.technologies}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProj.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#42352E] text-[#2B231D] dark:text-[#E8D4C8] text-xs font-semibold px-3 py-1 rounded-full font-sans"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E2D6C5] dark:border-[#382E28]">
                  {(selectedProj.links?.github || selectedProj.links?.code) && (
                    <a 
                      href={selectedProj.links.github || selectedProj.links.code} 
                      className="bg-[#B8AA94] dark:bg-[#3D322C] text-[#2B231D] dark:text-[#F4ECE3] hover:bg-[#A89A84] dark:hover:bg-[#4A3D36] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> {content.projects.repository}
                    </a>
                  )}
                  {selectedProj.links?.frontend && (
                    <a 
                      href={selectedProj.links.frontend} 
                      className="bg-[#B8AA94] dark:bg-[#3D322C] text-[#2B231D] dark:text-[#F4ECE3] hover:bg-[#A89A84] dark:hover:bg-[#4A3D36] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> {content.projects.frontend}
                    </a>
                  )}
                  {selectedProj.links?.backend && (
                    <a 
                      href={selectedProj.links.backend} 
                      className="bg-[#B8AA94] dark:bg-[#3D322C] text-[#2B231D] dark:text-[#F4ECE3] hover:bg-[#A89A84] dark:hover:bg-[#4A3D36] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> {content.projects.backend}
                    </a>
                  )}
                  {selectedProj.links?.demo && (
                    <a 
                      href={selectedProj.links.demo} 
                      className="bg-[#5C4033] dark:bg-[#E6C594] text-white dark:text-[#2B231D] hover:bg-[#4A3328] dark:hover:bg-[#F5D6A0] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt className="text-[10px]" /> {content.projects.liveDemo}
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
