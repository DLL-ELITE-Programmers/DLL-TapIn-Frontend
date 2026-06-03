<div align="center">
    <img src="public/logo.png" width=200 />
    <h1>DLL VeriScan</h1>
    <p>Formerly DLL TapIn</p>
    <h4>DLL BSIT Department x IT Paradigm x DLL E.L.I.T.E</h4>
</div>

A modern Progressive Web App (PWA) designed for quick and seamless interactions within the institution.

---

## 🚀 Tech Stack

- **Framework:** [React 19.2.7](https://react.dev/)
- **Build Tool:** [Vite 8.0.16](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4.3.0](https://tailwindcss.com/)
- **Routing:** [React Router 7.16.0](https://reactrouter.com/)
- **State/Data Fetching:** [Axios 1.16.1](https://axios-http.com/)
- **PWA Support:** [Vite Plugin PWA](https://vite-pwa-org.netlify.app/)
- **Language:** [TypeScript 6.0.3](https://www.typescriptlang.org/)

- **Backend:** [Django Rest Framework](https://www.django-rest-framework.org/)
- **Database:** [Postgrest/Aiven](https://www.postgresql.org/)

## 🎨 Design Philosophy

- **Mobile-First & PWA-Centric:** Built primarily as a Progressive Web App to provide a native-like experience on mobile devices.
- **Performance Optimized:** Leverages React 19 and the React Compiler for highly efficient rendering and minimal overhead.
- **Minimalist Aesthetic:** Focused on clarity and ease of use, utilizing modern CSS features and backdrop effects for a polished look.
- **Responsive & Adaptive:** Automatically detects device types and PWA status to provide the most appropriate user interface.

## 📂 Project Structure

```text
/
├── public/              # Static assets (icons, manifest)
├── src/
│   ├── assets/          # Images, logos, and media files
│   ├── components/      # Reusable UI components (e.g., InstallPWA)
│   ├── lib/             # API clients, utility functions, and hooks
│   ├── pages/           # Route components and view layouts
│   │   ├── pwa/         # Main PWA views (Landing, Login, Register)
│   │   └── user/        # User-specific dashboard and profile views
│   ├── app.tsx          # Root component and router configuration
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind directives
├── package.json         # Dependencies and project scripts
└── tsconfig.json        # TypeScript configuration
```

## 👥 Credits and Contributors

### Core Team
* **Kurt Atoat** - Project Initiator and UI Designer
* **Ryann Kim Sesgundo** - Project Head Full Stack Developer
* **Abdul Barry Adam** - Project Developer
* **Rogemson Molina** - Project UI Designer

### Testing and Distribution
* **Bernard Gabito** - Project Tester and Distributor
* **Peter Paul Eclavea** - Project Tester

### Cybersecurity
* **Carlos Ragudo** - Cybersecurity Pentester
* **Terrence Martin Terrega** - Cybersecurity Pentester

### Documentation and AI Support
* **Google Gemini** - Documentation and AI Assistance
* **ChatGPT**
* **Claude**

## 🤝 Contribution Guidelines

We welcome contributions from students and faculty. Please follow these practices to maintain project health:

1. **Branching:** Always create a new branch for any feature or bug fix. Use descriptive names like `feature/qr-scanner` or `fix/login-bug`.
2. **Merging:** Once a feature is complete and merged into the main branch, the feature branch **must be deleted** immediately.
3. **Commenting:** As this project serves as a learning resource for students, use **proper, professional comments**. Explain the "why" behind complex logic to help future student developers understand the code.
4. **Code Quality:** Ensure your code follows the established patterns and passes linting.

## ⚖️ License

This project is licensed under a custom **Institutional and Educational License**. 

**Copyright (c) 2026 DLL IT Department, DLL IT Paradigm, DLL ELITE.**

- **Institutional/Educational Use Only:** Restricted to academic and institutional purposes.
- **No Commercial Use:** The project and its data must never be sold or used for commercial gain.
- **Security Research:** Any cybersecurity-related testing must be approved by the institutional program.

See [LICENSE.md](LICENSE.md) for the full terms.
