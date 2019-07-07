import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import styles from './blog-list.module.scss';
import { AppState } from '../../store';
import { fetchBlogs } from '../../store/blogs/actions';
import { Link } from 'react-router-dom';
import Header from '../../components/header/header'
import { Blog } from '../../store/blogs/types'

const BlogList: React.FC = () => {
  const [numberOfBlogsShowing, setNumberOfBlogsShowing] = useState(10);
  const blogs = useSelector((state: AppState) => Object.keys(state.blogs).map(key => state.blogs[Number(key)]), shallowEqual);
  const dispatch = useDispatch();

  // TODO: Get linter to stop complaining about missing dependency when trying to use empty array as 2nd param
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const renderBlog = (blog: Blog) => {
    return  <li key={blog.id}>
              <Link to={`/blog/${blog.id}`} className={[styles.link, blog.isLiked ? styles.likedBlog : ''].join(' ')}>
                <h4>{blog.title}</h4>
                <p>{blog.body}</p>
              </Link>
            </li>;
  }

  const showMore = () => {
    // showMore just shows more instead of fetching, we fetch all blogs on the first load.
    // it's because it's just a code test and the API doesn't support take/skip params.
    setNumberOfBlogsShowing(state => state + 10);
  }

  if (!(blogs && blogs.length > 0)) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div>
      <Header title='Welcome to the blog'
              desc={`Ballast league Davy Jones' Locker crow's nest skysail case shot no prey, no pay come about trysail tackle. Black spot spirits reef sails prow barkadeer scourge of the seven seas brigantine lateen sail list long clothes. Quarter killick crow's nest trysail spyglass log Privateer gaff chantey wherry.`} />
      <ul className={styles.blogList}>
        {blogs.slice(0, numberOfBlogsShowing).map(blog => renderBlog(blog))}
      </ul>
      {(numberOfBlogsShowing < blogs.length) &&
        <button type="button" className={styles.button} onClick={showMore}>Show more</button>}
    </div>
  )
}

export default BlogList;