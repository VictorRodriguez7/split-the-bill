# 💸 Split the Bill

A simple full-stack web app that helps groups fairly track and split shared expenses — no more awkward Venmo texts or forgotten IOUs.

Built with **React**, **Node.js/Express**, and a lightweight in-memory data store for fast prototyping.

---

## ✨ Features

- ✅ Create and manage groups
- ✅ Add shared expenses and assign payers
- ✅ Automatically calculates who owes whom
- ✅ Checkboxes to mark payments as paid (with backend persistence)
- ✅ Export expense summary as PDF
- ✅ Clean, responsive design with a fun vibe


---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- TailwindCSS for styling
- React Router DOM
- jsPDF for PDF generation

### Backend
- Node.js + Express
- In-memory storage (can swap with SQLite/Mongo later)

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/split-the-bill
cd split-the-bill

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install
