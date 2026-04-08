import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Globe, Smartphone, Rocket, Zap, DollarSign, CheckCircle, 
  ArrowRight, Menu, X, ChevronRight, Layout, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-1" data-testid="mjv-logo">
    <span className="mjv-logo text-2xl">MJV</span>
    <span className="mjv-logo text-2xl font-light">Labs</span>
    <span className="mjv-logo-dot"></span>
  </div>
);

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "nav-glassmorphic" : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--mjv-text-secondary)] hover:text-[var(--mjv-primary)] transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="bg-[var(--mjv-accent)] hover:bg-[var(--mjv-accent-hover)] text-white btn-shine"
              data-testid="nav-cta-button"
            >
              <a href="#contact">Start a Project</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[var(--mjv-border)]"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[var(--mjv-text-secondary)] hover:text-[var(--mjv-primary)] py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="w-full bg-[var(--mjv-accent)] hover:bg-[var(--mjv-accent-hover)] text-white"
              >
                <a href="#contact">Start a Project</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section - Split Screen
const Hero = () => {
  return (
    <section className="min-h-screen pt-24 flex items-center" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="md:col-span-5 space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-2 bg-[var(--mjv-surface)] text-[var(--mjv-accent)] text-sm font-medium rounded-full border border-[var(--mjv-border)]">
                Product Studio
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--mjv-text-primary)] leading-[1.1] tracking-tight"
            >
              Turn Your Idea Into a Real App or Website
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-[var(--mjv-text-secondary)] leading-relaxed max-w-lg"
            >
              We build real, working products for business owners — fast and without the complexity.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[var(--mjv-accent)] hover:bg-[var(--mjv-accent-hover)] text-white px-8 btn-shine"
                data-testid="hero-cta-primary"
              >
                <a href="#contact">
                  Start a Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[var(--mjv-border)] text-[var(--mjv-primary)] hover:bg-[var(--mjv-surface)] px-8"
                data-testid="hero-cta-secondary"
              >
                <a href="#services">View Services</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual - Dynamic UI Mock */}
          <motion.div 
            className="md:col-span-7 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main Dashboard Image */}
              <div className="hero-float rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwbW9kZXJuJTIwc29mdHdhcmUlMjBkYXNoYm9hcmQlMjBVSSUyMGludGVyZmFjZXxlbnwwfHx8fDE3NzU2Njc4MDh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Dashboard UI"
                  className="w-full object-cover"
                />
              </div>
              
              {/* Floating Mobile Card */}
              <motion.div 
                className="absolute -bottom-6 -left-6 lg:-left-12 w-32 lg:w-44 hero-float-delayed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="bg-white rounded-xl p-3 shadow-xl border border-[var(--mjv-border)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--mjv-accent)]"></div>
                    <span className="text-xs font-medium text-[var(--mjv-text-secondary)]">Live</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-[var(--mjv-surface)] rounded w-full"></div>
                    <div className="h-2 bg-[var(--mjv-surface)] rounded w-3/4"></div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div 
                className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl p-4 shadow-xl border border-[var(--mjv-border)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{ animation: "float-delayed 5.5s ease-in-out infinite" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--mjv-accent)]/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[var(--mjv-accent)]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--mjv-text-secondary)]">Deployed</p>
                    <p className="text-lg font-bold text-[var(--mjv-primary)]">50+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// What We Do - Horizontal Scroll
