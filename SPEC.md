# Melodie Pousada à Beira Mar - Specification

## 1. Project Overview
- **Project Name**: Melodie Pousada Website
- **Type**: Premium hospitality website with booking system
- **Core Functionality**: Multi-language booking website for a beachfront pousada in Ingleses Norte, Florianopolis
- **Target Users**: Brazilian and international tourists seeking beachfront accommodation

## 2. Business Information

### Contact Details
- **Name**: Melodie Pousada à Beira Mar
- **Address**: Servidão Fermino Manoel Zeferino, 79, Ingleses Norte, Florianópolis - SC, CEP 88058-402, Brasil
- **Phone/WhatsApp**: +55 48 98821-2772
- **Google Maps**: https://www.google.com/maps/place/Melodie+Pousada+%C3%A0+Beira+Mar/@-27.4440227,-48.3785867,17z
- **Location Code**: HJ4F+9H

### Ratings & Reviews
- **Google Rating**: 4.9 stars
- **Reviews**: 58 Google reviews

### Description
Beachfront pousada in Ingleses Norte, Florianopolis. Ideal for vacations and rest. Run by owners Fabio and his wife, known for excellent service. Direct beach access, chairs and umbrellas for guests, BBQ grill, viewpoint, and close to Santinho dunes. Family, peaceful environment perfect for those seeking rest by the sea.

## 3. Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Maps**: @react-google-maps/api
- **Email**: React Email + Resend
- **Hosting**: Vercel

## 4. UI/UX Specification

### Color Palette
- **Primary**: #0D4F4F (Deep Teal - ocean inspired)
- **Primary Light**: #1A7A7A
- **Secondary**: #F4E4C1 (Sand/Cream)
- **Accent**: #FF8C42 (Sunset Orange)
- **Text Primary**: #1A1A1A
- **Text Secondary**: #666666
- **Background**: #FAFAF8
- **White**: #FFFFFF

### Typography
- **Headings**: "Playfair Display" (elegant serif)
- **Body**: "DM Sans" (modern clean sans)
- **Accent**: "Cormorant Garamond" (luxury feel)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 5. Pages Structure

### Public Pages (Multi-language)
1. **Home** (/) - Hero, features, testimonials, CTA
2. **Rooms** (/quartos) - Room listings with photos, prices
3. **Gallery** (/galeria) - Photos, videos, interior/exterior
4. **Location** (/localizacao) - Google Maps, how to arrive
5. **About Us** (/sobre) - Story, owners, philosophy
6. **Contact** (/contato) - Form, WhatsApp, phone, map
7. **Booking** (/reservas) - Full booking system

### Admin Pages (Protected)
1. **Dashboard** (/admin) - Stats, recent bookings
2. **Bookings** (/admin/reservas) - Manage bookings
3. **Rooms** (/admin/quartos) - Manage rooms
4. **Settings** (/admin/configuracoes) - Settings, prices

## 6. SEO Requirements

### Meta Tags
- Dynamic meta titles/descriptions per page
- Open Graph tags
- Twitter Card tags

### Schema
- Hotel schema
- BreadcrumbList schema
- FAQ schema
- Review schema

### Sitemap
- XML sitemap
- Robots.txt

### Keywords
- pousada inglesa floresta
- pousada frente ao mar floresta
- hotel floresta norte
- pousada praia floresta

## 7. Features

### Booking System
- Date selection calendar
- Guest count selection
- Real-time availability
- Automatic price calculation
- Email confirmation
- WhatsApp notification

### Payment Options
- PIX
- Credit/Debit Card
- Bank Transfer

### Premium Features
- Floating WhatsApp button
- Dark/Light mode
- Promotions/Coupons
- Newsletter
- Instagram integration
- Interactive map

## 8. Security
- HTTPS enabled
- Form validation (Zod)
- Input sanitization
- Rate limiting
- CSRF protection

## 9. Performance Targets
- Google PageSpeed 90+
- Core Web Vitals passed
- Optimized images (WebP, lazy loading)
- Code splitting
- CDN caching

