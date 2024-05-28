import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.img} alt="avatar_img" />
      <p>{props.tel}</p>
      <p>{props.email}</p>
    </div>
  )
}

ReactDOM.render(<App /> , document.getElementById("root"));
