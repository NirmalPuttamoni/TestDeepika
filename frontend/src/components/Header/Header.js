import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../actions/userActions';
import { useEffect } from 'react';

const Header = ({setSearch}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/")
  };

  useEffect(() => {}, [userInfo]);



  return (
    


    <Navbar expand="lg" className="bg-body-tertiary" bg="primary" variant="dark">
      <Container fluid>
        <Navbar.Brand >
          <Link to="/">
          NoteZipper
          </Link>
          
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className='m-auto'>
            <Form className="d-flex ms-auto">

<Form.Control
  type="search"
  placeholder="Search"
  className="me-2"
  aria-label="Search"
  onChange={(e) => setSearch(e.target.value)}
  />

</Form>
            </Nav>
            {userInfo ?(
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          
            <Nav.Link href="/mynotes">
              <Link to="/mynotes">
              My Notes
              </Link>
              
             </Nav.Link>
             <NavDropdown title={userInfo ? userInfo.name : 'User'} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
             
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
             
            </NavDropdown>
           

          </Nav>
            ):(
              <Nav.Link href="/login">Login</Nav.Link>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}




export default Header