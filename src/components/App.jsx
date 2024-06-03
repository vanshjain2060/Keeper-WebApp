import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Register from "./Register";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  const axiosInstance = axios.create({
    baseURL: 'https://keeper-webapp-server-1.onrender.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true // Optional: Only needed if your backend requires credentials
  });

  useEffect(() => {
    // Fetch notes if user is logged in
    const fetchNotes = async () => {
      try {
        const notesResponse = await axiosInstance.get(`/user/${userId}/note`);
        setNotes(notesResponse.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    if (isLoggedIn) {
      fetchNotes();
    }
  }, [isLoggedIn, userId]);

  async function registerUser(userDetail) {
    try {
      const response = await axiosInstance.post(`/register`, userDetail);
      const id = response.data; // response contains the userId
      setUserId(id);
      setIsLoggedIn(!!id);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  async function loginUser(loginDetail) {
    try {
      const response = await axiosInstance.post(`/login`, loginDetail);
      const id = response.data;
      setUserId(id);
      setIsLoggedIn(!!id);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  async function addNote(newNote) {
    try {
      const response = await axiosInstance.post(`/user/${userId}/note`, newNote);
      setNotes(response.data);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async function deleteNote(noteId) {
    try {
      const response = await axiosInstance.delete(`/user/${userId}/note/${noteId}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  async function updateNote(noteId, updatedNote) {
    try {
      const response = await axiosInstance.patch(`/user/${userId}/note/${noteId}`, updatedNote);
      setNotes(response.data);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  function handleLogOut(event) {
    event.preventDefault();
    setIsLoggedIn(false);
    setUserId("");
    setNotes([]);
  }

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
                index={index}
                id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
                onUpdate={updateNote}
              />
            ))}
          </div>
          <form onSubmit={handleLogOut}>
            <button className="btn">Log out</button>
          </form>
        </>
      ) : (
        <Register
          onRegister={registerUser}
          onLoginSubmit={loginUser}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
