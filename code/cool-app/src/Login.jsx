import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import {CookiesProvider, useCookies} from 'react-cookie'
import './Login.css'
function Login() {
  const [cookies, setCookie] = useCookies(['user'])
  const navigate = useNavigate();
  
  const loginAccount = "http://localhost:3000/loginAccount"

  const [email, setEmail] = useState('');
  const [pawd, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [userInput, setInput] = useState('');

  const confLogin = (event) => {
    event.preventDefault();
    const form = event.target.form;
    if(!form.checkValidity()){
      alert("Please fill in the required field!");
      return;
    }
      const params = new URLSearchParams();

      params.append('email', email);
      params.append('pawd', pawd);

      fetch(loginAccount, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      }).then(response => {
        if(response.status == 400){
          alert("Error: Missing field");
          return false;
        }
        else if(response.status == 401){
          alert("User not found!");
          return false;
        }
        else if(response.status == 402){
          alert("Incorrect password!");
          return false;
        }
        else if(response.status = 500){
          alert("Internal Server Error!")
          return false;
        }
        else if(!response.ok){
          alert("Server is not responding.");
          return false;
        }
        return response.json();
      }).then(data => {
        if(data){
          console.log('Success', data);
          alert("Login successful");
          setCookie('user', {data: data, isUser: true}, {path: '/'});
          navigate("/home");
        }
      }).catch(() => {
        alert("Server not responding.");
      });
    };

    return (
    <div className="container">
      <h1>All You Can Rent</h1>
      <h2>Login to AYCR</h2>
      <div className="or-divider">————</div>
      <form onSubmit={confLogin}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={pawd}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signin-btn" onClick={confLogin}>Sign In</button>
      </form>
      <div className="register-forgot">
        <button className="register-btn" onClick={() => navigate("/Register")}>Register</button>
        <button className="forgot-btn">Forget Password?</button>
      </div>
    </div>
    );
  }

export default Login;
