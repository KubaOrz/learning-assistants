import { Button, Carousel } from "flowbite-react";

const TopCoursesCarousel = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Kurs JavaScript</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Kurs Java</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Naucz sie programować w 10 dni</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">POdstawy UX</p>
                    </div>
                </div>
                <div className="flex h-full">
                    <img src="src/assets/logo.jpeg" alt="..." className="object-cover w-full" />
                    <div className="absolute bottom-0 left-0 w-full bg-secondary text-dark p-4">
                        <p className="text-xl">Angielski dla opornych</p>
                    </div>
                </div>
            </Carousel>
        </div>

    )
}

export default TopCoursesCarousel;