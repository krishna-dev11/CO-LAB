# CO-LAB — Real-Time Collaborative Whiteboard

CO-LAB is a lightweight, real-time collaborative whiteboard designed for students, teams, and creators. It allows multiple users to draw, sketch, and brainstorm together seamlessly using WebSockets and a modern, responsive UI.

---

## 🚀 Features

- **Real-Time Collaboration** using WebSockets for instant syncing.
- **Interactive Whiteboard** with smooth drawing & erasing tools.
- **Responsive UI** built with React.js and TailwindCSS.
- **REST APIs** for session and user management (Node.js + Express).
- **MongoDB Integration** for persistent data storage.
- **Lightweight Alternative** to tools like Miro and Jamboard.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Real-Time:** WebSockets  
- **Version Control:** Git, GitHub  

---

## 📸 Key Functionalities

- Real-time multi-user drawing  
- Eraser & drawing tools  
- Session creation & joining  
- Smooth Canvas rendering  
- Fast WebSocket communication  

---

## 📂 Project Structure

```
CO-LAB/
│── client/            # React frontend
│   ├── components/
│   ├── pages/
│   └── utils/
│
│── server/            # Express backend
│   ├── routes/
│   ├── models/
│   └── websocket/
│
│── package.json
│── README.md
└── ...
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/CO-LAB
cd CO-LAB
```

### 2️⃣ Install dependencies

#### Frontend
```bash
cd client
npm install
```

#### Backend
```bash
cd ../server
npm install
```

### 3️⃣ Run the project

#### Frontend
```bash
npm start
```

#### Backend
```bash
node server.js
```

---

## 🧩 How It Works

- The frontend connects to the backend through **WebSocket channels**.  
- Each drawing action is sent as small packets to all connected users.  
- React renders updates instantly, ensuring real-time collaboration.  
- MongoDB handles user/session data through REST APIs.

---

## 🌟 Why CO-LAB?

- Simple, fast, and easy to use  
- Perfect for remote collaboration  
- Built as a student-friendly alternative to Miro/Jamboard  
- Highly extensible and developer-friendly  

---

## 📈 Future Enhancements

- Infinite Canvas  
- Color & Brush Customization  
- Real-time Chat  
- Authentication System  
- Export Board as PNG/PDF  
- Voice/Video Collaboration  

---

## 👨‍💻 Developer

**Nikhil Gothwal**  
Full-Stack Developer | MERN | React | Node.js

---

## ⭐ Feedback

If you like this project, consider giving it a ⭐ on GitHub!
