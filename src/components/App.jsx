import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchpost = async () => {
      const response = await axios.get("http://localhost:8000/note");
      const data = await response.data;
      setNotes(data);
    };
    fetchpost();
  }, [notes]);

  async function addNote(newNote) {
    try {
      console.log("hello");
      const response = await axios.post("http://localhost:8000/note", {
        ...newNote,
      });
      const data = await response.data;
      console.log(data);
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id) {
    try {
      const response = await axios.delete(`http://localhost:8000/note/${id}`);
      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateNote(id, updatedNote) {
    try {
      await axios.patch(`http://localhost:8000/note/${id}`, {...updatedNote});
      
      const response = await axios.get("http://localhost:8000/note");
      setNotes(response.data); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="container">
        
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        );
      })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
