import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [show, setShow] = useState(true);

  const toggle = () => setShow(!show);

  const visibility = { display: show ? 'none' : 'block' };

  const handleAddLike = () => {
    const blogId = blog.id;
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    updateBlog(blogId, updatedBlog);
  };

  const handleDelete = () => {
    deleteBlog(blog.id);
  };

  return (
    <div style={styles.container} id="blog-item">
      <span className="blog-title">
        {blog.title} by {blog.author}
        <button className="visibility-toggler" onClick={toggle}>
          {show ? 'show' : 'hide'}
        </button>
      </span>
      <br />
      <div className="hidden-element" style={visibility}>
        <span style={styles.span}>{blog.url}</span>
        <span style={styles.likes} id="likes">
          <span>{blog.likes}</span>
          <button className="like-handler" onClick={handleAddLike}>
            like
          </button>
        </span>
        <span style={styles.span}>{blog.author}</span>
        <button onClick={handleDelete} className="delete-handler">
          delete blog
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: 10,
    border: 'solid',
    borderWidth: 1
  },
  span: {
    display: 'block',
    marginBottom: 5
  },
  likes: {
    display: 'flex',
    gap: 2
  }
};

export default Blog;
