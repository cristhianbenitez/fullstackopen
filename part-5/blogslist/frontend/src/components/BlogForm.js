import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await addBlog({ author, title, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form style={styles.form} onSubmit={handleOnSubmit}>
      <label style={styles.label}>
        Title
        <input
          id="title"
          placeholder="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label style={styles.label}>
        Author
        <input
          id="author"
          placeholder="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label style={styles.label}>
        Url
        <input
          id="url"
          placeholder="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button id="create-btn" type="submit">
        Create
      </button>
    </form>
  );
};

const styles = {
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '.25em',
    marginBottom: '.5sem'
  },
  form: {
    marginBottom: '2em'
  }
};

export default BlogForm;
