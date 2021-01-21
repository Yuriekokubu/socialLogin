import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../firebase';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
} from '@ant-design/icons';

function Login({ history }) {
  let dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.displayName,
          token: idTokenResult.token,
        },
      });
      toast.success('Login Success');
      history.push('/');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        console.log(result);
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.displayName,
            token: idTokenResult.token,
          },
        });
        toast.success(`Login Success Welcome ${user.displayName}`);

        history.push('/');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const LoginForm = () => (
    <>
      <Form name="normal_login" className="login-form" onSubmit={handleSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item className="mb-2">
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            icon={<MailOutlined />}
            className="login-form-button"
            onClick={handleSubmit}
            disabled={!email || password.length < 6}
            block
          >
            Log in with Email and Password
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="danger"
        htmlType="submit"
        shape="round"
        icon={<GoogleOutlined />}
        className="login-form-button mr-3 mb-3"
        onClick={googleLogin}
        block
      >
        Log in with Google
      </Button>
      Or <Link to="/register">Register</Link>
      <Link to="/forgot/password" className="float-right text-danger">
        Forgot Password
      </Link>
    </>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4>Loading....</h4> : <h4>Log In</h4>}
          {LoginForm()}
        </div>
      </div>
    </div>
  );
}

export default Login;
