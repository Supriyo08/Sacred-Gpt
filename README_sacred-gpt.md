
# Sacred GPT

A production-ready full-stack React application template with an integrated Express server, TypeScript, Vite, TailwindCSS, and a modern UI component library. Built for rapid prototyping and scalable, maintainable codebases.

---

## 🚀 Tech Stack

- **Frontend:** React 18, React Router 6 (SPA), TypeScript, Vite, TailwindCSS 3
- **Backend:** Express server (integrated with Vite dev server)
- **UI:** Radix UI, shadcn/ui, Lucide React Icons
- **Testing:** Vitest
- **Other:** Zod, Framer Motion, Recharts

---

## 📁 Project Structure

```
supriyo08-sacred-gpt/
├── client/        # React SPA frontend
│   ├── pages/     # Route components (e.g., Index.tsx = home)
│   ├── components/ui/ # Pre-built UI components
│   └── global.css # Tailwind theming and global styles
├── server/        # Express API backend
│   └── routes/    # API handlers
├── shared/        # Types/interfaces for both client & server
├── public/        # Static assets (robots.txt etc.)
├── .builder/      # Deployment/build rules
├── netlify/       # Netlify serverless functions
├── ...            # Config, env, and other files
```

---

## 🧩 Key Features

- **SPA Routing:** Powered by React Router 6 (`client/pages/`)
- **Modern Styling:** TailwindCSS 3, with global and component-level styles
- **Pre-built UI Kit:** Large set of shadcn/ui & Radix components (`client/components/ui`)
- **Type-Safe API:** Shared types between frontend and backend
- **Single-port Development:** Vite + Express integration for seamless DX
- **Production Deployments:** Netlify/Vercel or Node server, ready for cloud
- **Customizable:** Extend theme/colors via `tailwind.config.ts` and `client/global.css`

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

### Installation

```bash
git clone https://github.com/supriyo08/sacred-gpt.git
cd sacred-gpt
npm install
```

### Development

```bash
npm run dev
# Runs Vite dev server + Express API (on port 8080)
```

### Build & Production

```bash
npm run build
npm run start
# Builds and runs optimized client and server
```

---

## 🗺️ Routing & API

- **Frontend routes:** Add pages to `client/pages/` and register in `client/App.tsx`
- **API endpoints:** Add handlers to `server/routes/` and register in `server/index.ts`
- **Shared types:** Place in `shared/api.ts` and import in both client & server

---

## 📦 Scripts

| Command         | Description                         |
|-----------------|-------------------------------------|
| `npm run dev`   | Start dev server (Vite + Express)   |
| `npm run build` | Production build (client + server)  |
| `npm run start` | Start production server             |
| `npm run test`  | Run Vitest test suite               |
| `npm run typecheck` | TypeScript validation           |
| `npm run format.fix` | Auto-format code with Prettier |

---

## 🌱 Customization

- **Add UI components:** Place in `client/components/ui/`
- **Add API routes:** Create handler in `server/routes/`, register in `server/index.ts`
- **Theming:** Edit `tailwind.config.ts` and `client/global.css` for custom colors, radius, etc.

---

## 🚀 Deployment

- **Netlify/Vercel:** Supported out of the box (see `netlify.toml`)
- **Custom server:** `npm run build` then `npm run start`
- **Cloud functions:** Use `/netlify/functions/api.ts` for serverless API

---

## 🧠 Architecture Notes

- TypeScript throughout (client, server, shared)
- Modern tooling: Vite, hot reload, easy config
- Ready for full-stack extension and rapid MVP

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT

---

**Project Maintainer:** [supriyo08](https://github.com/supriyo08)