const WhatWeDo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    { 
      icon: Globe, 
      title: "Websites", 
      description: "Custom websites that convert visitors into customers. Built for speed and impact.",
      color: "var(--mjv-primary)"
    },
    { 
      icon: Smartphone, 
      title: "Apps", 
      description: "Mobile and web applications that solve real problems for your users.",
      color: "var(--mjv-accent)"
    },
    { 
      icon: Rocket, 
      title: "Product Builds", 
      description: "Full product development from concept to launch. MVP to scale.",
      color: "var(--mjv-secondary)"
    }
  ];

  return (
    <section className="py-24 bg-[var(--mjv-surface)]" data-testid="what-we-do-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--mjv-text-primary)] mb-4">
              What We Do
            </h2>
            <p className="text-[var(--mjv-text-secondary)] max-w-xl">
              We specialize in building digital products that make a difference.
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-6 scroll-container snap-x">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="min-w-[300px] md:min-w-[360px] flex-shrink-0 snap-start"
              >
                <div 
                  className="bg-white rounded-2xl p-8 h-full border border-[var(--mjv-border)] transition-all duration-300 hover:ring-2 hover:ring-[var(--mjv-primary)]/20 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                  data-testid={`service-card-${service.title.toLowerCase()}`}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${service.color}10` }}
                  >
                    <service.icon className="w-7 h-7" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--mjv-text-primary)] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[var(--mjv-text-secondary)] leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center text-[var(--mjv-accent)] font-medium text-sm">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
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

// Single Feature Item Component
const FeatureItem = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}
    >
      {/* Text Content */}
      <div className="lg:w-1/2 space-y-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--mjv-accent)]/10">
          <Icon className="w-6 h-6 text-[var(--mjv-accent)]" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--mjv-text-primary)]">
          {feature.title}
        </h3>
        <p className="text-lg text-[var(--mjv-text-secondary)] leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Image */}
      <div className="lg:w-1/2">
        <div className="rounded-2xl overflow-hidden border border-[var(--mjv-border)] shadow-lg">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-64 lg:h-80 object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Feature Strip - Zig-Zag Layout
