import React from 'react';

import { Link } from 'react-router-dom';

import { isAuthenticated } from "../../services/auth";

const Navbar = () => 
    (<nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
        <Link className="navbar-brand" to={"/"}>paysys.tt</Link>
        {isAuthenticated() && 
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link className="nav-link" to={"/"}>Débitos</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/payment-methods"}>Formas de Pagamento</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/establishments"}>Estabelecimentos</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Sair</Link>
                </li>
            </ul>
            </div>
        }          
        </div>
    </nav>);

export default Navbar;