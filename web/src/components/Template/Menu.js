import React from 'react';

import { Link } from 'react-router-dom';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { isAuthenticated } from "../../services/auth";

const Menu = () => 
    (
    <Navbar className="fixed-top" bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">paysys.tt</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    {isAuthenticated() && 
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to={"/"}>Débitos</Link>
          </li>
          <NavDropdown title="Cadastros" id="cadastros">
            <Link className="dropdown-item" to={"/payment-methods"}>Formas de Pagamento</Link>                
            <NavDropdown.Divider />
            <Link className="dropdown-item" to={"/establishments"}>Estabelecimentos</Link>          
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Sair</Link>
          </li>
        </Nav>
      </Navbar.Collapse>
    }
     
  </Navbar>
    
    );

export default Menu;