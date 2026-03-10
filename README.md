# Melodie Pousada à Beira Mar - Website

Professional premium website for a beachfront pousada in Ingleses Norte, Florianopolis, Brazil.

## Features

- Multi-language support (Portuguese, Spanish, English)
- Online booking system
- Responsive design (mobile, tablet, desktop)
- SEO optimized
- Fast loading with Next.js
- Admin panel for managing bookings
- WhatsApp integration

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/melodie-pousada.git
cd melodie-pousada
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_SITE_URL=https://melodiepousada.com.br
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

1. Create a new project at [Supabase](https://supabase.com)
2. Go to SQL Editor in Supabase dashboard
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL to create all tables

## Project Structure

```
melodie-pousada/
├── app/                    # Next.js App Router pages
│   ├── [lang]/           # Language routes
│   │   ├── page.tsx      # Home page
│   │   ├── reservas/     # Booking page
│   │   └── ...
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, Features
│   └── ui/               # Buttons, Cards
├── lib/                  # Utilities
│   ├── supabase.ts       # Supabase client
│   ├── i18n.ts           # Internationalization
│   └── utils.ts          # Helper functions
├── dictionaries/         # Translation files
│   ├── pt.json
│   ├── es.json
│   └── en.json
└── database/             # Database schema
    └── schema.sql
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

### Custom Domain

1. Buy a domain (e.g., from GoDaddy, Namecheap)
2. In Vercel dashboard, go to Settings > Domains
3. Add your domain
4. Update DNS records as instructed

## SEO

The website includes:
- Dynamic meta tags per page
- Open Graph tags
- Schema.org Hotel markup
- Sitemap.xml
- Robots.txt

### Keywords
- pousada florianopolis
- pousada frente ao mar florianopolis
- hotel floresta norte
- pousada praia floresta
- hospedagem inglsa florianopolis

## Contact Information

- **Address**: Servidão Fermino Manoel Zeferino, 79, Ingleses Norte, Florianópolis - SC, CEP 88058-402, Brasil
- **Phone/WhatsApp**: +55 48 98821-2772
- **Email**: contato@melodiepousada.com.br
- **Google Maps**: https://goo.gl/maps/your-location

## License

MIT License - feel free to use this project for your own pousada!

## Credits

- Images: Unsplash (placeholder images - replace with real photos)
- Icons: Lucide React
- Framework: Next.js

---

Built with love for Melodie Pousada by Fabio and family

