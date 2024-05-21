import { FC } from "react";
import { Course } from "../../../../api/dto/courses/courses.types";
import { ListGroup } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { RoutingConstants } from "../../../../routing/RoutingConstants";

type CourseListItemProps = {
    course: Course;
}

const CourseManagementListItem: FC<CourseListItemProps> = ({ course }) => {
    const navigate = useNavigate();

    return (
        <ListGroup.Item onClick={() => navigate(RoutingConstants.COURSE_CREATION_DETAILS)}>
            <div className="flex flex-row gap-5">
                <div>
                    <img src={course.thumbnail} className="w-40 aspect-square object-cover rounded-md" />
                </div>
                <div className="flex flex-col text-left gap-1">
                    <p className="text-lg">{course.title}</p>
                    <hr className="mb-3" />
                    <p className="text-md mb-2">{course.shortDescription}</p>
                    <p className="text-md">Dodano: {(new Date(course.createdAt)).toLocaleDateString()}</p>
                    <p className="text-md">Czas trwania: {course.totalDurationMinutes} minut</p>
                </div>
            </div>
        </ListGroup.Item>
    )
}

export default CourseManagementListItem;