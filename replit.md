# Restaurante Demo - Static Website

## Recent Changes

**December 8, 2025** - Initial MVP completed
- Implemented complete single-page restaurant website with all required sections
- Added responsive design with mobile hamburger menu and desktop navigation
- Integrated WhatsApp deep linking for reservations and contact
- Created floating chatbot widget with keyword-based responses
- Fixed WhatsApp validation to allow demonstration with example number
- All functionality tested and verified working correctly

## Overview

This is a single-page static website for a restaurant built with vanilla HTML, CSS, and JavaScript. The site is designed to showcase restaurant information, menu items, business hours, and provide easy contact methods through WhatsApp. It features a responsive design optimized for both desktop and mobile devices, with a floating chatbot interface for customer inquiries.

The application serves as a simple digital presence for a restaurant without requiring backend infrastructure or database management, making it ideal for deployment on static hosting platforms like Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Single-Page Application (SPA) Approach**
- The entire website is contained in a single HTML page (`index.html`) with JavaScript-driven interactivity
- Navigation uses anchor links with smooth scrolling to different sections
- No build tools or frameworks required - pure vanilla JavaScript, HTML5, and CSS3
- Problem: Need a simple, maintainable website without complex tooling
- Solution: Static HTML/CSS/JS approach provides simplicity and fast loading times
- Pros: Zero dependencies, fast performance, easy to deploy, no build step
- Cons: Limited scalability for complex features, manual DOM manipulation

**Responsive Design Pattern**
- Mobile-first CSS approach using flexbox and CSS Grid
- Sticky header navigation that remains accessible during scrolling
- Hamburger menu toggle for mobile devices
- CSS custom properties (CSS variables) for consistent theming
- Problem: Must work seamlessly across desktop and mobile devices
- Solution: Responsive CSS with breakpoints and flexible layouts
- Pros: Single codebase for all devices, modern CSS features
- Cons: Requires careful testing across device sizes

**Component-Based Structure (Conceptual)**
- Although not using a framework, the code is organized into logical sections:
  - Header/Navigation
  - Hero section
  - Menu display
  - Hours/Schedule
  - Contact section
  - Floating chatbot widget
- Each section is self-contained with dedicated CSS classes
- JavaScript modules handle specific functionality (menu toggle, chatbot, WhatsApp integration)

### Data Management

**Configuration Object Pattern**
- All restaurant data is stored in JavaScript configuration objects in `script.js`
- `restaurantInfo` object contains business details (name, address, phone, WhatsApp number, hours)
- `menuItems` array contains menu item objects with id, name, description, and price
- Problem: Need easy way to update restaurant information without touching HTML
- Solution: Centralized configuration objects that are referenced throughout the code
- Pros: Single source of truth, easy to modify, clear separation of data and presentation
- Cons: Changes require code edits and redeployment

**Static Content Rendering**
- Menu items and other dynamic content are rendered from JavaScript objects
- DOM manipulation used to populate HTML elements with data from configuration
- No client-side routing or state management needed
- Problem: Displaying repeating content (menu items) without duplicating HTML
- Solution: JavaScript template literals and DOM insertion
- Pros: Maintains DRY principles, easier to update content
- Cons: Initial render requires JavaScript execution

### Interaction Patterns

**WhatsApp Integration**
- Direct deep links to WhatsApp Web/App using the `wa.me` URL scheme
- Formatted messages pre-populated with reservation or inquiry text
- WhatsApp number configured in `restaurantInfo.whatsappNumero` (international format)
- Problem: Provide instant communication channel without phone calls
- Solution: WhatsApp deep linking for both desktop and mobile
- Pros: Familiar interface for users, no form submission needed, instant communication
- Cons: Requires users to have WhatsApp installed

**Chatbot Widget**
- Floating bubble button that toggles chat interface visibility
- Predefined FAQ responses (no AI/backend required)
- Pattern matching on user input to provide relevant answers
- Persistent visibility across all page sections
- Problem: Answer common questions without requiring human intervention
- Solution: Simple rule-based chatbot with keyword matching
- Pros: Always accessible, reduces repetitive inquiries, no backend needed
- Cons: Limited to predefined responses, no learning capability

**Navigation System**
- Smooth scroll behavior to page sections via anchor links
- Active section highlighting based on scroll position (intersection observer pattern)
- Mobile hamburger menu with toggle animation
- Problem: Intuitive navigation without page reloads
- Solution: Anchor-based navigation with smooth scrolling
- Pros: Fast, no server requests, standard HTML behavior
- Cons: Limited to single-page navigation

### Styling Architecture

**CSS Custom Properties**
- Design tokens defined in `:root` for colors, shadows, and spacing
- Consistent theme across entire application
- Easy to modify for rebranding
- Variables for primary colors, text colors, backgrounds, borders, and shadows

**Modular CSS Organization**
- Sections organized by component/feature
- BEM-like naming conventions for clarity
- Mobile-first media queries
- Utility classes for common patterns

## External Dependencies

**Google Fonts**
- Service: Google Fonts CDN
- Purpose: Custom typography (Poppins font family)
- Integration: Link tag in HTML head
- Weights used: 300, 400, 500, 600, 700
- Fallback: System fonts if CDN unavailable

**WhatsApp Business Platform**
- Service: WhatsApp Web/Mobile deep linking
- Purpose: Direct customer communication and reservations
- Integration: `wa.me` URL scheme with pre-formatted messages
- Format: `https://wa.me/{number}?text={encoded_message}`
- No API key or authentication required

**No Backend Services**
- No database (content is static in JavaScript configuration)
- No authentication system (public-facing website)
- No API endpoints (static file serving only)
- No server-side processing

**Deployment Assumptions**
- Static file hosting (Replit static hosting, GitHub Pages, Netlify, etc.)
- No build process required
- No environment variables needed (all config in code)
- HTTPS recommended for production deployment