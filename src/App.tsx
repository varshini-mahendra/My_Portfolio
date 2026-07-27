/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useState, useEffect } from "react";
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
  Search
} from "lucide-react";
import { 
  PERSONAL_INFO, 
  INTERNSHIPS, 
  EDUCATION, 
  PROJECTS, 
  CERTIFICATIONS, 
  LANGUAGES 
} from "./constants";
import StarField from "./components/StarField";
import profilePic from "./assets/images/me.png";
import project1 from "./assets/images/time_tracking_app_1779206219417.png";
import project2 from "./assets/images/ev_management_app_1779206241878.png";
import project3 from "./assets/images/issue_track_app_1779206264390.png";

const projectImages = [project1, project2, project3];

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus("");

    try {
      const res = await fetch("http://localhost:3002/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send. Please try again.");
      }
    } catch {
      setStatus("Network error. Please try again later.");
    } finally {
      setSending(false);
    }
  };

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
    <div className="min-h-screen bg-[#080808] text-white font-sans scroll-smooth relative">
      {/* Full-page Starfield Background */}
      <StarField />

      {/* Gradient overlays for depth */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff4d00]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ff4d00]/3 rounded-full blur-[100px]" />
      </div>

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
              Detail-oriented MCA candidate with a focus on SOC analysis and data analysis. I build secure, data-driven applications that solve real-world problems.
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

          {/* Background Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ x: [0, 40, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-[20%] w-3 h-3 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[10%] w-5 h-5 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ rotate: [0, 360], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-[5%] w-8 h-8 border border-[#ff4d00]/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: [360, 0], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-[8%] w-12 h-12 border border-[#ff4d00]/20 rounded-full"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-[30%] w-3 h-3 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ y: [0, -40, 0], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-[15%] w-5 h-5 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-[10%] w-16 h-16 border border-[#ff4d00]/10 rounded-full"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">

  <div className="text-center mb-20">
    <h2 className="text-5xl font-black">
      About <span className="text-[#ff4d00]">Me</span>
    </h2>

    <div className="w-24 h-1 bg-[#ff4d00] mx-auto mt-5 rounded-full"></div>
  </div>

  <div className="grid lg:grid-cols-3 gap-10 items-center">

    {/* LEFT */}

    <div className="space-y-8">

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-[#111111] border border-[#ff4d00]/20 rounded-3xl p-8"
      >
        <GraduationCap className="text-[#ff4d00] mb-5" size={45} />

        <h3 className="text-3xl font-bold mb-3">
          Education
        </h3>

        <p className="text-gray-400 leading-8">
          {EDUCATION[0].degree}
          <br />
          {EDUCATION[0].institution}
        </p>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-[#111111] border border-[#ff4d00]/20 rounded-3xl p-8"
      >
        <Briefcase className="text-[#ff4d00] mb-5" size={45} />

        <h3 className="text-3xl font-bold mb-3">
          Experience
        </h3>

        <p className="text-gray-400 leading-8">
          {INTERNSHIPS.length}+ Internships
          <br />
          Full Stack Development
        </p>
      </motion.div>

    </div>

    {/* CENTER - VERTICAL PROFILE CARD */}

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
      className="flex flex-col items-center bg-[#111111] rounded-[35px] border border-[#ff4d00]/30 p-8 text-center shadow-[0_0_40px_rgba(255,77,0,.18)]"
    >

      {/* Profile Icon */}
      <div className="w-24 h-24 rounded-full bg-[#ff4d00]/10 mx-auto flex items-center justify-center mb-6">
        <User size={50} className="text-[#ff4d00]" />
      </div>

      {/* Name & Title */}
      <h2 className="text-3xl font-black">
        Varshini <span className="text-[#ff4d00]">M</span>
      </h2>

      <p className="text-[#ff4d00] text-sm font-bold uppercase tracking-widest mt-2">
        {PERSONAL_INFO.title}
      </p>

      <div className="w-16 h-1 bg-[#ff4d00] rounded-full mx-auto my-6"></div>

      {/* Summary */}
      <p className="text-gray-400 text-sm leading-7 max-w-xs">
        {PERSONAL_INFO.summary}
      </p>

      {/* Contact Button */}
      <a
        href="#contact"
        className="inline-flex items-center gap-3 mt-8 bg-[#ff4d00] text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition"
      >
        Let's Connect
        <ArrowRight size={18} />
      </a>

    </motion.div>

    {/* RIGHT */}

    <div className="space-y-8">

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-[#111111] border border-[#ff4d00]/20 rounded-3xl p-8"
      >
        <ShieldCheck
          className="text-[#ff4d00] mb-5"
          size={45}
        />

        <h3 className="text-3xl font-bold mb-3">
          Specialization
        </h3>

        <p className="text-gray-400 leading-8">
          Aspiring
          <br />
          SOC Analyst
        </p>

      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="bg-[#111111] border border-[#ff4d00]/20 rounded-3xl p-8"
      >
        <Code2
          className="text-[#ff4d00] mb-5"
          size={45}
        />

        <h3 className="text-3xl font-bold mb-3">
          Projects
        </h3>

        <p className="text-gray-400 leading-8">
          {PROJECTS.length} Completed
          <br />
          Production Apps
        </p>

      </motion.div>

    </div>

  </div>

</div>
</section>



      {/* Skills Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[8%] w-4 h-4 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ x: [0, -40, 0], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 right-[12%] w-6 h-6 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-[50%] w-20 h-20 border border-[#ff4d00]/10 rounded-full"
          />
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">My <span className="text-[#ff4d00]">Skills</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Technical Proficiency</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "SOC Analyst", level: "90%", icon: "🛡️" },
              { name: "CIA Triad", level: "85%", icon: "🔐" },
              { name: "Network Security", level: "80%", icon: "🌐" },
              { name: "SIEM & Log Analysis", level: "85%", icon: "📊" },
              { name: "Threat Detection", level: "80%", icon: "⚠️" },
              { name: "Windows/Linux", level: "85%", icon: "💻" },
              { name: "Wireshark", level: "75%", icon: "📡" },
              { name: "Nmap", level: "75%", icon: "🗺️" }
            ].map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#121212] p-8 rounded-[2rem] border border-white/5 hover:border-[#ff4d00]/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#ff4d00]/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#ff4d00] group-hover:scale-110 transition-all">
                  <span>{skill.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest">{skill.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-[#ff4d00]">{skill.level}</span>
                  <span className="text-gray-500 text-sm mb-1">proficiency</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, 35, 0], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-[15%] w-4 h-4 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ x: [0, -30, 0], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[20%] w-5 h-5 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-[40%] w-14 h-14 border border-[#ff4d00]/10 rounded-full"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">My <span className="text-[#ff4d00]">Services</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">How I Can Add Value</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Search, 
                title: "Threat Detection & Analysis", 
                desc: "Identifying suspicious activities, investigating security events, and analyzing logs to detect potential cyber threats."
              },
              { 
                icon: BarChart3, 
                title: "SIEM Management & Log Analysis", 
                desc: "Analyzing security logs and alerts from SIEM platforms like Splunk, Microsoft Sentinel, and Elastic Security to improve threat visibility." 
              },
              { 
                icon: ShieldCheck, 
                title: "Vulnerability Management", 
                desc: "Performing vulnerability assessments, prioritizing risks, and recommending security improvements to strengthen IT infrastructure."
              },
              { 
                icon: Award, 
                title: "Security Operations Support", 
                desc: "Assisting with incident investigation, threat hunting, and maintaining security best practices to protect organizational assets."
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

      {/* Internship Experience Section */}
      <section id="internships" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Internship <span className="text-[#ff4d00]">Experience</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">From real-world SDLC work to production-ready delivery</p>
          </div>

          <div className="space-y-8">
            {INTERNSHIPS.map((i, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="bg-[#121212] p-10 rounded-[2rem] border border-white/5 hover:border-[#ff4d00]/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{i.role}</h3>
                    <p className="text-[#ff4d00] font-bold text-lg">{i.company}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-gray-500 text-sm">
                      <span className="inline-flex items-center">{i.location}</span>
                      <span className="opacity-60">•</span>
                      <span className="inline-flex items-center">{i.period}</span>
                    </div>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {i.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-3 text-gray-400 leading-relaxed">
                      <span className="mt-1 w-2 h-2 rounded-full bg-[#ff4d00] flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
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

      {/* Core Competencies (Soft Skills) */}
      <section id="core-competencies" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Core <span className="text-[#ff4d00]">Competencies</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Soft Skills & Work Style</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Communication",
                desc: "Explaining complex concepts clearly to teammates and stakeholders."
              },
              {
                title: "Problem Solving",
                desc: "Breaking down issues, testing assumptions, and iterating to solutions."
              },
              {
                title: "Ownership",
                desc: "Taking responsibility for outcomes and following through to completion."
              },
              {
                title: "Teamwork",
                desc: "Collaborating effectively with cross-functional teams and sharing progress early."
              }
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-[#121212] p-10 rounded-[2rem] border border-white/5 hover:border-[#ff4d00]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00] group-hover:bg-[#ff4d00] group-hover:text-black transition-all">
                    <span className="text-lg font-black">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Languages Section */}
      <section id="certifications" className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">Certifications <span className="text-[#ff4d00]">&</span> Languages</h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Additional achievements & communication strengths</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#121212] p-10 rounded-[2rem] border border-white/5">
              <h3 className="text-3xl font-bold mb-6 text-[#ff4d00]">Certifications</h3>
              <div className="space-y-4">
                {CERTIFICATIONS.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="bg-[#080808] p-6 rounded-[1.5rem] border border-white/5"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div>
                        <h4 className="text-2xl font-bold">{c.title}</h4>
                        <p className="text-gray-500 mt-1">{c.provider}</p>
                      </div>
                      {c.period ? (
                        <span className="text-[#ff4d00] font-bold whitespace-nowrap">{c.period}</span>
                      ) : (
                        <span className="text-gray-400 font-bold whitespace-nowrap">—</span>
                      )}
                    </div>
                    <p className="text-gray-400 mt-4 leading-relaxed">{c.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-[#121212] p-10 rounded-[2rem] border border-white/5">
              <h3 className="text-3xl font-bold mb-6 text-[#ff4d00]">Languages</h3>
              <div className="space-y-4">
                {LANGUAGES.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="bg-[#080808] p-6 rounded-[1.5rem] border border-white/5 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-2xl font-bold">{l.name}</h4>
                      <p className="text-gray-500 mt-1">Communication proficiency</p>
                    </div>
                    <span className="text-[#ff4d00] font-bold">{l.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-40 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -25, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[25%] w-3 h-3 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ x: [0, 30, 0], opacity: [0.08, 0.2, 0.08] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 left-[10%] w-5 h-5 rounded-full bg-[#ff4d00] blur-sm"
          />
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 left-[30%] w-10 h-10 border border-[#ff4d00]/10 rounded-full"
          />
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4">Contact <span className="text-[#ff4d00]">Me</span></h2>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Let's Connect</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" 
              />
              <input 
                type="text" 
                placeholder="Subject" 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all" 
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows={6} 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
              className="w-full bg-transparent border border-gray-800 rounded-2xl px-6 py-4 focus:border-[#ff4d00] outline-none transition-all resize-none"
            ></textarea>
            <div className="text-center">
              <button 
                type="submit" 
                disabled={sending}
                className="btn-primary w-full md:w-auto px-16 uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {sending ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </div>
            {status && (
              <p className={`text-center font-bold ${status.includes("successfully") ? "text-green-500" : "text-[#ff4d00]"}`}>
                {status}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-10">
            {/* Social icons removed as requested */}
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            © Varshini M All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
