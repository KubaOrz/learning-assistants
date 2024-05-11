import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RoutingConstants } from "../../../routing/RoutingConstants";
import { Button, Navbar } from "flowbite-react";

const AuthenticationNavbar: FC = () => {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand>
                <Link to={RoutingConstants.STARTING}>
                    <img src="src/assets/logo.jpeg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Learning assistants</span> 
                </Link>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button className="bg-primary hover:bg-primary-hover">Get started</Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link>
                    <Link to={RoutingConstants.LOGIN}>
                        Zaloguj się
                    </Link>
                </Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AuthenticationNavbar;