import React from 'react';
import { getAuth } from 'firebase/auth'
import app from '../firebase/firebase.init'

const auth = getAuth(app);

const Register = () => {

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    console.log(form.email.value)
    console.log(form.password.value)
  }
  const handleEmail = event => {
    console.log(event.target.value);
  }
  const handlePassword = event => {
    console.log(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input onBlur={handleEmail} type="email" name="email" id="" placeholder='Your Email' />
        <br />
        <input onBlur={handlePassword} type="password" name="password" id="" placeholder='Your Password' />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;