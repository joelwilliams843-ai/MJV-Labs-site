# MJV Labs Landing Page - PRD

## Original Problem Statement
Build a custom-designed, high-end landing page for MJV Labs that proves the company builds real products. Must NOT feel like a template. Features: Netlify Forms, FairFare case study, Project Calculator, interactive service panels.

## User Personas
- **Business Owners/Operators**: Non-technical entrepreneurs wanting professional software
- **Startup Founders**: Looking for MVP development with clear pricing
- **Agency Clients**: Seeking white-label product development

## What's Been Implemented (v2 - April 8, 2026)
- ✅ Premium hero with FairFare app mockup (real product UI, not stock)
- ✅ FairFare case study section with phone mockup and "Live Product" badge
- ✅ Interactive expandable service panels (gradient backgrounds on expand)
- ✅ Project Calculator with dynamic pricing estimates
- ✅ Netlify Forms contact form (name, email, company, project-type, timeline, budget, message)
- ✅ "Working version in days, not months" messaging
- ✅ Custom MJV Labs logo and favicon
- ✅ Reduced spacing for connected feel
- ✅ Mobile responsive design

## Architecture
- **Frontend**: React 19 + Framer Motion + Tailwind CSS + Shadcn/UI
- **Forms**: Netlify Forms (static deployment ready)
- **Hosting**: Netlify-ready (no backend required)

## Netlify Deployment Settings
| Field | Value |
|-------|-------|
| Base directory | `frontend` |
| Build command | `yarn build` |
| Publish directory | `frontend/build` |

## Prioritized Backlog
### P0 (Done)
- [x] Core landing page with all sections
- [x] FairFare case study
- [x] Project Calculator
- [x] Netlify Forms contact

### P1 (Should Have)
- [ ] Additional case studies (2-3 more projects)
- [ ] Client testimonials section
- [ ] Real FairFare screenshots (if available)

### P2 (Nice to Have)
- [ ] Blog/Resources section
- [ ] Live chat integration
- [ ] Animation refinements

## Next Tasks
1. Deploy to Netlify using settings above
2. Test Netlify Forms submission in production
3. Add more case studies with real project images
4. Consider adding testimonials
