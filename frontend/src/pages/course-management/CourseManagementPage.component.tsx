import { Button, Modal, Spinner } from "flowbite-react";
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
            <div className="flex flex-row justify-between mb-6">
                <h1 className="text-4xl">Zarządzaj swoimi kursami</h1>
                <Button color="primary" className="flex items-center justify-center text-center gap-2" onClick={() => setShowNewCourseForm(true)}>
                    <LuPlusSquare />
                    Utwórz nowy kurs
                </Button>
            </div>
            {
                isLoading ? <Spinner></Spinner> : null
            }
            {
                data ? (
                    <div>
                        <CourseManagementList courses={data.courses} />
                    </div>
                ) : null
            }
            {
                isError ? <span className="text-error">Wystapił błąd</span> : null
            }
            <Modal
                show={showNewCourseForm}
                size="lg"
                popup={true}
                onClose={() => setShowNewCourseForm(false)}
            >
                <Modal.Header>
                    Dodaj nowy kurs
                </Modal.Header>
                <Modal.Body>
                    <CreateCourseForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setShowNewCourseForm(false)}
                        color={'secondary'}
                        outline
                    >
                        Anuluj
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CourseManagementPage;