import React, { useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { trackContactSubmit, trackGithubClick, trackLinkedinClick } from "../lib/analytics";
import { profile } from "../data/profile";
import { translations } from "../data/translations";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { language } = useLanguage();
  const content = translations[language];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "true" : "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || "5f4f0f35-b3dd-4f7c-b0b1-6c47c5902e66",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `${content.contact.subjectPrefix}${formData.name}`,
          from_name: formData.name,
          botcheck: formData.botcheck,
        }),
      });

      const data = await response.json();

      if (data.success) {
        trackContactSubmit(formData.email);

        toast.success(
          content.contact.success,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setFormData({
          name: "",
          email: "",
          message: "",
          botcheck: "",
        });
      } else {
        throw new Error(data.message || content.contact.error);
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      toast.error(content.contact.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#F7F0E6] dark:bg-[#1A1412] text-[#2B231D] dark:text-[#F4ECE3] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#5C4033] dark:text-[#E6C594] text-xs font-bold uppercase tracking-widest block mb-2 font-sans">
            {content.contact.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#2B231D] dark:text-[#F4ECE3]">
            {content.contact.title}
          </h2>
          <p className="text-[#332721] dark:text-[#D6C7B8] text-base mt-4 font-sans leading-relaxed">
            {content.contact.description}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5 items-start">
          {/* Direct Contact Details Card */}
          <motion.div 
            className="lg:col-span-2 bg-[#EFE6D8] dark:bg-[#251E1A] border border-[#E2D6C5] dark:border-[#382E28] rounded-3xl p-8 shadow-sm flex flex-col justify-between h-full transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#2B231D] dark:text-[#F4ECE3] mb-3">
                {content.contact.channelsTitle}
              </h3>
              <p className="text-[#332721] dark:text-[#D6C7B8] font-sans text-sm mb-8 leading-relaxed">
                {content.contact.channelsDescription}
              </p>

              <div className="space-y-6">
                <a 
                  href={`mailto:${profile.social.email}`}
                  className="flex items-center gap-4 group p-3.5 bg-[#F7F0E6] dark:bg-[#1A1412] border border-[#E2D6C5] dark:border-[#382E28] rounded-2xl hover:border-[#5C4033] dark:hover:border-[#E6C594] transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#382E28] flex items-center justify-center text-[#5C4033] dark:text-[#E6C594] group-hover:bg-[#5C4033] dark:group-hover:bg-[#E6C594] group-hover:text-white dark:group-hover:text-[#2B231D] transition-colors">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8C7A6B] dark:text-[#9E8E81] uppercase font-bold block tracking-wider font-sans">{content.contact.email}</span>
                    <span className="text-sm font-semibold text-[#2B231D] dark:text-[#F4ECE3] font-sans">{profile.social.email}</span>
                  </div>
                </a>

                <a 
                  href={profile.social.linkedin}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackLinkedinClick('Contact Section')}
                  className="flex items-center gap-4 group p-3.5 bg-[#F7F0E6] dark:bg-[#1A1412] border border-[#E2D6C5] dark:border-[#382E28] rounded-2xl hover:border-[#5C4033] dark:hover:border-[#E6C594] transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#382E28] flex items-center justify-center text-[#5C4033] dark:text-[#E6C594] group-hover:bg-[#5C4033] dark:group-hover:bg-[#E6C594] group-hover:text-white dark:group-hover:text-[#2B231D] transition-colors">
                    <FaLinkedin className="text-lg" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8C7A6B] dark:text-[#9E8E81] uppercase font-bold block tracking-wider font-sans">{content.contact.linkedin}</span>
                    <span className="text-sm font-semibold text-[#2B231D] dark:text-[#F4ECE3] font-sans">linkedin.com/in/hayate7777</span>
                  </div>
                </a>

                <a 
                  href={profile.social.github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackGithubClick('Contact Section')}
                  className="flex items-center gap-4 group p-3.5 bg-[#F7F0E6] dark:bg-[#1A1412] border border-[#E2D6C5] dark:border-[#382E28] rounded-2xl hover:border-[#5C4033] dark:hover:border-[#E6C594] transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E7DDCD] dark:bg-[#342A24] border border-[#E2D6C5] dark:border-[#382E28] flex items-center justify-center text-[#5C4033] dark:text-[#E6C594] group-hover:bg-[#5C4033] dark:group-hover:bg-[#E6C594] group-hover:text-white dark:group-hover:text-[#2B231D] transition-colors">
                    <FaGithub className="text-lg" />
                  </div>
                  <div>
                    <span className="text-xs text-[#8C7A6B] dark:text-[#9E8E81] uppercase font-bold block tracking-wider font-sans">{content.contact.github}</span>
                    <span className="text-sm font-semibold text-[#2B231D] dark:text-[#F4ECE3] font-sans">{profile.social.github.replace("https://", "")}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E2D6C5]/70 dark:border-[#382E28]/70">
              <p className="text-xs text-[#8C7A6B] dark:text-[#9E8E81] font-sans italic">
                {content.contact.location(content.profile.location)}
              </p>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            className="lg:col-span-3 bg-[#EFE6D8] dark:bg-[#251E1A] border border-[#E2D6C5] dark:border-[#382E28] rounded-3xl p-8 shadow-sm transition-colors duration-300"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot Spam Safeguard (Invisible to real users, traps automated bots) */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                checked={!!formData.botcheck}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#2B231D] dark:text-[#F4ECE3] mb-2 font-sans">
                  {content.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-2xl border border-[#E2D6C5] dark:border-[#382E28] bg-[#F7F0E6] dark:bg-[#1A1412] px-4 py-3 text-sm font-sans text-[#2B231D] dark:text-[#F4ECE3] focus:outline-none focus:ring-2 focus:ring-[#5C4033] dark:focus:ring-[#E6C594] focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={content.contact.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#2B231D] dark:text-[#F4ECE3] mb-2 font-sans">
                  {content.contact.emailAddress}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-2xl border border-[#E2D6C5] dark:border-[#382E28] bg-[#F7F0E6] dark:bg-[#1A1412] px-4 py-3 text-sm font-sans text-[#2B231D] dark:text-[#F4ECE3] focus:outline-none focus:ring-2 focus:ring-[#5C4033] dark:focus:ring-[#E6C594] focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={content.contact.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#2B231D] dark:text-[#F4ECE3] mb-2 font-sans">
                  {content.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full rounded-2xl border border-[#E2D6C5] dark:border-[#382E28] bg-[#F7F0E6] dark:bg-[#1A1412] px-4 py-3 text-sm font-sans text-[#2B231D] dark:text-[#F4ECE3] focus:outline-none focus:ring-2 focus:ring-[#5C4033] dark:focus:ring-[#E6C594] focus:border-transparent transition-all min-h-[140px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder={content.contact.messagePlaceholder}
                  rows="5"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#5C4033] text-white hover:bg-[#4A3328] dark:bg-[#E6C594] dark:text-[#2B231D] dark:hover:bg-[#F5D6A0] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest font-sans inline-flex items-center justify-center gap-2 shadow-md transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{content.contact.sending}</span>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    <span>{content.contact.send}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

