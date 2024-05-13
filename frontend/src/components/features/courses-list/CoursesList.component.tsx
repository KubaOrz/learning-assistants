import { FC } from "react";
import { Course } from "../../../api/dto/courses/courses,types";
import { ListGroup } from "flowbite-react";

type CourseListProps = {
    courses: Course[]
}

const CoursesList: FC<CourseListProps> = ({ courses }) => {
    return (
        <div>
        {/* // <ListGroup className="w-48"> */}
            {
                courses.map(course => (
                    // <ListGroup.Item>
                    <div>
                        <p className="text-lg">{course.title}</p>
                        <p className="text-lg">{course.shortDescription}</p>
                        <p className="text-lg">{course.longDescription}</p>
                        <p className="text-lg">{course.createdAt}</p>
                        <p className="text-lg">Czas trwania: {course.totalDurationMinutes}</p>
                        </div>
                ))
            }
        {/* </ListGroup> */}
        </div>
    )
}

export default CoursesList;