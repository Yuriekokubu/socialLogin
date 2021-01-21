import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { Input } from 'antd';

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for password reset link');
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const forgotpasswordForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        className="form-control"
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Your Email"
      />
      <button type="submit" className="btn btn-raised mt-5">
        OK
      </button>
    </form>
  );

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading.....</h4> : <h4>Forgot Password</h4>}
      {forgotpasswordForm()}
    </div>
  );
};

export default ForgotPassword;
