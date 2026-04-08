import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Menu, X, Check, Monitor, Smartphone, Layers, 
  Clock, ChevronRight, Sparkles, Lightbulb, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";

// Animation variants
const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
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
    { href: "#work", label: "Work" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm" : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-18">
          <Logo />
          
          <div className="hidden md:flex items-center gap-8">
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
              className="bg-[#1E3A5F] hover:bg-[#152a45] text-white px-6 h-10 text-sm font-medium rounded-full"
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

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-slate-100 shadow-lg"
        >
          <div className="px-6 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-slate-700 hover:text-[#1E3A5F] py-2 text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="w-full bg-[#1E3A5F] text-white mt-3 rounded-full">
              <a href="#contact">Start a Project</a>
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// Hero Section - Clean Studio Style
const Hero = () => {
  return (
    <section className="min-h-[85vh] relative overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      
      {/* Subtle background accents */}
      <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-[#0D9488]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-[200px] h-[200px] bg-[#1E3A5F]/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 lg:pt-36 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left - Content (larger emphasis) */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="lg:col-span-7 max-w-2xl"
          >
            <motion.div variants={slideUp} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-full text-[#1E3A5F] text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-[#0D9488] rounded-full"></span>
                Product Studio
              </span>
            </motion.div>

            <motion.h1 
              variants={slideUp}
              className="text-[3rem] lg:text-[4rem] font-bold text-[#0F172A] leading-[1.05] tracking-[-0.03em] mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Turn Your Idea Into Reality
            </motion.h1>

            <motion.p 
              variants={slideUp}
              className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg"
            >
              We build real, working products for business owners — fast, precise, and without complexity.
            </motion.p>

            <motion.div variants={slideUp} className="flex flex-wrap gap-3 mb-14">
              <Button
                asChild
                size="lg"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-8 h-13 text-base font-medium rounded-full shadow-lg shadow-[#0D9488]/20"
                data-testid="hero-cta-primary"
              >
                <a href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-[#1E3A5F] hover:bg-[#1E3A5F]/5 px-8 h-13 text-base font-medium rounded-full"
                data-testid="hero-cta-secondary"
              >
                <a href="#work">View Our Work</a>
              </Button>
            </motion.div>

            {/* Simple credibility messaging */}
            <motion.div variants={slideUp} className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-500">
              <span>Real products. Not concepts.</span>
              <span>Built for real users.</span>
              <span>Working versions delivered fast.</span>
            </motion.div>
          </motion.div>

          {/* Right - Subtle Multi-Product Visual */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative">
              {/* Stacked UI Panels - Abstract Product Representation */}
              <div className="relative h-[420px]">
                {/* Dashboard Panel - Back */}
                <motion.div 
                  className="absolute top-0 right-0 w-[280px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                  initial={{ opacity: 0, y: 20, rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 3 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-slate-100 rounded w-2/3"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 bg-[#1E3A5F]/5 rounded-lg"></div>
                        <div className="h-16 bg-[#0D9488]/10 rounded-lg"></div>
                        <div className="h-16 bg-slate-50 rounded-lg"></div>
                      </div>
                      <div className="h-20 bg-slate-50 rounded-lg"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile App Panel - Middle */}
                <motion.div 
                  className="absolute top-16 left-8 w-[140px] bg-[#0F172A] rounded-2xl shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 30, rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: -6 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-[#0D9488] rounded-lg"></div>
                      <div className="h-2 bg-white/20 rounded w-12"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded w-full"></div>
                      <div className="h-2 bg-white/10 rounded w-3/4"></div>
                      <div className="h-8 bg-[#0D9488]/30 rounded-lg mt-3"></div>
                      <div className="h-8 bg-white/5 rounded-lg"></div>
                      <div className="h-8 bg-white/5 rounded-lg"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Website Panel - Front */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-[240px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                  initial={{ opacity: 0, y: 40, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 2 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <div className="h-6 bg-slate-50 border-b border-slate-100 flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-3 bg-[#1E3A5F] rounded w-1/3 mb-3"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-2 bg-slate-100 rounded w-full"></div>
                      <div className="h-2 bg-slate-100 rounded w-4/5"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 bg-[#0D9488] rounded-full w-16"></div>
                      <div className="h-7 bg-slate-100 rounded-full w-12"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Small floating accent */}
                <motion.div 
                  className="absolute top-32 right-16 px-3 py-1.5 bg-[#0D9488] rounded-full text-white text-xs font-medium shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                >
                  Live
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// FairFare Case Study Section
const FairFareCaseStudy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="py-20 bg-[#0F172A] relative overflow-hidden" data-testid="fairfare-section">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0D9488]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={slideUp} className="mb-12">
            <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">Featured Build</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Real Build: FairFare
            </h2>
            <p className="text-white/60 mt-2 text-lg">
              A real mobile app built to help users compare rideshare prices before booking.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left - Screenshots */}
            <motion.div variants={slideUp} className="lg:col-span-6">
              <div className="relative flex justify-center gap-4">
                <div className="relative">
                  <div className="bg-[#1a1a1a] rounded-[2.5rem] p-[3px] shadow-2xl">
                    <div className="bg-black rounded-[2.3rem] p-[2px]">
                      <div className="w-[200px] h-[400px] lg:w-[220px] lg:h-[440px] rounded-[2.2rem] overflow-hidden">
                        <img 
                          src="https://customer-assets.emergentagent.com/job_real-products/artifacts/xc0r3lmj_1000056760.jpeg"
                          alt="FairFare - Price Comparison"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative -mt-8 hidden lg:block">
                  <div className="bg-[#1a1a1a] rounded-[2.5rem] p-[3px] shadow-2xl opacity-90">
                    <div className="bg-black rounded-[2.3rem] p-[2px]">
                      <div className="w-[180px] h-[360px] rounded-[2.2rem] overflow-hidden">
                        <img 
                          src="https://customer-assets.emergentagent.com/job_real-products/artifacts/t3j1waf5_1000056764.jpeg"
                          alt="FairFare - Booking"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0D9488] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Live on App Store
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={slideUp} className="lg:col-span-6">
              <div className="space-y-6">
                <div>
                  <div className="text-[#0D9488] text-sm font-medium mb-1">Consumer Mobile App</div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Compare rideshare prices in seconds
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Most users open one rideshare app at a time with no quick way to compare pricing. 
                    FairFare lets users check Uber, Lyft, and other options side-by-side 
                    and choose the best ride — saving an average of $5+ per ride.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
                  {[
                    { label: "Type", value: "Live Product" },
                    { label: "Avg Savings", value: "$5.75/ride" },
                    { label: "Status", value: "App Store" }
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
                      <div className="text-white font-semibold mt-1">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-white/50 text-sm mb-3">MJV Labs delivered:</div>
                  <div className="flex flex-wrap gap-2">
                    {["Product Strategy", "UX Direction", "Full App Build", "Launch Support"].map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 h-12 text-base font-medium rounded-full mt-2"
                >
                  <a href="#contact">
                    Build Something Like This
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Simplified Services Section
const ServicesSection = () => {
  const [expandedService, setExpandedService] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      id: "websites",
      title: "Website Build",
      price: "Simple builds starting around $750",
      description: "Custom-built websites that convert visitors into customers. Fast, responsive, and optimized for results.",
      features: ["Custom Design", "Mobile-First", "SEO Optimized", "Fast Loading"],
      icon: Monitor,
      gradient: "from-blue-600 to-[#1E3A5F]"
    },
    {
      id: "apps",
      title: "App Build",
      price: null,
      description: "Mobile and web applications that solve real problems. From MVP to full-scale product launch.",
      features: ["iOS & Android", "Web Apps", "User Auth", "Real-time Features"],
      icon: Smartphone,
      gradient: "from-[#0D9488] to-teal-700"
    },
    {
      id: "products",
      title: "Full Build & Scale",
      price: null,
      description: "Complete product development from concept to scale. Strategy, design, development, and launch.",
      features: ["Full Stack", "Team Support", "Scaling", "Ongoing Dev"],
      icon: Layers,
      gradient: "from-purple-600 to-indigo-700"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white" data-testid="services-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={slideUp} className="mb-12">
            <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">Services</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mt-2 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What We Build
            </h2>
          </motion.div>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.id;

              return (
                <motion.div
                  key={service.id}
                  variants={slideUp}
                  onClick={() => setExpandedService(isExpanded ? null : service.id)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    isExpanded ? 'bg-gradient-to-r ' + service.gradient : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  data-testid={`service-panel-${service.id}`}
                >
                  <div className={`p-6 lg:p-8 transition-all duration-500`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 lg:gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isExpanded ? 'bg-white/20' : 'bg-white shadow-sm'
                        }`}>
                          <Icon className={`w-6 h-6 ${isExpanded ? 'text-white' : 'text-[#1E3A5F]'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4">
                            <h3 className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                              isExpanded ? 'text-white' : 'text-[#0F172A]'
                            }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {service.title}
                            </h3>
                            {service.price && (
                              <span className={`text-sm ${isExpanded ? 'text-white/70' : 'text-slate-500'}`}>
                                {service.price}
                              </span>
                            )}
                          </div>
                          
                          <p className={`mt-2 max-w-2xl transition-colors duration-300 ${
                            isExpanded ? 'text-white/80' : 'text-slate-600'
                          }`}>
                            {service.description}
                          </p>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6"
                              >
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {service.features.map((feature) => (
                                    <span 
                                      key={feature}
                                      className="px-3 py-1.5 bg-white/10 rounded-full text-white/90 text-sm flex items-center gap-1.5"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                                <Button
                                  asChild
                                  className="bg-white text-[#0F172A] hover:bg-white/90 px-6 h-11 rounded-full font-medium"
                                >
                                  <a href="#contact">
                                    Get Started
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className={`hidden lg:flex items-center gap-2 transition-colors duration-300 ${
                        isExpanded ? 'text-white' : 'text-slate-400'
                      }`}>
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// "Tell Us What You're Thinking" Section
const ProjectPrompts = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const prompts = [
    { id: "idea", icon: Lightbulb, text: "I have an idea but don't know where to start" },
    { id: "website", icon: Monitor, text: "I need a website" },
    { id: "app", icon: Smartphone, text: "I want to build an app" },
    { id: "improve", icon: RefreshCw, text: "I want to improve something existing" }
  ];

  const handlePromptClick = (promptId) => {
    setSelectedPrompt(promptId);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <section className="py-20 bg-slate-50" data-testid="prompts-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center"
        >
          <motion.div variants={slideUp} className="mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Tell us what you're thinking
            </h2>
            <p className="text-slate-600 mt-3 max-w-lg mx-auto">
              Select what best describes your situation. We'll take it from there.
            </p>
          </motion.div>

          <motion.div variants={slideUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {prompts.map((prompt) => {
              const Icon = prompt.icon;
              const isSelected = selectedPrompt === prompt.id;
              
              return (
                <button
                  key={prompt.id}
                  onClick={() => handlePromptClick(prompt.id)}
                  className={`p-6 rounded-2xl text-left transition-all duration-300 border-2 ${
                    isSelected 
                      ? 'bg-[#0D9488] border-[#0D9488] text-white shadow-lg' 
                      : 'bg-white border-slate-200 hover:border-[#0D9488]/50 hover:shadow-md'
                  }`}
                  data-testid={`prompt-${prompt.id}`}
                >
                  <Icon className={`w-6 h-6 mb-3 ${isSelected ? 'text-white' : 'text-[#0D9488]'}`} />
                  <p className={`text-sm font-medium leading-snug ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                    {prompt.text}
                  </p>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Process Section - Simplified
const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { step: "01", title: "Discovery", description: "We dive deep into your vision and goals." },
    { step: "02", title: "Build", description: "Our team develops your product with regular updates." },
    { step: "03", title: "Launch", description: "We deploy and hand over the keys." }
  ];

  return (
    <section className="py-20 bg-[#1E3A5F]" data-testid="process-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={slideUp} className="text-center mb-12">
            <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">Process</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Simple. Clear. Fast.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <motion.div
                key={step.step}
                variants={slideUp}
                className="bg-[#152a45] rounded-2xl p-6 border border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0D9488] flex items-center justify-center text-white font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={slideUp} className="flex justify-center mt-10">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-[#152a45] rounded-full border border-white/10">
              <Clock className="w-4 h-4 text-[#0D9488]" />
              <span className="text-white text-sm font-medium">Working version in days, not months</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section with Netlify Forms
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Message sent! We'll be in touch within 24 hours.");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0F172A] relative overflow-hidden" data-testid="contact-section">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0D9488]/10 rounded-full blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={slideUp}>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Have an idea?<br />
              <span className="text-[#0D9488]">Let's build it.</span>
            </h2>
            <p className="text-lg text-white/60 mt-4 max-w-md leading-relaxed">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>

            <div className="mt-8 space-y-3">
              {["Free consultation", "Clear project estimate", "No obligations"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0D9488] flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div variants={slideUp}>
            {isSubmitted ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-[#0D9488]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#0D9488]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Message Sent!
                </h3>
                <p className="text-slate-600 mb-6">
                  We'll review your project and get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="rounded-full"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form 
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl"
                data-testid="contact-form"
              >
                {/* Netlify hidden fields */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        required
                        className="h-11 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        required
                        className="h-11 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                        data-testid="contact-email-input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                    <Input
                      type="text"
                      name="company"
                      placeholder="Your company"
                      className="h-11 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                      data-testid="contact-company-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">What are you looking to build? *</label>
                    <Input
                      type="text"
                      name="project-type"
                      placeholder="e.g., Mobile app, Website, Dashboard"
                      required
                      className="h-11 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                      data-testid="contact-project-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Tell us more</label>
                    <Textarea
                      name="message"
                      placeholder="Describe your idea, goals, timeline..."
                      rows={3}
                      className="border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl resize-none"
                      data-testid="contact-message-input"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white h-12 text-base font-medium rounded-xl shadow-lg shadow-[#0D9488]/20"
                    data-testid="contact-submit-button"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-10 bg-[#0F172A] border-t border-white/5" data-testid="footer">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo light />
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} MJV Labs. All rights reserved.
        </p>
        <div className="flex gap-6">
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
      <FairFareCaseStudy />
      <ServicesSection />
      <ProjectPrompts />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
