/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  User,
  ShieldCheck,
  BarChart3,
  ExternalLink,
  Award,
  ArrowRight,
  Search,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";
import { 
  PERSONAL_INFO, 
  INTERNSHIPS, 
  EDUCATION, 
  PROJECTS, 
  CERTIFICATIONS 
} from "./constants";
import profilePic from "./assets/images/me.png";
import project1 from "./assets/images/time_tracking_app_1779206219417.png";
import project2 from "./assets/images/ev_management_app_1779206241878.png";
import project3 from "./assets/images/issue_track_app_1779206264390.png";

const projectImages = [project1, project2, project3];

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavItem = ({ id, label }: { id: string, label: string }) => (
    <a 
      href={`#${id}`}
      onClick={() => setActiveNav(id)}
      className={`nav-link ${activeNav === id ? "text-[#ff4d00]" : "text-gray-400"}`}
    >
      {label}
    </a>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans scroll-smooth">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#080808]/80 backdrop-blur-md py-4 shadow-xl" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-black tracking-tighter hover:text-[#ff4d00] transition-colors">
            VARSHINI<span className="text-[#ff4d00]">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <NavItem id="home" label="Home" />
            <NavItem id="about" label="About" />
            <NavItem id="services" label="Services" />
            <NavItem id="portfolio" label="Portfolio" />
            <NavItem id="contact" label="Contact" />
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-[#ff4d00] transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#ff4d00] font-bold tracking-widest uppercase text-sm mb-4 block">HELLO!</span>
            <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
              I'm <span className="text-[#ff4d00]">Varshini M</span>
            </h1>
            <p className="text-2xl font-bold text-gray-400 mb-8 uppercase tracking-widest">
              {PERSONAL_INFO.title}
            </p>
            <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
              Detail-oriented MCA candidate with a focus on risk management and data analysis. I build secure, data-driven applications that solve real-world problems.
            </p>
            <div className="flex flex-wrap gap-6 mb-12">
              <button className="btn-primary uppercase tracking-widest text-xs">LET'S TALK</button>
              <div className="flex gap-4 items-center">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff4d00] hover:text-black transition-all">
                  <Github size={18} />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff4d00] hover:text-black transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              <div className="w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-8 border-[#1a1a1a] orange-glow relative z-10">
                <img 
                  src={profilePic} 
                  alt="Varshini M"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#ff4d00] rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#ff4d00] rounded-full blur-3xl opacity-20 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Floating Stats Strip */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 flex justify-between items-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
           <span className="font-black tracking-[0.4em] text-[10px] uppercase">JavaScript</span>
           <span className="font-black tracking-[0.4em] text-[10px] uppercase">React.js</span>
           <span className="font-black tracking-[0.4em] text-[10px] uppercase">SQL / Excel</span>
           <span className="font-black tracking-[0.4em] text-[10px] uppercase">Risk GRC</span>
           <span className="font-black tracking-[0.4em] text-[10px] uppercase">Node.js</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-16 relative inline-block">
            About <span className="text-[#ff4d00]">Me</span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-[#ff4d00] rounded-full" />
          </h2>
          
          <div className="grid md:grid-cols-[1fr_400px_1fr] gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-right space-y-12"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">Education</h3>
                <p className="text-gray-500 text-sm">{EDUCATION[0].degree} @ {EDUCATION[0].institution}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Experience</h3>
                <p className="text-gray-500 text-sm">2+ Internships in Web Dev & Full Stack</p>
              </div>
            </motion.div>

            <div className="flex justify-center">
              <div className="w-[300px] h-[300px] rounded-full border-4 border-[#ff4d00] bg-[#1a1a1a] p-2 orange-glow">
                <div className="w-full h-full rounded-full overflow-hidden grayscale contrast-125">
                  <img 
                    src={profilePic} 
                    alt="Varshini Biography"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-left space-y-12"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">Specialization</h3>
                <p className="text-gray-500 text-sm">IT Risk Management & Modern Data Analysis</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Projects</h3>
                <p className="text-gray-500 text-sm">3 Completed Production-Ready Apps</p>
              </div>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto mt-20">
            <h3 className="text-2xl font-bold text-[#ff4d00] mb-6 uppercase tracking-widest">{PERSONAL_INFO.title}</h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
              {PERSONAL_INFO.summary}
            </p>
            <button className="btn-secondary uppercase tracking-widest text-xs">HIRE ME</button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">My <span className="text-[#ff4d00]">Skills</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Technical Proficiency</p>
          </div>
          
          <div className="space-y-10">
            {[
              { name: "Risk Assessment", level: "85%" },
              { name: "Data Analysis (SQL / Excel)", level: "90%" },
              { name: "Power BI / Tableau", level: "80%" },
              { name: "Frontend (React / TS)", level: "85%" },
              { name: "Backend (Node.js / MongoDB)", level: "75%" },
              { name: "IT Controls & GRC", level: "70%" }
            ].map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold uppercase tracking-widest text-sm">{skill.name}</span>
                  <span className="text-[#ff4d00] font-mono font-bold">{skill.level}</span>
                </div>
                <div className="progress-bar-container">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="progress-bar-fill"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">My <span className="text-[#ff4d00]">Services</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">How I Can Add Value</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Risk Assessment", 
                desc: "Specialized in identifying vulnerabilities and documenting compliance for IT infrastructures."
              },
              { 
                icon: BarChart3, 
                title: "Data Visualization", 
                desc: "Creating insightful dashboards using Power BI and Tableau to drive business decisions." 
              },
              { 
                icon: Code2, 
                title: "Full-Stack Dev", 
                desc: "Building secure and scalable web applications with React, Node.js, and MongoDB."
              }
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-[#121212] p-10 rounded-[2rem] border border-white/5 hover:border-[#ff4d00]/30 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00] mb-8 group-hover:bg-[#ff4d00] group-hover:text-black transition-all">
                  <s.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {s.desc}
                </p>
                <button className="text-[#ff4d00] font-bold text-sm tracking-widest flex items-center gap-2 hover:gap-4 transition-all uppercase">
                  READ MORE <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="py-20 lg:py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4">Latest <span className="text-[#ff4d00]">Project</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">A Selection of My Best Work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-[#1a1a1a]"
              >
                <img 
                  src={projectImages[i]} 
                  alt={p.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#ff4d00] transition-colors">{p.title.split(' — ')[0]}</h3>
                  <div className="flex gap-2 mb-4">
                    {p.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] font-bold bg-[#ff4d00] text-black px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all delay-100">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-40 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4">Contact <span className="text-[#ff4d00]">Me</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Let's Connect</p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" />
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Phone Number" className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" />
              <input type="text" placeholder="Subject" className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" />
            </div>
            <textarea placeholder="Your Message" rows={6} className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all resize-none"></textarea>
            <div className="text-center">
              <button className="btn-primary w-full md:w-auto px-16 uppercase tracking-widest text-xs">SEND MESSAGE</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-10">
            <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff4d00] hover:text-black transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff4d00] hover:text-black transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-[#ff4d00] hover:text-black transition-all">
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            © Varshini M All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
