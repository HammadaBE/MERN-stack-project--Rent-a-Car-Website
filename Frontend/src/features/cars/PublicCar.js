import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useGetCarsQuery } from './carsApiSlice';

import { memo } from 'react';
import Modal from '../../Modal';


const PublicCar = ({ carId }) => {
  const [showModal, setShowModal] = useState(false);

  const { car } = useGetCarsQuery('publicCarsList', {
    selectFromResult: ({ data }) => ({
      car: data?.entities[carId]
    }),
  });
  console.log('car.photo:', car?.photo);
  console.log('car.regsitration:', car?.registration);

  const showImg = () => setShowModal(true);

  if (car) {
    return (
      <>
        <tr className="table__row">
          <td className="table__cell car__registration">{car.registration}</td>
          <td className="table__cell car__brand">{car.brand}</td>
          <td className="table__cell car__model">{car.model}</td>
          <td className="table__cell car__color">{car.color}</td>
          <td className="table__cell car__type">{car.type}</td>
          <td className="table__cell car__year">{car.year}</td>
          <td className="table__cell">
            <button className="icon-button table__button" onClick={showImg}>
            <img className="car_image"src={process.env.PUBLIC_URL + car.photo} alt="Dacia image"  style={{ width: "80px", height: "50px" }}/>
            </button>
          </td>
        </tr>
        <Modal isOpen={showModal} closeModal={() => setShowModal(false)} carId={carId}/>
      </>
    );
  } else return null;
};


const memoizedPublicCar = memo(PublicCar);

export default memoizedPublicCar;
