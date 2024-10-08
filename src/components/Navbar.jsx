import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/quotes">Home</Nav.Link>
            <Nav.Link href="/post">Posts</Nav.Link>
            <Nav.Link href="/postform">Create</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;