import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetCarsQuery } from './carsApiSlice'
import { memo } from 'react'
import Modal from '../../Modal';

const Car = ({ carId }) => {
    const [showModal, setShowModal] = useState(false);

    const { car } = useGetCarsQuery("carsList", {
        selectFromResult: ({ data }) => ({
            car: data?.entities[carId]
        }),
    })

    const showImg = () => setShowModal(true);
    const navigate = useNavigate()

    if (car) {
        const created = new Date(car.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(car.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/cars/${carId}`)

        return (

            <>
                <tr className="table__row">
                    {/* <td className="table__cell note__status">
                    {car.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td> */}
                    <td className="table__cell car__created">{created}</td>
                    <td className="table__cell car__updated">{updated}</td>
                    <td className="table__cell car__registration">{car.registration}</td>
                    <td className="table__cell car__brand">{car.brand}</td>
                    <td className="table__cell car__model">{car.model}</td>
                    <td className="table__cell car__color">{car.color}</td>
                    <td className="table__cell car__type">{car.type}</td>
                    <td className="table__cell car__year">{car.year}</td>
                    <td className="table__cell">
                        <center>
                        <button className="icon-button table__button" onClick={showImg}>
                            <img className="car_image" src={process.env.PUBLIC_URL + car.photo} alt="Dacia image" style={{ width: "80px", height: "50px" }} />
                        </button>
                        </center>
                    </td>

                    <td className="table__cell">
                        <button
                            className="icon-button table__button"
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </td>
                </tr>
                <Modal isOpen={showModal} closeModal={() => setShowModal(false)} carId={carId}/>
            </>
        )

    } else return null
}


const memoizedCar = memo(Car)


export default memoizedCar
