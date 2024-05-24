import { Card } from "flowbite-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { RoutingConstants } from "../../../routing/RoutingConstants";

const ManageCoursesCard: FC = () => {
    return (
        <Link to={RoutingConstants.COURSE_MANAGEMENT} className="w-fit">
            <Card 
                className="max-w-sm hover:bg-base-100" 
                renderImage={() => <img className="h-64 object-cover" src="https://pod.uj.edu.pl/documents/145563174/0/Navoica2.jpg/96cb7127-a5db-4f1b-9bc7-001458b48d7c?t=1696318063398" alt="image 1" />}
            >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Zarządzaj swoimi kursami
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Dodawaj kursy jako autor i podziel się swoją wiedzą
                </p>
            </Card>
        </Link>
    )
}

export default ManageCoursesCard;