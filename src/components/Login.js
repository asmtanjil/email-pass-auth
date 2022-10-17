import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const Login = () => {

  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  const handleEmailBlur = event => {
    const email = event.target.value;
    setUserEmail(email);
    console.log(email)

  }

  const resetPassword = () => {
    if (!userEmail) {
      alert('Please Enter your Registered Email Address');
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
      .catch((error) => {
        console.error('error', error)
      })
    alert('Reset Link Sent to your Email')
  }

  return (
    <div className='w-50 mx-auto'>
      <h2 className='text-primary'>Please Login Here...!!!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailBlur} name='email' type="email" placeholder="Enter email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" required />
        </Form.Group>
        {success && <p className='text-success'>Logged In Successfully</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <p><small>Forgot your password? Please <button onClick={resetPassword} type="button" className="btn btn-link">Reset Password</button></small></p>

      <p><small>New to this Website? Please <Link to='/register'>Register</Link></small></p>
    </div>
  );
};

export default Login;