import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Register from "./Register";
import LoginPage from "./LoginPage";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8000/checkLoggedIn", { withCredentials: true });
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUserId(response.data.userId);
          fetchNotes(response.data.userId);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedInStatus();
  }, []);

  const fetchNotes = async (userId) => {
    try {
      const notesResponse = await axios.get(`http://localhost:8000/user/${userId}/note`, { withCredentials: true });
      setNotes(notesResponse.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const registerUser = async (userDetail) => {
    try {
      const response = await axios.post(`http://localhost:8000/register`, userDetail, { withCredentials: true });
      setUserId(response.data.userId);
      setIsLoggedIn(true);
      fetchNotes(response.data.userId);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const loginUser = async (loginDetail) => {
    try {
      const response = await axios.post(`http://localhost:8000/login`, loginDetail, { withCredentials: true });
      setUserId(response.data.userId);
      setIsLoggedIn(true);
      fetchNotes(response.data.userId);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await axios.post(`http://localhost:8000/user/${userId}/note`, newNote, { withCredentials: true });
      setNotes(response.data);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:8000/user/${userId}/note/${noteId}`, { withCredentials: true });
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async (noteId, updatedNote) => {
    try {
      const response = await axios.patch(`http://localhost:8000/user/${userId}/note/${noteId}`, updatedNote, { withCredentials: true });
      setNotes(response.data);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserId("");
      setNotes([]);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <Header />
      {isLoggedIn ? (
        <>
          <CreateArea onAdd={addNote} />
          <div className="container">
            {notes.map((noteItem, index) => (
              <Note
                key={index}
                id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
                onUpdate={updateNote}
              />
            ))}
          </div>
          <button onClick={handleLogout} className="btn">Log out</button>
        </>
      ) : (
        <Register onRegister={registerUser} onLoginSubmit={loginUser} />
      )}
      <Footer />
    </div>
  );
}

export default App;
