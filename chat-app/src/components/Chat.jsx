// src/components/Chat.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Chat() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      const displayName = user.email.split("@")[0];
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        uid: user.uid,
        displayName: displayName,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="chatbox-container">
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.displayName}:</strong> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="textarea"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
