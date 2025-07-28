# ⚡️ mpho-cli

A modular and extensible CLI toolbox to boost your productivity with handy developer tools like project file tree generation, testing, linting, docs generation, Git automation, and scaffolding.

---

## 🚀 Features

- 🗂️ `tree` — Generate a visual file tree of your project (cross-platform)
- 🧪 `test` — Run tests using Vitest
- ✅ `lint` — Check code quality with ESLint
- 📚 `docs` — Generate documentation from code comments
- 🏗️ `init` — Scaffold a new project with a basic folder structure
- 📄 `readme` — Generate a bare-minimum `README.md` file
- 🔧 `git` — Add, commit, and push changes to Git in one step

---

## 📦 Installation

> **For development and global CLI use:**

```bash
git clone https://github.com/your-username/mpho-cli.git
cd mpho-cli
npm install
npm link
```

✅ This installs all dependencies and links the CLI globally so you can run it anywhere using:

```bash
mpho <command>
```

---

## 🛠️ Usage

### 🔍 Generate a project tree
```bash
mpho tree
```

### 🧪 Run tests
```bash
mpho test
```

### ✅ Run linting
```bash
mpho lint
```

### 📚 Generate documentation
```bash
mpho docs
```

### 🏗️ Scaffold a new project
```bash
mpho init
```

### 📄 Create a bare README
```bash
mpho readme
```

### 🔧 Git: Add, commit, and push
```bash
mpho git "your commit message"
```

---

## 🧩 Development Guide

- CLI entry point: `bin/mpho.js`
- Commands are modularized in:
  - `gulp/` (tool orchestration)
  - `tasks/` (logic handlers)
- Argument parsing: [Yargs](https://github.com/yargs/yargs)
- Terminal output: [Chalk](https://github.com/chalk/chalk)
- System commands: Native `child_process` from Node.js
- Code style: [ESModules](https://nodejs.org/api/esm.html) (`"type": "module"` in `package.json`)

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to [open an issue](https://github.com/your-username/mpho-cli/issues) or submit a pull request if you'd like to:

- Add new tools
- Fix bugs
- Improve documentation
- Suggest better CLI flows

---

## 📄 License

MIT License

---

## 💡 Notes

- Tested on macOS and Windows
- Designed to be fast, extensible, and cross-platform
- Requires **Node.js v16 or higher**

---

Made with ☕ and ⚙️ by Mpho