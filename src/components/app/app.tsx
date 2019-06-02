import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import styles from './app.module.scss';

import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import BlogList from '../../containers/blog-list/blog-list';
import BlogDetail from '../../containers/blog-detail/blog-detail';

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar/>
        <div className={styles.container}>
          <Route path="/" exact component={BlogList} />
          <Route path="/blog/:blogId" component={BlogDetail} />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
