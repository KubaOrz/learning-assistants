import { Card } from "flowbite-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { RoutingConstants } from "../../../routing/RoutingConstants";

const ExploreCoursesCard: FC = () => {
    return (
        <Link to={RoutingConstants.COURSE_LIST} className="w-fit">
            <Card className="max-w-sm hover:bg-base-100" imgSrc="/src/assets/course_list_card.jpeg">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Sprawdź kursy
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Przeszukaj listę kursów, aby znaleźc to, co najbardziej Cię interesuje
                    </p>
            </Card>
        </Link>
    )
}

export default ExploreCoursesCard;