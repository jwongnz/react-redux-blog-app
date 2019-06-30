import React from 'react';
import { connect } from 'react-redux';
import styles from './blog-detail.module.scss';
import { AppState } from '../../store';
import { fetchBlog, likeBlog } from '../../store/blogs/actions';
import { fetchUser } from '../../store/users/actions';
import { NormalizedBlogsWithUsers, BlogWithUser } from '../../store/blogs/types';
import { RouteComponentProps } from 'react-router-dom';
import BlogsWithUsersSelector from '../../store/blogs/selectors';
import Header from '../../components/header/header';

interface MatchParams {
  blogId: string;
}

interface AppProps extends RouteComponentProps<MatchParams> {
  fetchBlog: any
  fetchUser: any
  likeBlog: typeof likeBlog
  blogsWithUsers: NormalizedBlogsWithUsers
}

class BlogDetail extends React.Component<AppProps> {
  blogId: number = Number(this.props.match.params.blogId);

   async componentDidMount() {
    // If blog is not in store, then fetch the blog
    if (!this.props.blogsWithUsers[this.blogId]) {
      await this.props.fetchBlog(this.props.match.params.blogId);
    }

    const blog = this.props.blogsWithUsers[this.blogId]

    // If user for the blog is not in store, then fetch the user
    if (!blog.user) {
      this.props.fetchUser(blog.userId);
    }
  }

  likeBlog = () => {
    this.props.likeBlog(this.props.match.params.blogId);
  }

  renderBody(blog: BlogWithUser) {
    if (!(blog))
      return <div className={styles.container}>Loading...</div>

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
        </div>

        <button type="button" className={styles.button} onClick={this.likeBlog}>
          {blog.isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
    )
  }

  render() {
    const blog = this.props.blogsWithUsers[this.blogId];
    const title = blog && blog.user && blog.user.name;
    const desc = blog && blog.user && blog.user.company && blog.user.company.name;

    return (
      <div className={styles.flexWrapper}>
        <Header title={title} desc={desc}/>
        {this.renderBody(blog)}
      </div>
    )
  };
}

const mapStateToProps = (state: AppState) => ({
  blogsWithUsers: BlogsWithUsersSelector(state)
});

const mapDispatchToProps = { fetchBlog, fetchUser, likeBlog };

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
