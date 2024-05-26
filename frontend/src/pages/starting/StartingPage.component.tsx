import React, { FC } from "react";
import { Link } from "react-router-dom";
import { RoutingConstants } from "../../routing/RoutingConstants";
import StartingCarousel from "../../components/features/starting-page/StartingCarousel.component";
import { Button } from "flowbite-react";
import SignInCard from "../../components/features/starting-page/SignInCard.component";
import CreateAccountCard from "../../components/features/starting-page/CreateAccountCard.component";

const StartingPage: FC = () => {
    return (
        <div className="flex flex-col gap-5 w-full">
            <StartingCarousel />
            <div className="flex flex-col gap-5">
                <SignInCard />
                <CreateAccountCard />
            </div>

        </div>
    )
}

export default StartingPage;