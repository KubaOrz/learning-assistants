import { Button, Carousel } from "flowbite-react";

const TopCoursesCarousel = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Oferta kursu numer 1</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Oferta kursu numer 2</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Oferta kursu numer 3</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Oferta kursu numer 4</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Oferta kursu numer 5</p>
                    </div>
                </div>
            </Carousel>
        </div>

    )
}

export default TopCoursesCarousel;