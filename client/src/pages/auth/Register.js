import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { Input } from 'antd';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.dark(
      ` 🦄 Email is sent to ${email}. Click link to complete your registration.`
    );
    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        className="form-control"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Your Email"
      />
      <button type="submit" className="btn btn-raised mt-5">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
