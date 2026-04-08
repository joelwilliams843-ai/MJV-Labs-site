import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Menu, X, Check, Monitor, Smartphone, Layers, 
  Clock, ChevronRight, Sparkles, Users, Rocket, CreditCard,
  Calendar, Settings, Link2, LayoutDashboard, UserCheck, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
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
    { href: "#calculator", label: "Estimate" },
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

// Hero Section
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={containerRef} className="min-h-[90vh] relative overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#1E3A5F]/5 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 lg:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-xl"
          >
            <motion.div variants={slideUp} className="mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-full text-[#1E3A5F] text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-[#0D9488] rounded-full animate-pulse"></span>
                Product Studio
              </span>
            </motion.div>

            <motion.h1 
              variants={slideUp}
              className="text-[2.75rem] lg:text-[3.75rem] font-bold text-[#0F172A] leading-[1.08] tracking-[-0.03em] mb-5"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Turn Your Idea Into Reality
            </motion.h1>

            <motion.p 
              variants={slideUp}
              className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md"
            >
              We build real, working products for business owners — fast, precise, and without complexity.
            </motion.p>

            <motion.div variants={slideUp} className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-7 h-12 text-base font-medium rounded-full shadow-lg shadow-[#0D9488]/20"
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
                className="text-[#1E3A5F] hover:bg-[#1E3A5F]/5 px-7 h-12 text-base font-medium rounded-full"
                data-testid="hero-cta-secondary"
              >
                <a href="#work">View Our Work</a>
              </Button>
            </motion.div>

            <motion.div variants={slideUp} className="mt-12 flex gap-10">
              {[
                { value: "50+", label: "Products Shipped" },
                { value: "Days", label: "Not Months" },
                { value: "100%", label: "Satisfaction" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-bold text-[#1E3A5F]">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual - Real Product in Device Frame */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={slideLeft}
            className="relative lg:pl-8"
          >
            <div className="relative flex justify-center">
              {/* iPhone Device Frame */}
              <motion.div 
                style={{ y: y1 }}
                className="relative z-10"
              >
                {/* iPhone 15 Pro Style Frame */}
                <div className="relative bg-[#1a1a1a] rounded-[3rem] p-[3px] shadow-2xl shadow-black/30">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30"></div>
                  
                  {/* Screen Container */}
                  <div className="bg-black rounded-[2.8rem] p-[2px]">
                    <div className="relative w-[280px] h-[560px] lg:w-[300px] lg:h-[620px] rounded-[2.7rem] overflow-hidden bg-[#0a0a0f]">
                      {/* Real App Interface - FairFare Style */}
                      <div className="h-full flex flex-col">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center px-6 pt-14 pb-2 text-white/80 text-xs">
                          <span>9:41</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-2 border border-white/60 rounded-sm">
                              <div className="w-3/4 h-full bg-white/60 rounded-sm"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* App Header */}
                        <div className="px-5 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#0D9488] to-[#0F766E] rounded-xl flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-bold text-lg">FairFare</h3>
                              <p className="text-white/50 text-xs">Compare & Save</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Location Inputs */}
                        <div className="px-5 space-y-2 mb-4">
                          <div className="bg-[#1a1a24] rounded-xl p-3">
                            <div className="text-white/40 text-[10px] mb-0.5">PICKUP</div>
                            <div className="text-white text-sm font-medium">123 Main Street</div>
                          </div>
                          <div className="bg-[#1a1a24] rounded-xl p-3">
                            <div className="text-white/40 text-[10px] mb-0.5">DESTINATION</div>
                            <div className="text-white text-sm font-medium">Airport Terminal B</div>
                          </div>
                        </div>
                        
                        {/* Ride Options */}
                        <div className="px-5 flex-1">
                          <div className="text-white/50 text-xs mb-2 font-medium">BEST OPTIONS</div>
                          <div className="space-y-2">
                            {/* Best Option */}
                            <div className="bg-[#0D9488]/20 border border-[#0D9488]/40 rounded-2xl p-3.5 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xs">UX</div>
                                <div>
                                  <div className="text-white font-semibold text-sm">Uber X</div>
                                  <div className="text-white/50 text-xs">4 min • 4.9★</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[#0D9488] font-bold text-lg">$18.50</div>
                                <div className="text-[#0D9488] text-[10px] font-medium">BEST PRICE</div>
                              </div>
                            </div>
                            
                            {/* Other Options */}
                            <div className="bg-[#1a1a24] rounded-2xl p-3.5 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#FF00BF]/20 rounded-xl flex items-center justify-center text-[#FF00BF] font-bold text-xs">L</div>
                                <div>
                                  <div className="text-white font-semibold text-sm">Lyft</div>
                                  <div className="text-white/50 text-xs">6 min • 4.8★</div>
                                </div>
                              </div>
                              <div className="text-white font-bold">$19.20</div>
                            </div>
                            
                            <div className="bg-[#1a1a24] rounded-2xl p-3.5 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 font-bold text-xs">V</div>
                                <div>
                                  <div className="text-white font-semibold text-sm">Via</div>
                                  <div className="text-white/50 text-xs">8 min • 4.7★</div>
                                </div>
                              </div>
                              <div className="text-white font-bold">$21.00</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="p-5 pt-3">
                          <button className="w-full bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white py-4 rounded-2xl font-semibold text-sm shadow-lg shadow-[#0D9488]/30">
                            Book Uber X — $18.50
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Side Buttons */}
                  <div className="absolute right-[-2px] top-32 w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm"></div>
                  <div className="absolute left-[-2px] top-28 w-[3px] h-7 bg-[#2a2a2a] rounded-r-sm"></div>
                  <div className="absolute left-[-2px] top-40 w-[3px] h-12 bg-[#2a2a2a] rounded-r-sm"></div>
                </div>
                
                {/* "Live Product" Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0D9488] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-[#0D9488]/30 flex items-center gap-2 z-20">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Live Product
                </div>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div 
                style={{ y: y2 }}
                className="absolute top-12 -right-2 lg:right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">You Save</p>
                    <p className="text-xl font-bold text-[#0F172A]">$2.50</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Deploy Status */}
              <motion.div 
                className="absolute bottom-24 -left-2 lg:left-4 bg-[#0F172A] rounded-xl p-3 shadow-xl z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="font-mono text-xs space-y-1">
                  <div className="text-slate-400">$ vercel deploy</div>
                  <div className="text-[#0D9488] flex items-center gap-1.5">
                    <Check className="w-3 h-3" />
                    Production ready
                  </div>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0D9488]/10 rounded-full blur-3xl -z-10"></div>
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
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0D9488]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Header */}
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
            {/* Left - App Mockup */}
            <motion.div variants={slideUp} className="lg:col-span-5">
              <div className="relative">
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-3xl p-6 border border-white/10">
                  {/* Phone Frame */}
                  <div className="bg-[#0F172A] rounded-[2rem] p-2 mx-auto max-w-[260px]">
                    <div className="bg-[#1E293B] rounded-[1.75rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="bg-[#0F172A] px-4 py-2 flex justify-between items-center">
                        <span className="text-white/60 text-xs">9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-10 h-10 bg-[#0D9488] rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-bold">FairFare</div>
                            <div className="text-white/50 text-xs">Compare & Save</div>
                          </div>
                        </div>
                        
                        <div className="bg-[#0F172A] rounded-xl p-3 mb-3">
                          <div className="text-white/50 text-xs mb-1">From</div>
                          <div className="text-white text-sm">123 Main Street</div>
                        </div>
                        
                        <div className="bg-[#0F172A] rounded-xl p-3 mb-4">
                          <div className="text-white/50 text-xs mb-1">To</div>
                          <div className="text-white text-sm">Airport Terminal B</div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="bg-[#0D9488]/20 border border-[#0D9488]/30 rounded-xl p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-[#0D9488] rounded-md"></div>
                              <span className="text-white text-sm">Uber X</span>
                            </div>
                            <span className="text-[#0D9488] font-bold">$24.50</span>
                          </div>
                          <div className="bg-slate-700/30 rounded-xl p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-slate-600 rounded-md"></div>
                              <span className="text-white/70 text-sm">Lyft</span>
                            </div>
                            <span className="text-white/70">$27.00</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-[#0D9488] text-white py-3 rounded-xl font-semibold text-sm">
                          Book Best Price
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-3 -right-3 bg-[#0D9488] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Live Product
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div variants={slideUp} className="lg:col-span-7 lg:pl-8">
              <div className="space-y-6">
                <div>
                  <div className="text-[#0D9488] text-sm font-medium mb-1">Consumer Mobile App</div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Compare rideshare prices in seconds
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Most users open one rideshare app at a time with no quick way to compare pricing. 
                    FairFare solves this by letting users check Uber, Lyft, and other options side-by-side 
                    and choose the best ride before booking.
                  </p>
                </div>

                {/* Stats Strip */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
                  {[
                    { label: "Type", value: "Live Product" },
                    { label: "Focus", value: "Consumer UX" },
                    { label: "Status", value: "Deployed" }
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-white/50 text-xs uppercase tracking-wider">{stat.label}</div>
                      <div className="text-white font-semibold mt-1">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* What MJV Did */}
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

// Interactive Services Section
const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      id: "websites",
      title: "Website Build",
      price: "Starting at $750",
      description: "Custom-built websites that convert visitors into customers. Fast, responsive, and optimized for results.",
      features: ["Custom Design", "Mobile-First", "SEO Optimized", "Fast Loading"],
      icon: Monitor,
      gradient: "from-blue-600 to-[#1E3A5F]"
    },
    {
      id: "apps",
      title: "Starter App",
      price: "Starting at $2,500",
      description: "Mobile and web applications that solve real problems. From MVP to full-scale product launch.",
      features: ["iOS & Android", "Web Apps", "User Auth", "Real-time"],
      icon: Smartphone,
      gradient: "from-[#0D9488] to-teal-700"
    },
    {
      id: "products",
      title: "Full Build & Scale",
      price: "Custom",
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

          {/* Large Interactive Panels */}
          <div className="space-y-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.id;
              const isHovered = activeService === service.id;

              return (
                <motion.div
                  key={service.id}
                  variants={slideUp}
                  onMouseEnter={() => setActiveService(service.id)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() => setExpandedService(isExpanded ? null : service.id)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    isExpanded ? 'bg-gradient-to-r ' + service.gradient : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  data-testid={`service-panel-${service.id}`}
                >
                  <div className={`p-6 lg:p-8 transition-all duration-500 ${isExpanded ? 'pb-8' : ''}`}>
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
                            <span className={`text-lg font-semibold ${
                              isExpanded ? 'text-white/80' : 'text-[#0D9488]'
                            }`}>
                              {service.price}
                            </span>
                          </div>
                          
                          <p className={`mt-2 max-w-2xl transition-colors duration-300 ${
                            isExpanded ? 'text-white/80' : 'text-slate-600'
                          }`}>
                            {service.description}
                          </p>
                          
                          {/* Expanded Content */}
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
                        <span className="text-sm">{isExpanded ? 'Collapse' : 'Expand'}</span>
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

// Project Calculator Section
const ProjectCalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [projectType, setProjectType] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [designLevel, setDesignLevel] = useState(null);
  const [features, setFeatures] = useState([]);
  const [timeline, setTimeline] = useState(null);

  const projectTypes = [
    { id: "website", label: "Website", icon: Monitor },
    { id: "app", label: "App", icon: Smartphone },
    { id: "both", label: "Website + App", icon: Layers }
  ];

  const complexityLevels = [
    { id: "basic", label: "Basic", description: "Simple, straightforward" },
    { id: "moderate", label: "Moderate", description: "Some custom logic" },
    { id: "advanced", label: "Advanced", description: "Complex features" }
  ];

  const designLevels = [
    { id: "simple", label: "Simple / Clean" },
    { id: "premium", label: "Premium Custom" },
    { id: "highend", label: "High-End Experience" }
  ];

  const featureOptions = [
    { id: "contact", label: "Contact Form", icon: UserCheck },
    { id: "auth", label: "User Login", icon: Shield },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "booking", label: "Booking / Scheduling", icon: Calendar },
    { id: "admin", label: "Admin Panel", icon: Settings },
    { id: "api", label: "API Integrations", icon: Link2 }
  ];

  const timelineOptions = [
    { id: "asap", label: "ASAP" },
    { id: "1-2months", label: "1-2 Months" },
    { id: "exploring", label: "Just Exploring" }
  ];

  const toggleFeature = (id) => {
    setFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Calculate estimate
  const getEstimate = () => {
    if (!projectType) return null;

    let baseMin = 0;
    let baseMax = 0;
    let type = "";

    // Base by project type
    if (projectType === "website") {
      baseMin = 750;
      baseMax = 2500;
      type = "Website Build";
    } else if (projectType === "app") {
      baseMin = 2500;
      baseMax = 8000;
      type = "Starter App";
    } else {
      baseMin = 5000;
      baseMax = 15000;
      type = "Full Build";
    }

    // Adjust by complexity
    if (complexity === "moderate") {
      baseMin *= 1.3;
      baseMax *= 1.3;
    } else if (complexity === "advanced") {
      baseMin *= 1.8;
      baseMax *= 1.8;
      type = "Full Build & Scale";
    }

    // Adjust by design
    if (designLevel === "premium") {
      baseMin *= 1.2;
      baseMax *= 1.2;
    } else if (designLevel === "highend") {
      baseMin *= 1.5;
      baseMax *= 1.5;
    }

    // Adjust by features
    const featureMultiplier = 1 + (features.length * 0.1);
    baseMin *= featureMultiplier;
    baseMax *= featureMultiplier;

    return {
      type,
      min: Math.round(baseMin / 100) * 100,
      max: Math.round(baseMax / 100) * 100,
      recommendation: baseMax > 8000 
        ? "This project may fall into a custom build range. Let's discuss your specific needs."
        : baseMax > 3000
        ? "This looks like a strong fit for a starter app build."
        : "This looks like a strong fit for a premium website build."
    };
  };

  const estimate = getEstimate();

  return (
    <section id="calculator" className="py-20 bg-slate-50" data-testid="calculator-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={slideUp} className="text-center mb-12">
            <span className="text-[#0D9488] text-sm font-semibold tracking-wider uppercase">Project Estimator</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mt-2 tracking-[-0.02em]" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Estimate Your Project
            </h2>
            <p className="text-slate-600 mt-2 max-w-xl mx-auto">
              Answer a few quick questions to get a rough idea of what your project may involve.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Inputs */}
            <motion.div variants={slideUp} className="lg:col-span-2 space-y-8">
              {/* Project Type */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">What do you need built?</h3>
                <div className="grid grid-cols-3 gap-3">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          projectType === type.id 
                            ? 'border-[#0D9488] bg-[#0D9488]/5' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${projectType === type.id ? 'text-[#0D9488]' : 'text-slate-400'}`} />
                        <div className={`text-sm font-medium ${projectType === type.id ? 'text-[#0D9488]' : 'text-slate-600'}`}>
                          {type.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Complexity */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Project complexity</h3>
                <div className="grid grid-cols-3 gap-3">
                  {complexityLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setComplexity(level.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        complexity === level.id 
                          ? 'border-[#0D9488] bg-[#0D9488]/5' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className={`text-sm font-medium ${complexity === level.id ? 'text-[#0D9488]' : 'text-slate-700'}`}>
                        {level.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Design Level */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Design level</h3>
                <div className="flex flex-wrap gap-2">
                  {designLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setDesignLevel(level.id)}
                      className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                        designLevel === level.id 
                          ? 'border-[#0D9488] bg-[#0D9488] text-white' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Key features needed</h3>
                <div className="flex flex-wrap gap-2">
                  {featureOptions.map((feature) => {
                    const Icon = feature.icon;
                    const isSelected = features.includes(feature.id);
                    return (
                      <button
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className={`px-3 py-2 rounded-lg border-2 transition-all text-sm font-medium flex items-center gap-2 ${
                          isSelected 
                            ? 'border-[#0D9488] bg-[#0D9488]/5 text-[#0D9488]' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {feature.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Timeline</h3>
                <div className="flex flex-wrap gap-2">
                  {timelineOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setTimeline(option.id)}
                      className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                        timeline === option.id 
                          ? 'border-[#0D9488] bg-[#0D9488] text-white' 
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Estimate Output */}
            <motion.div variants={slideUp}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-[#0F172A] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Your Estimate
                </h3>
                
                {estimate ? (
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Recommended project type</div>
                      <div className="text-lg font-semibold text-[#1E3A5F]">{estimate.type}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Estimated range</div>
                      <div className="text-3xl font-bold text-[#0D9488]">
                        ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {estimate.recommendation}
                    </p>
                    
                    <Button
                      asChild
                      className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white h-12 rounded-xl font-medium mt-2"
                    >
                      <a href="#contact">
                        Get Detailed Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-sm">
                      Select options to see your estimate
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { step: "01", title: "Discovery", description: "We dive deep into your vision and goals to create a clear roadmap." },
    { step: "02", title: "Design & Build", description: "Our team crafts and develops your product with regular updates." },
    { step: "03", title: "Launch", description: "We deploy to production, test thoroughly, and hand over the keys." }
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
              Tell us about your project and we'll get back to you within 24 hours with a clear plan.
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
                  We'll review your project details and get back to you within 24 hours.
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
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company / Business Name</label>
                    <Input
                      type="text"
                      name="company"
                      placeholder="Your company"
                      className="h-11 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                      data-testid="contact-company-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">What are you trying to build? *</label>
                    <Input
                      type="text"
                      name="project-type"
                      placeholder="e.g., Mobile app, Website, Dashboard"
                      required
                      className="h-11 border-slate-200 focus:border-[#0D9488] focus:ring-[#0D9488]/20 rounded-xl"
                      data-testid="contact-project-input"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Timeline</label>
                      <select
                        name="timeline"
                        className="w-full h-11 px-3 border border-slate-200 rounded-xl text-slate-700 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 outline-none"
                        data-testid="contact-timeline-select"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-2-months">1-2 Months</option>
                        <option value="3-months">3+ Months</option>
                        <option value="exploring">Just Exploring</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Budget Range</label>
                      <select
                        name="budget"
                        className="w-full h-11 px-3 border border-slate-200 rounded-xl text-slate-700 focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 outline-none"
                        data-testid="contact-budget-select"
                      >
                        <option value="">Select budget</option>
                        <option value="under-1k">Under $1,000</option>
                        <option value="1k-3k">$1,000 - $3,000</option>
                        <option value="3k-5k">$3,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-plus">$10,000+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <Textarea
                      name="message"
                      placeholder="Tell us more about your project, goals, and any specific requirements..."
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
      <ProjectCalculator />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
