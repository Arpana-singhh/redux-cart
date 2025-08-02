import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Badge, Space } from 'antd';
export default function NavBarPanel() {
    // jo store mai naam reducers ka liya hai wahi lena
    const cartProducts = useSelector(state => state.cart);
  return (
    <div>
       <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Pro-Products</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto">
            <Nav.Link to="/" as={Link}>Products</Nav.Link>
         </Nav>
        <Navbar.Text>
        
        <Nav.Link to="/cart" as={Link} className="shopping-cart"><FontAwesomeIcon className="shop" icon={faCartShopping} /><sup><Badge count={cartProducts.length}></Badge></sup></Nav.Link>

           
        </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
