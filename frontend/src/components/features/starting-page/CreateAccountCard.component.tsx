import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { RoutingConstants } from "../../../routing/RoutingConstants";

const CreateAccountCard = () => {
    return (
        <Card className="w-full flex flex-row h-[460px]" renderImage={() => <img src="src/assets/register.jpeg" className="max-w-1/2 h-full object-cover"></img>}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Utwórz konto, jesli jeszcze go nie masz
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                Witaj w przyszłości nauki! Nasza platforma edukacyjna wykorzystuje najnowocześniejsze technologie sztucznej inteligencji, aby uczynić Twoją drogę edukacyjną bardziej ekscytującą, efektywną i dostosowaną do Twoich potrzeb.

                Zaloguj się już dziś, aby doświadczyć:
            </p>
            <p>
                🧠 Spersonalizowane Uczenie się: Nasz system AI analizuje Twój styl uczenia się i dostosowuje materiały edukacyjne, aby jak najlepiej odpowiadały Twoim preferencjom i tempu nauki.
            </p>
            <p>
                🚀 Dynamiczne Zadania i Ćwiczenia: Dzięki inteligentnym algorytmom naszej platformy, zadania i ćwiczenia są dostosowywane do Twojego poziomu umiejętności, zapewniając Ci wyzwanie na miarę Twoich możliwości.
            </p>
            <p>
                🎓 Eksperckie Wsparcie: Nasi nauczyciele i eksperci są zawsze tutaj, aby odpowiedzieć na Twoje pytania i udzielić Ci wsparcia w Twojej drodze ku sukcesowi.
            </p>
            <p>
                Nie czekaj dłużej! Dołącz do naszej społeczności uczących się i odkryj, jak sztuczna inteligencja może odmienić Twoją edukację."
            </p>
            <Link to={RoutingConstants.REGISTER}>
                <Button color="secondary" className="w-full">
                    Dołącz do nas
                </Button>
            </Link>
        </Card>
    )
}

export default CreateAccountCard;