import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // function submitNote(event) {
  //   props.onAdd(note);
  //   setNote(() => {
  //     return {
  //       title: "",
  //       content: "",
  //     };
  //   });
  //   event.preventDefault();
  // }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button
          onClick={(event) => {
            props.onAdd(note);
            event.preventDefault();
            setNote(() => {
              return {
                title: "",
                content: "",
              };
            });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;