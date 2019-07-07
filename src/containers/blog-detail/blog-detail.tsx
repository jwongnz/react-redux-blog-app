import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './blog-detail.module.scss';
import { AppState } from '../../store';
import { fetchBlog, likeBlog } from '../../store/blogs/actions';
import { fetchUser } from '../../store/users/actions';
import { BlogWithUser } from '../../store/blogs/types';
import { RouteComponentProps } from 'react-router-dom';
import BlogsWithUsersSelector from '../../store/blogs/selectors';
import Header from '../../components/header/header';

interface MatchParams {
  blogId: string;
}

const BlogDetail: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const blogId = props.match.params.blogId;
  const blogsWithUsers = useSelector((state: AppState) => BlogsWithUsersSelector(state));
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const blog = blogsWithUsers[Number(blogId)];
  
      // If blog is not in store from previously fetching blog list, then fetch the blog
      if (!blog) {
        // pointless await just to show that you can async await with useEffect
        await dispatch(fetchBlog(props.match.params.blogId));
      }

      if (blog && !blog.user) {
        dispatch(fetchUser(blog.userId));
      }
    })();
  }, []);

  const renderBody = (blog: BlogWithUser) => {
    if (!(blog))
      return <div className={styles.container}>Loading...</div>

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
        </div>

        <button type="button" className={styles.button} onClick={() => { dispatch(likeBlog(blogId)) }}>
          {blog.isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
    )
  }

  const blog = blogsWithUsers[Number(blogId)];
  const title = blog && blog.user && blog.user.name;
  const desc = blog && blog.user && blog.user.company && blog.user.company.name;

  return (
    <div className={styles.flexWrapper}>
      <Header title={title} desc={desc}/>
      {renderBody(blog)}
    </div>
  )
}

export default BlogDetail;
