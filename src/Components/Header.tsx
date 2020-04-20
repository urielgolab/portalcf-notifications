import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { NotificationBadge } from '../Notification/NotificationBadge';

interface HeaderProps { 
    Title: string; 
    onFilterText: (e:any) => void;
}

export class Header extends React.Component<HeaderProps, {}> {
    
    render() {
        return(
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{this.props.Title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/" className={'nav-link'}>Notificaciones</NavLink>
                    <NavLink to="/post" className={'nav-link'}>Nueva</NavLink>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <Form inline>
                    <NotificationBadge />
                    <FormControl type="text" placeholder="Buscar" className="mr-sm-2" onChange={ this.props.onFilterText } />
                    <Button variant="outline-info">Buscar</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}


