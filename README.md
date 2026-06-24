# 🍽️ YumSearch

A fast, clean recipe search and discovery app powered by the [MealDB API](https://www.themealdb.com/api.php). Search thousands of recipes by name, browse by category, and find your next favourite meal — all in a modern, responsive UI.

🔗 **Live Demo:** [yumsearch.vercel.app](https://yumsearch.vercel.app/)

---

## 📋 Project Info

| | |
|---|---|
| **Live URL** | https://yumsearch.vercel.app/ |
| **Built by** | Archana Gundla |

---

## ✨ Features

- 🔍 Search recipes by name in real time
- 🗂️ Browse by category — Chicken, Seafood, Desserts, and more
- 📋 View full recipe details — ingredients, measurements, and step-by-step instructions
- 🎨 Clean, responsive UI that works on mobile and desktop
- ⚡ Fast load times powered by Vite

---

## 🛠️ What technologies are used for this project?

This project is built with:

- **Vite** — lightning-fast build tool
- **TypeScript** — type-safe JavaScript
- **React** — component-based UI
- **shadcn-ui** — accessible, customizable UI components
- **Tailwind CSS** — utility-first styling
- **MealDB API** — free recipe data API

---

## 🚀 How can I edit this code?

**Use your preferred IDE**

Clone this repo and run locally. The only requirement is having Node.js & npm installed — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd yumsearch

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

The app will be running at `http://localhost:5173`

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the **Edit** button (pencil icon) at the top right of the file view.
- Make your changes and commit.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click the **Code** button (green) near the top right.
- Select the **Codespaces** tab.
- Click **New codespace** to launch a new environment.
- Edit files directly within the Codespace and commit and push your changes once done.

---

## 📡 API Reference

This project uses the free [MealDB API](https://www.themealdb.com/api.php). No API key required.

| Endpoint | Usage |
|----------|-------|
| `/search.php?s={name}` | Search meals by name |
| `/categories.php` | Get all categories |
| `/filter.php?c={category}` | Filter meals by category |
| `/lookup.php?i={id}` | Get full meal details by ID |

---

## 🌐 How can I deploy this project?

This project is deployed on **Vercel**. To deploy your own copy:

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) and import your forked repo
3. Vercel will auto-detect Vite and configure the build — click **Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/yumsearch)

---

## 👩‍💻 Author

**Archana Gundla**
- 🔗 LinkedIn: [linkedin.com/in/archana-gundla-365196243](https://www.linkedin.com/in/archana-gundla-365196243)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
