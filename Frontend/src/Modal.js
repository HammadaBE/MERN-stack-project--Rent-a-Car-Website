import React from 'react';
import { useGetCarsQuery } from './features/cars/carsApiSlice';
import PublicCar from './features/cars/PublicCar';

const Modal = ({ isOpen, closeModal, carId }) => {
  const { car } = useGetCarsQuery('publicCarsList', {
    selectFromResult: ({ data }) => ({
      car: data?.entities[carId]
    }),
  });

  console.log('PUBLIC_URL:', process.env.PUBLIC_URL);
  console.log('car.photo:', car?.photo);
  console.log('car.regsitration:', car?.registration);

 
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal}>Close</button>
            
            {car && (
              <img
                src={process.env.PUBLIC_URL + car.photo}
                alt={`${car.brand} ${car.model}`}
                style={{ width: '100%' }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
