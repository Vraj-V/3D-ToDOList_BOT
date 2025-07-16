# 🧠 3D To-Do List + AI ChatBot (React + Vite)

A minimal yet futuristic To-Do list app with a **3D Bot powered by Spline** and a **ChatBox assistant** for managing daily tasks. Designed with real-time interaction in mind.

![To-Do Bot Preview](./public/vite.svg)

---

## 🚀 Features

- ✅ Add, delete, reorder tasks
- 🤖 3D animated bot using [Spline](https://spline.design/)
- 💬 Toggleable AI-style chatbot for daily task support
- 💻 Responsive UI (mobile + desktop)
- ⚡ Built with Vite for fast development
- 📦 Deployed via Vercel

---

## 🛠 Tech Stack

- [React](https://reactjs.org/) – UI rendering
- [Vite](https://vitejs.dev/) – Lightning-fast dev server
- [Spline](https://spline.design/) – 3D bot embed
- [CSS Modules](https://github.com/css-modules/css-modules) – Styling
- [Vercel](https://vercel.com/) – Deployment

---

## 📂 Folder Structure

task-tracker/
├── public/
│ └── vite.svg
├── src/
│ ├── App.jsx
│ ├── ToDoList.jsx
│ ├── ChatBox.jsx
│ ├── assets/
│ └── styles.css
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md

yaml
Copy
Edit

---

## 🔧 Installation

Make sure you have **Node.js (>= 14)** and **npm** installed.

### 1. Clone the Repo

```bash
git clone https://github.com/Vraj-V/3D-ToDOList_BOT.git
cd 3D-ToDOList_BOT
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start Development Server
bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser to view it.

📦 Build for Production
bash
Copy
Edit
npm run build
🌐 Deployed on Vercel
Check the live demo here:
🔗 https://3d-todolist-bot.vercel.app (replace with your actual link)

📚 How It Works
🧾 To-Do Functionality
Uses useState for state management of tasks and newTask

Tasks can be:

➕ Added

❌ Deleted

🔼 Moved up

🔽 Moved down

🧠 ChatBot Interaction
Toggle ChatBox by clicking the 3D bot

ChatBox UI is sticky to bottom right (like WhatsApp)

Past messages are stored in memory (session-based)

🎮 3D Bot via Spline
Bot is embedded using <Spline /> component

Auto-resizes to full viewport

Click on bot triggers the chatbot

📥 Dependencies & Why?
Package	Purpose
react	UI rendering
react-dom	DOM bindings for React
@splinetool/react-spline	To render the 3D bot from Spline
vite	Faster dev & optimized builds

👨‍💻 Author
Vraj V
🧑‍💻 GitHub
🌐 Portfolio

📄 License
This project is open source and free to use under the MIT License.

yaml
Copy
Edit

---

Let me know if you want to:
- Add **screenshot previews**
- Embed a **YouTube demo link**
- Or auto-deploy on commit with Vercel CI/CD

I'll help adjust accordingly. ✅
