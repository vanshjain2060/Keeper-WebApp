import React,{ useState } from "react";
import LoginPage from "./LoginPage";

function Register (props) {
    const [isregister , setIsRegister] = useState(true)
    const[registerDetail , setRegisterDetail] = useState({
        email : "",
        password : ""
    })
    

    function handleRegister(event) {
        event.preventDefault();
        props.onRegister(registerDetail)
        setRegisterDetail(()=>{
            return{
                email : "",
                password : ""
            }
        })
    }


    function handleChange(event) {
        const {name , value} = event.target;
        setRegisterDetail((preValue) => {
            return {
                ...preValue , [name] : value
            };
        });
    }
    function handleToggle(event) {
        setIsRegister(!isregister);
    }

    return (
    <div>
    {isregister ? (<div className="login-container">
            <form onSubmit={handleRegister} className="login-form">
                <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    value={registerDetail.email}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text" 
                    placeholder="Password"
                    name="password"
                    value={registerDetail.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Register</button>
                
            </form>
        </div>) : (<LoginPage onLoginSubmit={props.onLoginSubmit}/>)}  
        <button onClick={handleToggle} className="btn">{isregister ? "Log In" : "Register"}</button>

    </div>
    )
}

export default Register;