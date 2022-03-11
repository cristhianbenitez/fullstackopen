import { Navigate, useParams } from 'react-router-dom';
import { Blog } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addNewComment, updateOneBlog } from '../reducers/blogSlice';
import { useField } from '../hooks/useField';

import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const IndividualBlog = () => {
  const { reset, ...comment } = useField('text');
  const { id } = useParams();

  const blogs = useSelector((state) => state.blogs);
  const currentBlog = blogs.find((blog) => blog.id === id);

  const dispatch = useDispatch();

  const handleAddLike = () => {
    const updatedBlog = {
      ...currentBlog,
      likes: currentBlog.likes + 1,
    };
    dispatch(updateOneBlog(id, updatedBlog));
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    dispatch(addNewComment(id, comment.value));
    reset();
  };

  if (!currentBlog) {
    return <Navigate to={-1} replace={true} />;
  }

  return (
    <>
      <section className="mb-5">
        <Blog blog={currentBlog} handleLike={handleAddLike} />
      </section>
      <section>
        <Form onSubmit={handleAddComment}>
          <h2>Comments</h2>
          <div className="d-flex w-25 ">
            <Form.Control type="text" className="mr-2" {...comment} />
            <Button type="submit" variant="primary">
              add
            </Button>
          </div>
        </Form>

        <ListGroup variant="flush" className="mt-3">
          {currentBlog.comments.map(({ _id, body, author }) => (
            <ListGroup.Item key={_id}>
              {body} by {author}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </section>
    </>
  );
};
