# Installation

Follow these steps to clone and install your Astro project:

## 1. Clone the Repository

Open your terminal and run the following command to clone your Astro project repository. Replace `<repository-url>` with your project's URL.

```bash
git clone <repository-url>
```

## 2. Navigate into the Project Directory

Change to the project directory that was just created:

```bash
cd your-project-directory
```

## 3. Install Dependencies

Astro projects typically use npm, yarn, or pnpm to manage dependencies. Choose one of the following commands based on your package manager:

- **Using npm:**

  ```bash
  npm install
  ```

- **Using yarn:**

  ```bash
  yarn
  ```

- **Using pnpm:**

  ```bash
  pnpm install
  ```

## 4. Start the Development Server

Once the dependencies are installed, run the development server:

- **Using npm:**

  ```bash
  npm run dev
  ```

- **Using yarn:**

  ```bash
  yarn dev
  ```

- **Using pnpm:**

  ```bash
  pnpm dev
  ```

This will start your Astro project locally. Typically, you can view it in your browser at [http://localhost:3000](http://localhost:3000) (or the port specified in your configuration).

## 5. Build for Production (Optional)

When you’re ready to build your project for production, run:

- **Using npm:**

  ```bash
  npm run build
  ```

- **Using yarn:**

  ```bash
  yarn build
  ```

- **Using pnpm:**

  ```bash
  pnpm build
  ```
---

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                                          |
| :------------------------ | :------------------------------------------------------------------------------ |
| `npm install`             | Installs dependencies                                                           |
| `npm run dev`             | Starts local dev server at                                                      |
| `npm run dev --remote`    | Starts local dev server at `localhost:4321` with remote database connection     |
| `npm run build`           | Build your production site to `./dist/`                                         |
| `npm run preview`         | Preview your build locally, before deploying                                    |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`                                |
| `npm run astro -- --help` | Get help using the Astro CLI                                                    |
| `npm run astro db push`   | Push schedma to local database                                                  |
| `npm run astro db push --remote`  | Push schema to remote database                                          |
| `npm run astro db push --remote --force-reset` | Push schema to remote database and reset schema and data   |

---

For more details or troubleshooting, consult the [Astro documentation](https://docs.astro.build).
