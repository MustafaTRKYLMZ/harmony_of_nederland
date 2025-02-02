# Harmony of Nederland

This application was created to understand the code-writing capabilities of artificial intelligence. It was developed entirely through prompts using Codeium Cascade AI (by Codeium, a Silicon Valley-based AI company), without any manual code writing.

A modern, responsive website for the Dutch community built with Next.js, Chakra UI, and TypeScript.

## Features

- 🌍 Multilingual support (Dutch and English)
- 🎨 Dark/Light mode
- 📱 Fully responsive design
- 🎉 Events management
- 💼 Sponsor showcase
- ♿ Accessibility focused

## Project Structure

- `hvn-website/` - Next.js frontend application
- `hvn-cms/` - Strapi CMS backend

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Frontend Installation

1. Navigate to the website directory:
```bash
cd hvn-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file with required environment variables:
```
NEXT_PUBLIC_STRAPI_API_URL=your_strapi_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### CMS Installation

1. Navigate to the CMS directory:
```bash
cd hvn-cms
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the CMS:
```bash
npm run develop
# or
yarn develop
```

4. Open [http://localhost:1337/admin](http://localhost:1337/admin) in your browser.

## Testing

### E2E Tests
```bash
# Install Playwright browsers
npx playwright install

# Run tests
npm run test:e2e
```

### Unit Tests
```bash
npm run test
```

## Building for Production

```bash
npm run build
npm run start
```

## Tech Stack

### Frontend
- Next.js - React framework
- TypeScript - Type safety
- Chakra UI - Component library
- Framer Motion - Animations
- next-i18next - Internationalization
- Playwright - E2E testing
- Jest - Unit testing

### Backend
- Strapi - Headless CMS
- SQLite - Database

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
