import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  CheckCircleOutlined,
  LoginOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Header = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });

    history.push('/login');
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {!user && (
        <Menu.Item
          style={{ float: 'right' }}
          key="login"
          icon={<LoginOutlined />}
        >
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item
          style={{ float: 'right' }}
          key="register"
          icon={<CheckCircleOutlined />}
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}

      {user && (
        <SubMenu
          style={{ float: 'right' }}
          key="SubMenu"
          icon={<UserOutlined />}
          title={user.displayName}
        >
          <Menu.Item key="setting:1">Edit</Menu.Item>
          <Menu.Item key="logout" icon={<LoginOutlined />} onClick={logout}>
            Log out
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
