import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

import Container from 'react-bootstrap/Container';

export const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
};
