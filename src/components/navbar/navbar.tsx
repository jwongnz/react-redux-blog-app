import React from 'react';
import styles from './navbar.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <Link to='/' className={styles.logoLink}>
        <img src={logo} className={styles.logo} alt="logo" />
      </Link>
      <a className={styles.signIn} href="#">Sign In</a>
    </div>
  );
}

export default Navbar;