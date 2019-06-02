import React from 'react';
import styles from './footer.module.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const Footer: React.FC<RouteComponentProps> = (props) => {
  const links: string[] = ['About', 'Home', 'Privacy policy', 'About', 'Home', 'Privacy policy'];

  const renderLinks = () => {
    return links.map((link, index) =>
      <a className={styles.link} href="#" key={index}>{link}</a>
    );
  }

  return (
    <div className={styles.footerWrapper}>
      <div className={[styles.footer, props.location.pathname === '/' ? styles.marginForAd : ''].join(' ')}>
        {props.location.pathname === '/' &&
          <div className={styles.ad}>
            <h3>Addendum</h3>
            <p>Lorem ipsum blah blah annoying ad</p>
            <button type="button" className={styles.adButton}>Click here</button>
          </div>
        }
        <div className={styles.links}>
          {renderLinks()}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Footer);