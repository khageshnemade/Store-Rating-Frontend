
## Store-Rating-Frontend

This project uses **React Vite + Tailwind CSS + Redux Toolkit + Axios + React Router** for a store rating platform.

---

### Environment Setup

There are **two environment files**:

1. **Development** (`.env`)

```env
VITE_APP_API_URL=http://localhost:3000/api
VITE_PORT=5173
```

* Loaded automatically when running:

```bash
npm run dev
```

* Use this for local testing and development.

2. **Production** (`.env.production`)

* Loaded automatically when building the project:

```bash
npm run build
```

* Use this when deploying your application.

> **Tip:** Make sure the `.env` files are in the root of the project.
> Example additional variables:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Store Rating Platform
```

---

### Running the Project

1. Install dependencies:

```bash
npm install
```

2. Run in development mode:

```bash
npm run dev
```

* The app will run at [http://localhost:5173](http://localhost:5173) (default Vite port).

3. Build for production:

```bash
npm run build
```

* The production-ready build files will be in the `dist/` folder.

---

### Running the Preview Server

To preview the built app, run:
```bash
npm run preview
```