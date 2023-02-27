import { Link } from 'react-router-dom'
import CarsList from '../features/cars/CarsList'


const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Khalilocation Rent A Car</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Laayoune, Morocco. Khalilocation offers the best rental car deals.</p>
                <address className="public__addr">
                    Khalilocation Rent A Car<br />
                    Laayoune<br />
                    Morocco<br />
                    <a href="tel:+212666666666">(+212) 666-666-666</a>
                </address>
                <br />
                <p>Owner: Khalil Shrif</p>
                
                <CarsList />
            </main>

            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public