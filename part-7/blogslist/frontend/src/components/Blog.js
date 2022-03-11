import Button from 'react-bootstrap/Button';

export const Blog = ({ blog, handleLike }) => {
  const link = blog.url.includes('http') ? blog.url : `//${blog.url}`;

  return (
    <div id="blog-item">
      <h2 className="blog-title">
        {blog.title} by {blog.author}
      </h2>
      <br />
      <a href={link}>{blog.url}</a>
      <span id="likes" className="d-inline-block mb-3">
        <span style={{ marginRight: '1em' }}>{blog.likes} likes</span>
        <Button className="like-handler" onClick={handleLike}>
          like
        </Button>
      </span>
      <span style={styles.span}>added by {blog.author}</span>
    </div>
  );
};

const styles = {
  span: {
    display: 'block',
    marginBottom: 5,
  },
  likes: {
    display: 'flex',
    gap: 2,
  },
};
