import { FC } from "react";
import { Course } from "../../../../api/dto/courses/courses.types";
import { ListGroup } from "flowbite-react";
import CourseManagementListItem from "./CourseManagementListItem.component";

type CourseListProps = {
    courses: Course[]
}

const CourseManagementList: FC<CourseListProps> = ({ courses }) => {
    return (
        <div>
            <ListGroup className="w-full">
                {
                    courses.map(course => (
                        <CourseManagementListItem course={course} />
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default CourseManagementList;