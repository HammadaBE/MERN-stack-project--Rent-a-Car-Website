import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetCarsQuery } from './carsApiSlice'
import { memo } from 'react'


const PublicCar = ({ carId }) => {

    const { car } = useGetCarsQuery("publicCarsList", {
        selectFromResult: ({ data }) => ({
            car: data?.entities[carId]
        }),
    })

    

    if (car) {
        const created = new Date(car.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(car.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

      

        return (
            <tr className="table__row">
               
                <td className="table__cell car__created">{created}</td>
                <td className="table__cell car__updated">{updated}</td>
                <td className="table__cell car__registration">{car.registration}</td>
                <td className="table__cell car__brand">{car.brand}</td>
                <td className="table__cell car__model">{car.model}</td>
                <td className="table__cell car__color">{car.color}</td>
                <td className="table__cell car__type">{car.type}</td>
                <td className="table__cell car__year">{car.year}</td>
                
            </tr>
        )

    } else return null
}


const memoizedPublicCar = memo(PublicCar)

export default memoizedPublicCar
