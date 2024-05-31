import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import SaveIcon from '@mui/icons-material/Save';

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({
    title: props.title,
    content: props.content
  });

  function handleUpdate() {
    setIsEditing(true); // Set isEditing to true to show the editing form
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUpdatedNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleSave() {
    props.onUpdate(props.id, updatedNote);
    setIsEditing(false); // Set isEditing to false to hide the editing form
  }

  // Render either the editing form or the note content based on isEditing
  return (
    <>
      {isEditing ? (
        <div className="updatedNote">
          <input
            type="text"
            name="title"
            value={updatedNote.title}
            onChange={handleInputChange}
          />
          <textarea
            rows="5"
            name="content"
            value={updatedNote.content}
            onChange={handleInputChange}
          />
          <button onClick={handleSave}>
            <SaveIcon />
          </button>
        </div>
      ) : (
        <div className="note">
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={() => props.onDelete(props.id)}>
            <DeleteIcon />
          </button>
          <button onClick={handleUpdate}>
            <UpdateIcon />
          </button>
        </div>
      )}
    </>
  );
}

export default Note;
