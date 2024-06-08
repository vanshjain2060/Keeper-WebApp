import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import LoginPage from "./LoginPage";
import Register from "./Register";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId ,setuserId] = useState("")


  useEffect(() => {
    // Fetch notes if user is logged in
    const fetchNotes = async () => {
      try {
        const notesResponse = await axios.get(`http://localhost:8000/user/${userId}/note`);
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
      const response = await axios.post(`http://localhost:8000/register`, userDetail);
      const id = response.data; // response contains the userId
      setuserId(id);
      setIsLoggedIn(id);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

 async function loginUser(loginDetail) {
  try {
    const response = await axios.post(`http://localhost:8000/login`, loginDetail);
    const id = response.data; 
    setuserId(id);
    setIsLoggedIn(id);
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

  async function addNote(newNote) {
    try {
      const response = await axios.post(`http://localhost:8000/user/${userId}/note`, newNote);
      setNotes(response.data);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async function deleteNote(noteId) {
    console.log(userId);
    console.log(noteId);
    try {
      const response = await axios.delete(`http://localhost:8000/user/${userId}/note/${noteId}`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  async function updateNote(noteId, updatedNote) {
    try {
      const response = await axios.patch(`http://localhost:8000/user/${userId}/note/${noteId}`, updatedNote);
      setNotes(response.data);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  async function handleLogOut() {
    try {
        const response = await axios.post("http://localhost:8000/logout");
        const id = response.data; 
        setuserId(id);
        setIsLoggedIn(id);
    } catch (error) {
        console.error("Error: ", error);
    }
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
          <button onClick={handleLogOut} className="btn">Log out</button>          
        </>
      ) : (
        <Register onRegister={registerUser}
          onLoginSubmit={loginUser}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
