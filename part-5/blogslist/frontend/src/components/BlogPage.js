import React, { useEffect, useRef, useState } from 'react';
import Blog from './Blog';
import Notification from './Notification';
import Togglable from './Toggable';
import blogService from '../services/blogs';
import BlogForm from './BlogForm';

const BlogPage = ({ user }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const noteFormRef = useRef();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogOut = async () => {
    await localStorage.removeItem('loggedUser');
    window.location.reload();
  };

  const addBlog = async ({ author, title, url }) => {
    try {
      const newBlog = await blogService.create({ author, title, url });
      setBlogs(blogs.concat(newBlog));
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBlog = async (blogId, updatedBlog) => {
    try {
      const modifiedBlog = await blogService.update(blogId, updatedBlog);
      setBlogs(blogs.map((blog) => (blog.id !== blogId ? blog : modifiedBlog)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (blogId) => {
    const { title, author } = blogs.find((blog) => blog.id === blogId);
    if (window.confirm(`Remove ${title} by ${author}`)) {
      try {
        await blogService.deleteOne(blogId);
        const filteredBlogs = blogs.filter((blog) => blog.id !== blogId);
        setBlogs(filteredBlogs);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const sortedBlogs = blogs.concat().sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Notification message={{ successMessage }} />
      <h1>Blogs</h1>

      <p style={styles.loggedIn}>
        {user.name} logged in <button onClick={handleLogOut}>Log Out</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <h2>Create new blog</h2>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      <section id="blogs-list">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </section>
    </>
  );
};

const styles = {
  loggedIn: { color: 'green' }
};

export default BlogPage;
