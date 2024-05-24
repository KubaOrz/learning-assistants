import React, { FC } from "react";
import ExploreCoursesCard from "../../components/features/dashboard-cards/ExploreCoursesCard.component";
import ManageCoursesCard from "../../components/features/dashboard-cards/ManageCoursesCard.component";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dashboard: FC = () => {
    const userData = useSelector((state: RootState) => state.authentication.authData?.user);

    return (
        <div className="flex flex-col gap-5 w-full">
            <h1 className="text-4xl mb-6">Witaj {userData?.firstName} {userData?.lastName}</h1>
            <div className="flex flex-row gap-5">
                <ExploreCoursesCard  />
                <ManageCoursesCard />
            </div>
        </div>
    )
}

export default Dashboard;