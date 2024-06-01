import React, { useState } from 'react';

function LoginPage(props){
  const [loginDetails, setloginDetails] = useState({
    email : "",
    password: ""
  });
  

  function handleChange(event) {
    const {name , value} = event.target;
    setloginDetails((prevValue) => {
        return {
            ...prevValue , 
            [name] : value
        }
    })
  }

  function handleLogin(event) {
    event.preventDefault();
    props.onLoginSubmit(loginDetails);
    setloginDetails(() => {
        return {
            email : "",
            password: ""
        }
    })
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginDetails.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name='password'
          placeholder="Password"
          value={loginDetails.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default LoginPage;
