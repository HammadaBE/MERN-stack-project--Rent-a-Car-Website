import { Link } from 'react-router-dom'
import PublicCarsList from '../features/cars/PublicCarsList'


const Public = () => {
    const content = (
        <section className="public">
            <header  >
                <table className="publicHeader"  >
                    <tr >
                        <td><img src="khalilLogo.PNG" alt="Khalilocation Logo" width="100" height="100" /></td>
                        
                    </tr>
                    <tr>
                        <td className='headerTd'><h1 id="publicHeader" text-align="center">Welcome to <span className="nowrap">Khalilocation Rent A Car</span></h1></td>
                        
                    </tr>
                </table>

            </header>
            <main className="public__main" >
                <p>Located in Laayoune, Morocco. Khalilocation offers the best rental car deals.</p>
                <address className="public__addr">
                    Khalilocation Rent A Car<br />
                    Laayoune<br />
                    Morocco<br />
                    <a href="tel:+212666666666">(+212) 666-666-666</a>
                </address>
                <br />
                <br />

                <PublicCarsList />
            </main>

            <footer >
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public