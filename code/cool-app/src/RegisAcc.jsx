import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
import {useNavigate} from 'react-router-dom'
// import viteLogo from '/vite.svg'
import '../src/RegisAcc.css'

function Regis() {
  const [count, setCount] = useState(0)
  const createAccount = "http://localhost:3000/createAccount"
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phonum, setPhoneNum] = useState('');
  const [pawd, setPassword] = useState('');
  const [pawdconf, setPasswConf] = useState('');
  const [loading, setLoading] = useState(true);

  const confCreateAcc = (event) => {
    event.preventDefault();
    const form = event.target.form;
    if(!form.checkValidity()){
      alert("Please fill in the required field!");
      return;
    }
      const params = new URLSearchParams();

      params.append('firstname', firstname);
      params.append('lastname', lastname);
      params.append('email', email);
      params.append('phonum', phonum);
      params.append('pawd', pawd);
      if(pawd !== pawdconf){
          alert("Passwords do not match!");
          return;
      }

      fetch(createAccount, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      }).then(response => {
        if(response.status == 400){
          alert("Error: Email already used");
          return false;
        }
        else if(response.status == 500){
          alert("Internal Server Error!");
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
          alert("Account created successfully.");
          navigate("/");  //ini maksudnya apa ini navigate ke /?
        }
      }).catch(() => {
        alert("Server not responding.");
      });
    };

    return (
        <div className="container">
            <h1>Search and Click — All You Can Rent</h1>
            <h2>Create Account</h2>
{/*             <div className="social-login">
                <button className="google">Sign up with Google</button>
                <button className="email">Sign up with Email</button>
            </div> */}
            <div className="or">————</div>
            <form onSubmit={confCreateAcc}>
                <div className="form-group">
                    <input type="text" placeholder="First Name" value={firstname} onChange={e => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" value={lastname} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="tel" placeholder="Phone Number" value={phonum} onChange={e => setPhoneNum(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={pawd} onChange={e => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" value={pawdconf} onChange={e => setPasswConf(e.target.value)} />
                </div>
                <button type="submit" className="create-account" onClick={confCreateAcc}>Create Account</button>
            </form>
            <div className="login-link">Already have an account? <a href="/login">Login</a></div>
        </div>
    );
  }

export default Regis;
