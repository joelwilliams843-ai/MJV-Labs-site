# MJV Labs Landing Page - PRD

## Original Problem Statement
Build a custom-designed, high-end landing page for MJV Labs that visually proves we can build real products — not cookie-cutter sites. Must avoid all standard template structures and use asymmetry, split sections, alternating layouts, and layered content blocks.

## User Personas
- **Business Owners/Operators**: Non-technical entrepreneurs who want professional software built fast without complexity
- **Startup Founders**: Looking for MVP development with clear pricing
- **Agency Clients**: Seeking white-label product development

## Core Requirements (Static)
- Premium enterprise feel with white/light background
- Deep blue (#1E3A5F) primary, teal (#0D9488) accent
- Moderate animations (scroll reveals, hover effects)
- Contact form with Resend email integration
- Mobile responsive
- NO template signals or generic card layouts

## What's Been Implemented (v1 - April 8, 2026)
- ✅ Split-screen hero with floating UI mockups, stats card, code snippet
- ✅ Interactive service strip with 3 expandable panels (hover effects)
- ✅ What We Build bento grid visual proof section
- ✅ Process timeline on dark background (Discovery → Design & Build → Launch)
- ✅ Built for Operators split section
- ✅ Premium contact form with Resend integration
- ✅ Custom MJV Labs logo and favicon
- ✅ Asymmetric layouts throughout
- ✅ Emergent badge hidden
- ✅ Backend /api/contact endpoint saving to MongoDB

## Architecture
- **Frontend**: React 19 + Framer Motion + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI + MongoDB
- **Email**: Resend integration (requires API key for production)

## Prioritized Backlog
### P0 (Must Have)
- [Done] Core landing page sections
- [Done] Contact form functionality

### P1 (Should Have)
- [ ] Resend API key configuration for email notifications
- [ ] Add portfolio/case study examples with real project images
- [ ] Testimonials section

### P2 (Nice to Have)
- [ ] Blog/Resources section
- [ ] Live chat integration
- [ ] Project calculator/estimator
- [ ] Animation refinements for mobile

## Next Tasks
1. Configure Resend API key (RESEND_API_KEY, RECIPIENT_EMAIL in backend/.env)
2. Add real portfolio images/case studies
3. Consider adding client testimonials
