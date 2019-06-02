import React from 'react';
import { connect } from 'react-redux';
import styles from './blog-list.module.scss';
import { AppState } from '../../store';
import { fetchBlogs } from '../../store/blogs/actions';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header'

import { Blog } from '../../store/blogs/types'

interface AppProps {
  fetchBlogs: typeof fetchBlogs
  blogs: Blog[]
}

interface State {
  numberOfBlogsShowing: number
}

class BlogList extends React.Component<AppProps, State> {
  state = { numberOfBlogsShowing: 10 };

  componentDidMount() {
    this.props.fetchBlogs();
  }

  renderBlog(blog: Blog) {
    return  <li key={blog.id}>
              <Link to={`/blog/${blog.id}`} className={[styles.link, blog.isLiked ? styles.likedBlog : ''].join(' ')}>
                <h4>{blog.title}</h4>
                <p>{blog.body}</p>
              </Link>
            </li>;
  }

  showMore = () => {
    this.setState((state) => ({...state, numberOfBlogsShowing: state.numberOfBlogsShowing + 10}));
  }

  render() {
    if (!(this.props.blogs && this.props.blogs.length > 0)) {
      return <div className={styles.loading}>Loading...</div>;
    }

    return (
      <div>
        <Header title='Welcome to the blog'
                desc={`Ballast league Davy Jones' Locker crow's nest skysail case shot no prey, no pay come about trysail tackle. Black spot spirits reef sails prow barkadeer scourge of the seven seas brigantine lateen sail list long clothes. Quarter killick crow's nest trysail spyglass log Privateer gaff chantey wherry.`} />
        <ul className={styles.blogList}>
          {this.props.blogs.slice(0, this.state.numberOfBlogsShowing).map(blog => this.renderBlog(blog))}
        </ul>
        {(this.state.numberOfBlogsShowing < this.props.blogs.length) &&
          <button type="button" className={styles.button} onClick={this.showMore}>Show more</button>}
      </div>
    )
  };
}

const mapStateToProps = (state: AppState) => ({
  blogs: Object.keys(state.blogs).map(key => state.blogs[Number(key)])
});

const mapDispatchToProps = { fetchBlogs };

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
