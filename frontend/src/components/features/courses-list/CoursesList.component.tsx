import { FC } from "react";
import { Course } from "../../../api/dto/courses/courses.types";
import { ListGroup } from "flowbite-react";
import CoursesListItem from "./CourseListItem.component";

type CourseListProps = {
    courses: Course[]
}

const CoursesList: FC<CourseListProps> = ({ courses }) => {
    return (
        <div>
            <ListGroup className="w-full">
                {
                    courses.map(course => (
                        <CoursesListItem course={course} />
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default CoursesList;