import { FC, useEffect, useState } from "react";
import { useGetCoursesListQuery } from "../../api/api.service";
import { Button, Pagination, TextInput } from "flowbite-react";
import CoursesList from "../../components/features/courses-list/CoursesList.component";

const CourseListPage: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { data, isLoading, isError, isSuccess } = useGetCoursesListQuery();

    const onPageChange = (page: number) => setCurrentPage(page);

    useEffect(() => {
        if (data) {
            setTotalPages(Math.ceil(data.total / 10));
        }
    }, [data])

    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-3xl">Przeglądaj kursy</h1>
            <div className="w-full flex flex-row gap-2">
                <TextInput id="search" type="text" placeholder="Wyszukaj to, co cię interesuje" className="w-full" />
                <Button color="primary">
                    Szukaj
                </Button>
            </div>
            {
                isSuccess ? (
                    <>
                        <CoursesList courses={data.courses} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </>
                ) : <span className="text-error">Nie udało się załadować kursów</span>
            }

        </div>
    )
}

export default CourseListPage;