import { useDispatch } from 'react-redux';
import { useField } from '../hooks/useField';
import { createNewBlog } from '../reducers/blogSlice';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const BlogForm = () => {
  const { reset: titleReset, ...title } = useField('text');
  const { reset: authorReset, ...author } = useField('text');
  const { reset: urlReset, ...url } = useField('text');

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { author: author.value, title: title.value, url: url.value };
    dispatch(createNewBlog(newBlog));
    titleReset();
    authorReset();
    urlReset();
  };

  return (
    <Form style={styles.form} onSubmit={handleOnSubmit} className="w-25 ">
      <Form.Label style={styles.label}>
        Title
        <Form.Control id="title" placeholder="Title" {...title} />
      </Form.Label>
      <Form.Label style={styles.label}>
        Author
        <Form.Control id="author" placeholder="Author" {...author} />
      </Form.Label>
      <Form.Label style={styles.label}>
        Url
        <Form.Control id="url" placeholder="Url" {...url} />
      </Form.Label>
      <Button id="create-btn" type="submit">
        Create
      </Button>
    </Form>
  );
};

const styles = {
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '.25em',
    marginBottom: '.5sem',
  },
  form: {
    marginBottom: '2em',
  },
};
