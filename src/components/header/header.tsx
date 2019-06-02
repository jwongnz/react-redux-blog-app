import React from 'react';
import goku from '../../assets/goku.jpg';
import styles from './header.module.scss';

interface AppProps {
  title?: string | null
  desc?: string | null
}

const Header: React.FC<AppProps> = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerText}>
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      </div>
      <img  src={goku} alt="goku" className={styles.image}></img>
    </header>
  );
}

export default Header;