const FeatureStrip = () => {
  const features = [
    {
      title: "Fast Builds",
      description: "We ship quality products in weeks, not months. Rapid iteration with proven processes.",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1634153570366-deda92ecf625?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHByZW1pdW0lMjB0ZWNoJTIwY29ycG9yYXRlfGVufDB8fHx8MTc3NTY2NzgwOHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Clear Pricing",
      description: "No hidden fees. No scope creep surprises. You know exactly what you're paying for.",
      icon: DollarSign,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "Real Deployments",
      description: "Your product goes live on real infrastructure. Scalable, secure, and production-ready.",
      icon: CheckCircle,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section className="py-24" data-testid="feature-strip-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Services - Interactive Panels
const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      title: "Website Build",
      price: "Starting at $750",
      description: "Professional website that establishes your online presence and converts visitors.",
      features: ["Custom design", "Mobile responsive", "SEO optimized", "Fast loading"]
    },
    {
      title: "Starter App",
      price: "Starting at $2,500",
      description: "Launch your app idea with core functionality. Perfect for MVPs and validation.",
      features: ["Core features", "User authentication", "Database setup", "Cloud deployment"],
      featured: true
    },
    {
      title: "Full Build & Scale",
      price: "Custom",
      description: "Complete product development with ongoing support and scaling capabilities.",
      features: ["Full development", "Advanced features", "Scaling support", "Dedicated team"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-[var(--mjv-surface)]" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--mjv-text-primary)] mb-4">
              Services
            </h2>
            <p className="text-[var(--mjv-text-secondary)] max-w-2xl mx-auto">
              Choose the package that fits your needs. All include direct communication and quality assurance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`interactive-panel rounded-2xl p-8 border ${
                  service.featured 
                    ? 'bg-[var(--mjv-primary)] text-white border-transparent' 
                    : 'bg-white border-[var(--mjv-border)]'
                } ${hoveredIndex === index ? 'shadow-2xl' : 'shadow-sm'}`}
                data-testid={`service-panel-${index}`}
              >
                <div className="h-full flex flex-col">
                  <h3 className={`text-xl font-bold mb-2 ${service.featured ? 'text-white' : 'text-[var(--mjv-text-primary)]'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-2xl font-bold mb-4 ${service.featured ? 'text-[var(--mjv-accent)]' : 'text-[var(--mjv-accent)]'}`}>
                    {service.price}
                  </p>
                  <p className={`mb-6 ${service.featured ? 'text-white/80' : 'text-[var(--mjv-text-secondary)]'}`}>
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className={`w-5 h-5 ${service.featured ? 'text-[var(--mjv-accent)]' : 'text-[var(--mjv-accent)]'}`} />
                        <span className={service.featured ? 'text-white/90' : 'text-[var(--mjv-text-secondary)]'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      service.featured 
                        ? 'bg-white text-[var(--mjv-primary)] hover:bg-white/90' 
                        : 'bg-[var(--mjv-accent)] text-white hover:bg-[var(--mjv-accent-hover)]'
                    }`}
                  >
                    <a href="#contact">Get Started</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Process Timeline
const ProcessTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { title: "Idea", description: "Share your vision. We'll discuss scope, features, and timeline." },
    { title: "Build", description: "Our team develops your product with regular updates and feedback loops." },
    { title: "Launch", description: "Deploy to production. Your product goes live and reaches users." }
  ];

  return (
    <section id="process" className="py-24" data-testid="process-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--mjv-text-primary)] mb-4">
              Our Process
            </h2>
            <p className="text-[var(--mjv-text-secondary)] max-w-2xl mx-auto">
              A straightforward path from concept to launch.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--mjv-border)] -translate-y-1/2"></div>
            
            {/* Timeline Line - Mobile */}
            <div className="md:hidden absolute top-0 bottom-0 left-8 w-0.5 bg-[var(--mjv-border)]"></div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeInUp}
                  className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-0"
                >
                  {/* Step Number */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-[var(--mjv-accent)] flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {index + 1}
                  </div>
                  
                  <div className="md:mt-8 md:text-center">
                    <h3 className="text-xl font-bold text-[var(--mjv-text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[var(--mjv-text-secondary)] max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// What We Build - Bento Grid
const WhatWeBuild = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-24 bg-[var(--mjv-surface)]" data-testid="what-we-build-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--mjv-text-primary)] mb-4">
              What We Build
            </h2>
            <p className="text-[var(--mjv-text-secondary)] max-w-xl">
              From mobile apps to enterprise dashboards, we bring ideas to life.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            <motion.div 
              variants={fadeInUp}
              className="bento-item col-span-2 row-span-2 rounded-2xl overflow-hidden border border-[var(--mjv-border)] shadow-sm"
            >
              <img
                src="https://images.unsplash.com/photo-1695048132790-baebe5b7e975?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxzbGVlayUyMG1vYmlsZSUyMGFwcCUyMGludGVyZmFjZXxlbnwwfHx8fDE3NzU2Njc4MDh8MA&ixlib=rb-4.1.0&q=85"
                alt="Mobile App"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bento-item col-span-2 rounded-2xl overflow-hidden border border-[var(--mjv-border)] shadow-sm"
            >
              <div className="w-full h-full bg-[var(--mjv-primary)] p-6 flex flex-col justify-between">
                <Layout className="w-8 h-8 text-white/80" />
                <div>
                  <h4 className="text-white font-bold text-lg">Dashboards</h4>
                  <p className="text-white/70 text-sm">Data visualization that drives decisions</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bento-item rounded-2xl overflow-hidden border border-[var(--mjv-border)] shadow-sm"
            >
              <div className="w-full h-full bg-[var(--mjv-accent)] p-6 flex flex-col justify-between">
                <Smartphone className="w-8 h-8 text-white/80" />
                <div>
                  <h4 className="text-white font-bold">Mobile Apps</h4>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bento-item rounded-2xl overflow-hidden border border-[var(--mjv-border)] shadow-sm"
            >
              <div className="w-full h-full bg-white p-6 flex flex-col justify-between">
                <Globe className="w-8 h-8 text-[var(--mjv-primary)]" />
                <div>
                  <h4 className="text-[var(--mjv-text-primary)] font-bold">Websites</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Built for Operators
const BuiltForOperators = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24" data-testid="built-for-operators-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Image */}
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-[var(--mjv-border)] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1769071167822-3a7095cc9bbd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwzfHxmb2N1c2VkJTIwYnVzaW5lc3MlMjBmb3VuZGVyJTIwb3BlcmF0b3IlMjBtb2Rlcm4lMjBvZmZpY2V8ZW58MHx8fHwxNzc1NjY3NzkxfDA&ixlib=rb-4.1.0&q=85"
                alt="Business Operator"
                className="w-full h-80 lg:h-[500px] object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInUp} className="order-1 lg:order-2 space-y-6">
            <span className="inline-block px-4 py-2 bg-[var(--mjv-primary)]/10 text-[var(--mjv-primary)] text-sm font-medium rounded-full">
              For Business Owners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--mjv-text-primary)] leading-tight">
              Built for Operators Who Get Things Done
            </h2>
            <p className="text-lg text-[var(--mjv-text-secondary)] leading-relaxed">
              You don't have time for endless meetings or technical jargon. You need a partner who understands business, moves fast, and delivers results.
            </p>
            <ul className="space-y-4">
              {[
                "No technical background required",
                "Clear communication, no jargon",
                "Fixed timelines and transparent pricing",
                "Direct access to your development team"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--mjv-accent)] shrink-0" />
                  <span className="text-[var(--mjv-text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="bg-[var(--mjv-accent)] hover:bg-[var(--mjv-accent-hover)] text-white btn-shine mt-4"
            >
              <a href="#contact">
                Let's Talk <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Form / Final CTA
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
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 cta-gradient" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={fadeInUp} className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Have an idea?<br />Let's build it.
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              Tell us about your project and we'll get back to you within 24 hours with a plan.
            </p>
            <div className="space-y-4">
              {[
                "Free consultation",
                "Clear project estimate",
                "No obligations"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--mjv-accent)]" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div variants={fadeInUp}>
            <form 
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-2xl"
              data-testid="contact-form"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--mjv-text-primary)] mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="border-[var(--mjv-border)] focus:ring-[var(--mjv-accent)] focus:border-[var(--mjv-accent)]"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--mjv-text-primary)] mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      required
                      className="border-[var(--mjv-border)] focus:ring-[var(--mjv-accent)] focus:border-[var(--mjv-accent)]"
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--mjv-text-primary)] mb-2">
                    Company
                  </label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                    className="border-[var(--mjv-border)] focus:ring-[var(--mjv-accent)] focus:border-[var(--mjv-accent)]"
                    data-testid="contact-company-input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--mjv-text-primary)] mb-2">
                    Tell us about your project *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your idea, goals, and timeline..."
                    rows={4}
                    required
                    className="border-[var(--mjv-border)] focus:ring-[var(--mjv-accent)] focus:border-[var(--mjv-accent)] resize-none"
                    data-testid="contact-message-input"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--mjv-accent)] hover:bg-[var(--mjv-accent-hover)] text-white py-6 btn-shine"
                  data-testid="contact-submit-button"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
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
  <footer className="py-12 bg-[var(--mjv-surface)] border-t border-[var(--mjv-border)]" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo />
        <p className="text-[var(--mjv-text-secondary)] text-sm">
          © {new Date().getFullYear()} MJV Labs. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-[var(--mjv-text-secondary)] hover:text-[var(--mjv-primary)] text-sm">
            Privacy
          </a>
          <a href="#" className="text-[var(--mjv-text-secondary)] hover:text-[var(--mjv-primary)] text-sm">
            Terms
          </a>
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
      <WhatWeDo />
      <FeatureStrip />
      <Services />
      <ProcessTimeline />
      <WhatWeBuild />
      <BuiltForOperators />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
