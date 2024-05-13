import React, { FC } from "react";
import ExploreCoursesCard from "../../components/features/explore-courses-card/ExploreCoursesCard.component";

const Dashboard: FC = () => {
    return (
        <div className="flex flex-col gap-5 w-full">
            <h1 className="text-3xl">Glówny dashboard</h1>
            <ExploreCoursesCard />
        </div>
    )
}

export default Dashboard;