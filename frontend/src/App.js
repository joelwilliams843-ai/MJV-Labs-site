import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, Menu, X, ChevronRight, Send, Check,
  Monitor, Smartphone, Layers, Zap, Shield, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

// Logo Component
const Logo = ({ light = false }) => (
  <div className="flex items-center" data-testid="mjv-logo">
    <span className={`font-black text-2xl tracking-[-0.04em] ${light ? 'text-white' : 'text-[#1E3A5F]'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
      MJV
    </span>
    <span className={`font-light text-2xl tracking-[-0.02em] ml-1 ${light ? 'text-white/90' : 'text-[#1E3A5F]'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
      Labs
    </span>
    <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488] ml-1 -mt-3"></div>
  </div>
);

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm" : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-[#1E3A5F] transition-colors text-[15px] font-medium tracking-tight"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              asChild
              className="bg-[#1E3A5F] hover:bg-[#152a45] text-white px-6 h-11 text-[15px] font-medium rounded-full"
              data-testid="nav-cta"
            >
              <a href="#contact">Start a Project</a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-slate-100 shadow-lg"
        >
          <div className="px-8 py-6 space-y-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-slate-700 hover:text-[#1E3A5F] py-2 text-lg font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="w-full bg-[#1E3A5F] text-white mt-4 rounded-full">
              <a href="#contact">Start a Project</a>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// Hero Section - Premium Split Layout
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="min-h-screen relative overflow-hidden" data-testid="hero-section">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      {/* Geometric accents */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#1E3A5F]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0D9488]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12 pt-32 lg:pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left - Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-xl"
          >
            <motion.div variants={slideUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-full text-[#1E3A5F] text-sm font-medium">
                <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse"></span>
                Product Studio
              </span>
            </motion.div>

            <motion.h1 
              variants={slideUp}
              className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#0F172A] leading-[1.05] tracking-[-0.03em] mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Turn Your Idea Into Reality
            </motion.h1>

            <motion.p 
              variants={slideUp}
              className="text-xl text-slate-600 leading-relaxed mb-10 max-w-md"
            >
              We build real, working products for business owners — fast, precise, and without complexity.
            </motion.p>

            <motion.div variants={slideUp} className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-8 h-14 text-base font-medium rounded-full shadow-lg shadow-[#0D9488]/20 transition-all hover:shadow-xl hover:shadow-[#0D9488]/30"
                data-testid="hero-cta-primary"
              >
                <a href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-[#1E3A5F] hover:bg-[#1E3A5F]/5 px-8 h-14 text-base font-medium rounded-full"
                data-testid="hero-cta-secondary"
              >
                <a href="#work">View Our Work</a>
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={slideUp} className="mt-16 flex gap-12">
              {[
                { value: "50+", label: "Products Shipped" },
                { value: "2-4", label: "Week Delivery" },
                { value: "100%", label: "Client Satisfaction" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-[#1E3A5F]">{stat.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Visual Product Showcase */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="relative lg:pl-12"
          >
            <div className="relative">
              {/* Main Dashboard Preview */}
              <motion.div 
                style={{ y: y1 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/50"
              >
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
                  alt="Dashboard Preview"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/20 to-transparent"></div>
              </motion.div>

              {/* Floating Mobile App */}
              <motion.div 
                style={{ y: y2 }}
                className="absolute -bottom-8 -left-8 lg:-left-16 w-36 lg:w-48 z-20"
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="bg-white rounded-3xl p-2 shadow-2xl shadow-slate-900/15 border border-slate-100">
                  <div className="bg-[#1E3A5F] rounded-2xl p-4 aspect-[9/16]">
                    <div className="space-y-3">
                      <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      <div className="h-2 bg-white/10 rounded w-full"></div>
                      <div className="h-2 bg-white/10 rounded w-4/5"></div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="h-12 bg-white/10 rounded-lg"></div>
                        <div className="h-12 bg-[#0D9488]/50 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div 
                className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl p-4 shadow-xl border border-slate-100 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0D9488]/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#0D9488]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Revenue</p>
                    <p className="text-lg font-bold text-[#1E3A5F]">+248%</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Code Card */}
              <motion.div 
                className="absolute top-1/2 -right-4 lg:-right-12 bg-[#0F172A] rounded-lg p-3 shadow-xl z-20 hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="font-mono text-xs text-green-400">
                  <div>$ npm run deploy</div>
                  <div className="text-slate-400">→ Building...</div>
                  <div className="text-[#0D9488]">✓ Deployed!</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Interactive Service Strip - Large Expandable Panels
const ServiceStrip = () => {
  const [activePanel, setActivePanel] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      id: "websites",
      title: "Websites",
      subtitle: "Starting at $750",
      description: "Custom-built websites that convert visitors into customers. Fast, responsive, SEO-optimized.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=80",
      features: ["Custom Design", "Mobile-First", "SEO Ready", "Fast Loading"],
      color: "#1E3A5F"
    },
    {
      id: "apps",
      title: "Apps",
      subtitle: "Starting at $2,500",
      description: "Mobile and web applications that solve real problems. From MVP to full-scale product.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
      features: ["iOS & Android", "Web Apps", "Real-time", "Scalable"],
      color: "#0D9488"
    },
    {
      id: "products",
      title: "Full Product Builds",
      subtitle: "Custom Quote",
      description: "Complete product development from concept to scale. Strategy, design, development, launch.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80",
      features: ["Full Stack", "Team Support", "Scaling", "Maintenance"],
      color: "#1E3A5F"
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#FAFBFC]" data-testid="services-section">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={slideUp} className="mb-16">
            <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">What We Offer</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mt-3 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Services Built for Growth
            </h2>
          </motion.div>

          {/* Interactive Panels */}
          <div className="grid lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={slideUp}
                onMouseEnter={() => setActivePanel(service.id)}
                onMouseLeave={() => setActivePanel(null)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  activePanel === service.id ? 'lg:scale-[1.02] shadow-2xl' : 'shadow-lg'
                }`}
                style={{ 
                  minHeight: '500px',
                  background: activePanel === service.id ? service.color : '#fff'
                }}
                data-testid={`service-panel-${service.id}`}
              >
                {/* Background Image */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  activePanel === service.id ? 'opacity-30' : 'opacity-0'
                }`}>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                    activePanel === service.id ? 'bg-white/20' : 'bg-slate-100'
                  }`}>
                    {service.id === 'websites' && <Monitor className={`w-6 h-6 ${activePanel === service.id ? 'text-white' : 'text-[#1E3A5F]'}`} />}
                    {service.id === 'apps' && <Smartphone className={`w-6 h-6 ${activePanel === service.id ? 'text-white' : 'text-[#1E3A5F]'}`} />}
                    {service.id === 'products' && <Layers className={`w-6 h-6 ${activePanel === service.id ? 'text-white' : 'text-[#1E3A5F]'}`} />}
                  </div>

                  {/* Content */}
                  <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
                    activePanel === service.id ? 'text-white' : 'text-[#0F172A]'
                  }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {service.title}
                  </h3>
                  
                  <p className={`text-lg font-semibold mb-4 transition-colors duration-500 ${
                    activePanel === service.id ? 'text-[#0D9488]' : 'text-[#0D9488]'
                  }`}>
                    {service.subtitle}
                  </p>

                  <p className={`mb-6 transition-colors duration-500 leading-relaxed ${
                    activePanel === service.id ? 'text-white/80' : 'text-slate-600'
                  }`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mt-auto">
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div 
                          key={feature}
                          className={`flex items-center gap-2 text-sm transition-colors duration-500 ${
                            activePanel === service.id ? 'text-white/90' : 'text-slate-600'
                          }`}
                        >
                          <Check className="w-4 h-4 text-[#0D9488]" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className={`mt-8 flex items-center gap-2 font-medium transition-colors duration-500 ${
                      activePanel === service.id ? 'text-white' : 'text-[#1E3A5F]'
                    }`}>
                      Get Started <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// What We Build - Visual Proof Section
const WhatWeBuild = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-32 bg-white" data-testid="what-we-build-section">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Header - Asymmetric */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <motion.div variants={slideUp}>
              <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">Our Work</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mt-3 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                What We Build
              </h2>
            </motion.div>
            <motion.div variants={slideUp} className="lg:pt-8">
              <p className="text-lg text-slate-600 leading-relaxed">
                From mobile apps to enterprise dashboards, we bring ideas to life with precision and purpose.
              </p>
            </motion.div>
          </div>

          {/* Bento Grid - Asymmetric Layout */}
          <div className="grid grid-cols-12 gap-6 auto-rows-[180px] lg:auto-rows-[220px]">
            {/* Large Mobile App Preview */}
            <motion.div 
              variants={slideUp}
              className="col-span-12 lg:col-span-5 row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] to-[#0F172A]"></div>
              <div className="relative z-10 h-full p-8 flex flex-col">
                <span className="text-white/60 text-sm font-medium">Mobile Apps</span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Native iOS & Android
                </h3>
                <div className="mt-auto flex justify-center">
                  <div className="bg-white/10 rounded-3xl p-3 backdrop-blur-sm border border-white/10 transform group-hover:scale-105 transition-transform duration-500">
                    <div className="bg-[#0F172A] rounded-2xl w-40 h-64 p-4">
                      <div className="h-4 bg-white/20 rounded w-1/2 mb-4"></div>
                      <div className="space-y-2 mb-4">
                        <div className="h-2 bg-white/10 rounded"></div>
                        <div className="h-2 bg-white/10 rounded w-4/5"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-6">
                        <div className="h-16 bg-white/5 rounded-lg"></div>
                        <div className="h-16 bg-[#0D9488]/30 rounded-lg"></div>
                        <div className="h-16 bg-[#0D9488]/30 rounded-lg"></div>
                        <div className="h-16 bg-white/5 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div 
              variants={slideUp}
              className="col-span-12 lg:col-span-7 row-span-2 rounded-3xl overflow-hidden relative group"
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80"
                alt="Dashboard"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent"></div>
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <span className="text-white/60 text-sm font-medium">Dashboards</span>
                <h3 className="text-2xl font-bold text-white mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Data That Drives Decisions
                </h3>
                <p className="text-white/70 mt-2 max-w-md">
                  Real-time analytics and business intelligence platforms built for clarity.
                </p>
              </div>
            </motion.div>

            {/* Website Preview */}
            <motion.div 
              variants={slideUp}
              className="col-span-12 lg:col-span-8 row-span-1 rounded-3xl overflow-hidden relative group bg-slate-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAFBFC] to-slate-50"></div>
              <div className="relative z-10 h-full p-8 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-sm font-medium">Websites</span>
                  <h3 className="text-xl font-bold text-[#0F172A] mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    High-Converting Landing Pages
                  </h3>
                </div>
                <div className="hidden lg:flex gap-2">
                  <div className="w-48 h-28 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
                    <div className="h-6 bg-slate-100 flex items-center px-2 gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div 
              variants={slideUp}
              className="col-span-12 lg:col-span-4 row-span-1 rounded-3xl overflow-hidden relative bg-[#0D9488]"
            >
              <div className="h-full p-8 flex flex-col justify-center">
                <span className="text-white/60 text-sm font-medium">Built With</span>
                <h3 className="text-xl font-bold text-white mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Modern Tech Stack
                </h3>
                <div className="flex gap-2 mt-4">
                  {['React', 'Node', 'Python', 'AWS'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Process Section - Horizontal Timeline
const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { 
      step: "01", 
      title: "Discovery", 
      description: "We dive deep into your vision, goals, and requirements to create a clear roadmap.",
      icon: <Zap className="w-6 h-6" />
    },
    { 
      step: "02", 
      title: "Design & Build", 
      description: "Our team crafts and develops your product with regular updates and feedback loops.",
      icon: <Layers className="w-6 h-6" />
    },
    { 
      step: "03", 
      title: "Launch", 
      description: "We deploy to production, ensure everything runs smooth, and hand over the keys.",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <section id="process" className="py-32 bg-[#0F172A]" data-testid="process-section">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={slideUp} className="text-center mb-20">
            <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">How We Work</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Simple. Clear. Fast.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#0D9488]/50 via-[#0D9488] to-[#0D9488]/50"></div>

            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={slideUp}
                className="relative"
              >
                <div className="bg-[#1E293B] rounded-3xl p-8 h-full border border-slate-700/50 hover:border-[#0D9488]/50 transition-colors duration-300">
                  {/* Step number */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0D9488] flex items-center justify-center text-white font-bold text-lg mb-6">
                    {step.step}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline indicator */}
          <motion.div variants={slideUp} className="flex justify-center mt-16">
            <div className="flex items-center gap-3 px-6 py-3 bg-[#1E293B] rounded-full border border-slate-700">
              <Clock className="w-5 h-5 text-[#0D9488]" />
              <span className="text-white font-medium">Average delivery: 2-4 weeks</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Built for Operators - Split Section
const BuiltForOperators = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-white" data-testid="operators-section">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Image */}
          <motion.div variants={slideUp} className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Business professional"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 max-w-[260px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#0D9488]/10 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A]">Project Complete</p>
                  <p className="text-sm text-slate-500">Delivered on time</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div variants={slideUp}>
            <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">For Business Owners</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mt-3 mb-6 tracking-[-0.02em] leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Built for Operators Who Get Things Done
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              You don't have time for endless meetings or technical jargon. You need a partner who understands business, moves fast, and delivers results.
            </p>

            <div className="space-y-5">
              {[
                "No technical background required",
                "Clear communication, zero jargon",
                "Fixed timelines and transparent pricing",
                "Direct access to your development team"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#0D9488]" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="mt-10 bg-[#1E3A5F] hover:bg-[#152a45] text-white px-8 h-14 text-base font-medium rounded-full"
            >
              <a href="#contact">
                Let's Talk
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section - Premium CTA
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent! We'll be in touch within 24 hours.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-[#1E3A5F] relative overflow-hidden" data-testid="contact-section">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0D9488] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left - Content */}
          <motion.div variants={slideUp}>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Have an idea?<br />
              <span className="text-[#0D9488]">Let's build it.</span>
            </h2>
            <p className="text-xl text-white/70 mt-6 max-w-md leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours with a clear plan.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Free consultation",
                "Clear project estimate",
                "No obligations"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0D9488] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div variants={slideUp}>
            <form 
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl"
              data-testid="contact-form"
            >
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="h-12 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      required
                      className="h-12 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company"
                    className="h-12 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                    data-testid="contact-company-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Project Details *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your idea, goals, and timeline..."
                    rows={4}
                    required
                    className="border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl resize-none"
                    data-testid="contact-message-input"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white h-14 text-base font-medium rounded-xl shadow-lg shadow-[#0D9488]/20"
                  data-testid="contact-submit-button"
                >
                  {isSubmitting ? "Sending..." : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-12 bg-[#0F172A]" data-testid="footer">
    <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo light />
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} MJV Labs. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Privacy</a>
          <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <Navigation />
      <Hero />
      <ServiceStrip />
      <WhatWeBuild />
      <Process />
      <BuiltForOperators />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
