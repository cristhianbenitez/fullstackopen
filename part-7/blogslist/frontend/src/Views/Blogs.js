import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Toggleable, BlogForm } from '../components';
import { getBlogs } from '../reducers/blogSlice';

import ListGroup from 'react-bootstrap/ListGroup';

export const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const noteFormRef = useRef();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const sortedBlogs = blogs.concat().sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Welcome to Blog App!!</h2>
      <Toggleable buttonLabel="create new blog" ref={noteFormRef}>
        <h2>Create new blog</h2>
        <BlogForm />
      </Toggleable>
      <ListGroup>
        {sortedBlogs.map((blog) => (
          <ListGroup.Item key={blog.id} as={Link} to={`/blogs/${blog.id}`}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
//  <div key={blog.id}>
//    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
//  </div>;
