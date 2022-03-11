import { useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

export const UserInformation = () => {
  const allUser = useSelector((state) => state.users);
  const { id } = useParams();
  const user = allUser.find((user) => user.id === id);

  if (!user) {
    return <Navigate to="/users" replace={true} />;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <Badge bg="primary" className="my-3">
        <h3>added blogs</h3>
      </Badge>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id} as={Link} to={`/blogs/${blog.id}`}>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
