import * as React from "react";
import { NavLink } from "react-router-dom";
import {
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem
} from "reactstrap";
import AppContext from "~/components/AppContext";

interface AppNavbarProps {
    isNavbarOpen: boolean;
    toggleNavbar?: () => void;
}

const AppNavbar = ({ isNavbarOpen, toggleNavbar }: AppNavbarProps) => (
    <Navbar dark={true} color="dark" expand="sm">
        <Container>
            <Collapse navbar={true} isOpen={isNavbarOpen}>
                <Nav className="mr-auto" navbar={true}>
                    <NavItem>
                        <NavLink className="nav-link" exact={true} to="/">
                            Fazenda VerdeViva
                        </NavLink>
                    </NavItem>
                    <NavbarToggler onClick={toggleNavbar} />
                    <NavItem>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/counter">
                            Counter
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Container>
    </Navbar>
);

export default () => (
    <AppContext.Consumer>{(app) => <AppNavbar {...app} />}</AppContext.Consumer>
);
