import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RoutingConstants } from "../../routing/RoutingConstants";
import StartingCarousel from "../../components/features/starting-page/StartingCarousel.component";

const StartingPage: FC = () => {
    return (
        <div>
            <div>
                <Link to={RoutingConstants.LOGIN}>
                    <button className="bg-primary text-white p-2 rounded-md">Zaloguj się</button>
                </Link>
            </div>
            <div>
                <Link to={RoutingConstants.REGISTER}>
                    <button className="bg-secondary text-dark p-2 rounded-md">Załóż konto</button>
                </Link>
            </div>
            <StartingCarousel />
        </div>
    )
}

export default StartingPage;