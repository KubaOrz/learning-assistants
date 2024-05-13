import { FC, useEffect, useState } from "react";
import { useGetCoursesListQuery } from "../../api/api.service";
import { Pagination } from "flowbite-react";
import CoursesList from "../../components/features/courses-list/CoursesList.component";

const CourseListPage: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { data, isLoading, isError, isSuccess } = useGetCoursesListQuery();

    const onPageChange = (page: number) => setCurrentPage(page);

    useEffect(() => {
        setTotalPages(data?.total ?? 0);
    }, [data])

    return (
        <div className="w-full">
            <h1 className="text-3xl">Lista kursów</h1>
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