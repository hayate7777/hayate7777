import React from 'react';
import { skills } from '../data/skills';
import { motion } from 'framer-motion';
import {
  Bot,
  BrainCircuit,
  CodeXml,
  DatabaseZap,
  ListChecks,
  MousePointer2,
  Network,
  UsersRound,
  Workflow,
} from 'lucide-react';
import {
  SiAmazonaws,
  SiCircleci,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiJenkins,
  SiOpenai,
  SiTensorflow,
} from 'react-icons/si';
import { translations } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';

const skillIconOverrides = {
  'AI & Machine Learning': {
    OpenAI: { component: SiOpenai, color: '#412991' },
    LLM: { component: BrainCircuit },
    RAG: { component: DatabaseZap },
    LangChain: { component: Workflow },
    'AI Agents': { component: Bot },
    TensorFlow: { component: SiTensorflow, color: '#FF6F00' },
    Cursor: { component: MousePointer2 },
  },
  'Engineering Practices': {
    Agile: { component: Workflow },
    Scrum: { component: ListChecks },
    'System Design': { component: Network },
    'Code Review': { component: CodeXml },
    'Technical Leadership': { component: UsersRound },
  },
  'Cloud & DevOps': {
    AWS: { component: SiAmazonaws, color: '#232F3E' },
    Docker: { component: SiDocker, color: '#2496ED' },
    CircleCI: { component: SiCircleci, color: '#343434' },
    'GitHub Actions': { component: SiGithubactions, color: '#2088FF' },
    'CI/CD': { component: SiJenkins, color: '#D24939' },
    Git: { component: SiGit, color: '#F05032' },
  },
};

const SkillIcon = ({ category, skill, language }) => {
  const icon = skillIconOverrides[category]?.[skill.name];
  const skillName = translations[language].skills.names[skill.name] || skill.name;
  const iconLabel = language === 'ja' ? `${skillName}のアイコン` : `${skillName} icon`;

  if (icon) {
    const Icon = icon.component;
    return (
      <div className="w-6 h-6 flex items-center justify-center shrink-0" aria-label={iconLabel} role="img">
        <Icon size={24} color={icon.color} strokeWidth={1.8} aria-hidden="true" />
      </div>
    );
  }

  if (!skill.icon) {
    return null;
  }

  return (
    <div className="w-6 h-6 flex items-center justify-center shrink-0">
      <img
        src={skill.icon}
        alt={skillName}
        className="max-h-6 max-w-6 object-contain dark:brightness-110 transition-transform duration-200 hover:scale-110"
        loading="lazy"
      />
    </div>
  );
};

const Skills = () => {
  const { language } = useLanguage();
  const content = translations[language];
  const skillCategories = skills.map((category, index) => ({
    originalTitle: category.title,
    title: content.skills.categories[index],
    skills: category.items,
  }));

  return (
    <section id="skills" className="py-20 sm:py-24 bg-[#F7F0E6] dark:bg-[#1A1412] text-[#2B231D] dark:text-[#F4ECE3] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#5C4033] dark:text-[#E6C594] text-xs font-bold uppercase tracking-widest block mb-2 font-sans">
            {content.skills.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#2B231D] dark:text-[#F4ECE3]">
            {content.skills.title}
          </h2>
          <p className="text-[#332721] dark:text-[#D6C7B8] text-base mt-4 font-sans leading-relaxed">
            {content.skills.description}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              className="bg-[#EFE6D8] dark:bg-[#251E1A] border border-[#E2D6C5] dark:border-[#382E28] rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2B231D] dark:text-[#F4ECE3] mb-6 pb-3 border-b border-[#E2D6C5]/70 dark:border-[#382E28]/70 flex items-center justify-between">
                <span>{category.title}</span>
                {/* <span className="text-xs font-sans font-medium text-[#8C7A6B] dark:text-[#E8D4C8] bg-[#E7DDCD] dark:bg-[#342A24] px-3 py-1 rounded-full border border-[#E2D6C5] dark:border-[#42352E]">
                  {category.skills.length} skills
                </span> */}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex} 
                    className="flex items-center gap-3 bg-[#F7F0E6] dark:bg-[#1A1412] border border-[#E2D6C5] dark:border-[#382E28] rounded-xl px-3.5 py-2.5 hover:bg-[#FBF6EE] dark:hover:bg-[#231B18] hover:border-[#B8AA94] dark:hover:border-[#4A3D36] transition-all duration-200"
                    whileHover={{ y: -2 }}
                  >
                    <SkillIcon category={category.originalTitle} skill={skill} language={language} />
                    <span className="text-xs font-semibold text-[#2B231D] dark:text-[#F4ECE3] whitespace-nowrap font-sans">
                      {content.skills.names[skill.name] || skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;