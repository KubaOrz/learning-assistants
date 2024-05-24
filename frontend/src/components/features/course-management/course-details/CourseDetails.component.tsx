import { FC } from "react";
import { Course } from "../../../../api/dto/courses/courses.types";
import { Button, FileInput, Label, TextInput, Textarea } from "flowbite-react";

type CourseDetailsProps = {
    course: Course;
};

const CourseDetails: FC<CourseDetailsProps> = ({ course }) => {

    // TODO handle fileupload to amazon s3
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file?.name);
    };

    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg mb-4">
            <h1 className="text-2xl font-bold mb-4">Podstawowe informacje</h1>
            <form className="space-y-4">
                <div>
                    <Label htmlFor="title" className="block text-gray-700">Nazwa kursu</Label>
                    <TextInput
                        id="title"
                        type="text"
                        className="mt-1"
                        defaultValue={course.title}
                    />
                </div>
                <div>
                    <Label htmlFor="shortDescription" className="block text-gray-700">Krótki opis</Label>
                    <Textarea
                        id="shortDescription"
                        className="mt-1"
                        defaultValue={course.shortDescription}
                    />
                </div>
                <div>
                    <Label htmlFor="thumbnail" className="block text-gray-700">Miniaturka kursu</Label>
                    <FileInput
                        id="thumbnail"
                        className="mt-1"
                        onChange={handleFileChange}
                    />
                    {course.thumbnail && <img src={course.thumbnail} alt="Thumbnail Preview" className="mt-2 w-24 h-24 object-cover" />}
                </div>
                <div>
                    <Label htmlFor="longDescription" className="block text-gray-700">Dłuższy opis</Label>
                    <Textarea
                        id="longDescription"
                        className="mt-1"
                        defaultValue={course.longDescription}
                        rows={5}
                    />
                </div>
                <div>
                    <Label htmlFor="createdAt" className="block text-gray-700">Data utworzenia</Label>
                    <span className="text-sm">{(new Date(course.createdAt)).toLocaleDateString()}</span>
                </div>
                <div>
                    <Label htmlFor="updatedAt" className="block text-gray-700">Data ostatniej modyfikacji</Label>
                    <span className="text-sm">{(new Date(course.updatedAt)).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-end">
                    <Button type="submit" color="primary">
                        Zapisz zmiany
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CourseDetails;