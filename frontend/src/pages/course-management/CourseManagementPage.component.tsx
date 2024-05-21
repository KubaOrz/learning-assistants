import { Button, Spinner } from "flowbite-react";
import { FC, useState } from "react";
import { LuPlusSquare } from "react-icons/lu";
import CreateCourseForm from "../../components/features/course-management/CreateCourseForm.component";
import CourseManagementList from "../../components/features/course-management/course-management-list/CourseManagementList.component";
import { useGetCoursesByAuthorQuery } from "../../api/api.service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CourseManagementPage: FC = () => {
    // const loggedUser = useSelector((state: RootState) => state.authentication.authData?.user);
    const [showNewCourseForm, setShowNewCourseForm] = useState(false);
    const { data, isLoading, isError } = useGetCoursesByAuthorQuery();

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-end">
                <Button color="primary" className="flex items-center justify-center text-center gap-2" onClick={() => setShowNewCourseForm(true)}>
                    <LuPlusSquare />
                    Utwórz nowy kurs
                </Button>
            </div>
            {
                showNewCourseForm ? (
                    <div>
                        <CreateCourseForm />
                    </div>
                ) : null
            }
            {
                isLoading ? <Spinner></Spinner> : null
            }
            {
                data ? (
                    <div>
                        <h1 className="text-2xl">Zarządzaj swoimi kursami</h1>
                        <CourseManagementList courses={data.courses} />
                    </div>
                ) : null
            }
            {
                isError ? <span className="text-error">Wystapił błąd</span> : null
            }
        </div>
    )
}

export default CourseManagementPage;