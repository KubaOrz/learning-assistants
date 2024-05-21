import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RoutingConstants } from "../../../routing/RoutingConstants";
import { Button, Navbar } from "flowbite-react";
import { LuUser } from "react-icons/lu";

const AuthenticatedNavbar: FC = () => {
    return (
        <Navbar fluid rounded className="bg-primary-light sticky top-0 z-10">
            <Link to={RoutingConstants.STARTING}>
                <Navbar.Brand>
                    <img src="src/assets/logo.jpeg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Learning assistants</span>
                </Navbar.Brand>
            </Link>

            <div className="flex md:order-2 gap-2">
                <Link to={RoutingConstants.REGISTER}>
                    <Button color="secondary" className="flex justify-center items-center text-center">
                        <LuUser className="mr-2" />
                        Twój profil
                    </Button>
                </Link>
                <Link to={RoutingConstants.LOGIN}>
                    <Button color="primary">Wyloguj</Button>

                </Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link>
                    <Link to={RoutingConstants.STARTING}>
                        <span className="text-white hover:text-gray-800">Strona główna</span>
                    </Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to={RoutingConstants.STARTING}>
                        <span className="text-white hover:text-gray-800">Nasze kursy</span>
                    </Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to={RoutingConstants.COURSE_MANAGEMENT}>
                        <span className="text-white hover:text-gray-800">Twoje kursy</span>
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AuthenticatedNavbar;