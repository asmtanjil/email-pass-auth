import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init'
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const RegisterReactBootstrap = () => {
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = event => {
    event.preventDefault();
    setSuccess(false)

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);


    // Password Validation

    if (!/^(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError('Please provide at least Two UpperCase Letter');
      return
    }
    if (password.length < 6) {
      setPasswordError('Your password should be at least 6 characters');
      return
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError('Please add at least one special symbol');
      return
    }
    setPasswordError("")


    // Create User.....!!!!!!!!! 

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        emailVerify();
        updateUserName(name);
      })
      .catch(error => {
        console.error('error', error);
        setPasswordError(error.message)
      })
  }
  const emailVerify = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Please Check inbox and verify your account as a new member")
      })
  }

  const updateUserName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('Display Name Updated')
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className='w-50 mx-auto'>
      <h2 className='text-primary'>Please Register Here...!!!</h2>
      <Form onSubmit={handleRegister}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control name='name' type="text" placeholder="Enter Your Name" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" required />
        </Form.Group>

        <p className='text-danger'>{passwordError}</p>

        {success && <p className='text-success'>User Created Successfully</p>}

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
    </div>
  );
};

export default RegisterReactBootstrap;