import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllUsers } from '../reducers/usersSlice';

import Table from 'react-bootstrap/Table';
import { getBlogs } from '../reducers/blogSlice';

export const UsersList = () => {
  const allUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getBlogs());
  }, []);

  return (
    <>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>Author</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={user.id}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
