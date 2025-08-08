# The Saish Project

A personal web application showcasing projects, experiences, and thoughts. Built with Next.js and modern web technologies.

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Font**: Geist

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/thesaishproject.git
cd thesaishproject
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

Key folders under `src/`:

- `app/` — Next.js App Router pages, layouts, api routes
- `components/` — UI components (with a barrel `index.ts`)
- `hooks/` — React hooks (with a barrel `index.ts`)
- `utils/` — Utility functions and dynamic component loader (with a barrel `index.ts`)
- `data/` — Static JSON data read by API routes
- `public/images/` — Image assets referenced by the app

Housekeeping done:
- Removed unused: `src/components/Timeline.module.css`
- Removed empty/unused: `src/utils/companyLogos.ts`
- Removed unused public SVGs: `public/{file,globe,next,vercel,window}.svg`

Imports now favor barrels and the `@` alias:

```ts
import { NavMenu, AnimationProvider } from '@/components';
import { useProjects } from '@/hooks';
import { fadeInUp } from '@/utils';
```

## Features

- Modern, responsive design
- Server-side rendering
- Optimized performance
- Dark/Light mode support

## Contributing

Feel free to open issues and pull requests for any improvements you want to contribute.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
