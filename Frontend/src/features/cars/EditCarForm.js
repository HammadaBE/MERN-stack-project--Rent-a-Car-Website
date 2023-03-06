import { useState, useEffect } from "react"
import { useUpdateCarMutation, useDeleteCarMutation } from "./carsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
//import useAuth from "../../hooks/useAuth"

const EditCarForm = ({ car }) => {

    //const { isManager, isAdmin } = useAuth()

    const [updateCar, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCarMutation()

    const [deleteCar, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCarMutation()

    const navigate = useNavigate()

    const [registration, setRegistration] = useState(car.registration)
    const [brand, setBrand] = useState(car.brand)
    const [model, setModel] = useState(car.model)
    const [color, setColor] = useState(car.color)
    const [type, setType] = useState(car.type)
    const [year, setYear] = useState(car.year)
    const [photo, setPhoto] = useState(car.photo)
    
    

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setRegistration('')
            setBrand('')
            setModel('')
            setColor('')
            setType('')
            setYear('')
            setPhoto('')
            navigate('/dash/cars')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onRegistrationChanged = e => setRegistration(e.target.value)
    const onBrandChanged = e => setBrand(e.target.value)
    const onModelChanged = e => setModel(e.target.value)
    const onColorChanged = e => setColor(e.target.value)
    const onTypeChanged = e => setType(e.target.value)
    const onYearChanged = e => setYear(e.target.value)
    const onPhotoChanged = e => setPhoto(e.target.value)

    const canSave = [registration, brand, model,color,type,year,photo].every(Boolean) && !isLoading

    const onSaveCarClicked = async (e) => {
        if (canSave) {
            await updateCar({ id: car.id,registration, brand, model, color, type,year,photo })
        }
    }

    const onDeleteCarClicked = async () => {
        await deleteCar({ id: car.id })
    }

    const created = new Date(car.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(car.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    // const options = users.map(car => {
    //     return (
    //         <option
    //             key={user.id}
    //             value={user.id}

    //         > {user.username}</option >
    //     )
    // })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validRegistrationClass = !registration ? "form__input--incomplete" : ''
    const validBrandClass = !brand ? "form__input--incomplete" : ''
    const validModelClass = !model ? "form__input--incomplete" : ''
    const validColorClass = !color ? "form__input--incomplete" : ''
    const validTypeClass = !type ? "form__input--incomplete" : ''
    const validYearClass = !year ? "form__input--incomplete" : ''
    const validPhotoClass = !photo ? "form__input--incomplete" : ''


    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    // let deleteButton = null
    // if (isManager || isAdmin) {
    //     deleteButton = (
    //         <button
    //             className="icon-button"
    //             title="Delete"
    //             onClick={onDeleteCarClicked}
    //         >
    //             <FontAwesomeIcon icon={faTrashCan} />
    //         </button>
    //     )
    // }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Car </h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveCarClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteCarClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="car-registration">
                   Registartion:</label>
                <input
                    className={`form__input ${validRegistrationClass}`}
                    id="car-registration"
                    name="registration"
                    type="text"
                    autoComplete="off"
                    value={registration}
                    onChange={onRegistrationChanged}
                />

                <label className="form__label" htmlFor="car-brand">
                    Brand:</label>
                <textarea
                    className={`form__input form__input--text ${validBrandClass}`}
                    id="car-brand"
                    name="brand"
                    value={brand}
                    onChange={onBrandChanged}
                />
                <label className="form__label" htmlFor="car-Model">
                    Model:</label>
                <textarea
                    className={`form__input form__input--text ${validModelClass}`}
                    id="car-model"
                    name="model"
                    value={model}
                    onChange={onModelChanged}
                />
                <label className="form__label" htmlFor="car-color">
                    Color:</label>
                <textarea
                    className={`form__input form__input--text ${validColorClass}`}
                    id="car-color"
                    name="color"
                    value={color}
                    onChange={onColorChanged}
                />
                <label className="form__label" htmlFor="car-type">
                    type:</label>
                <textarea
                    className={`form__input form__input--text ${validTypeClass}`}
                    id="car-type"
                    name="type"
                    value={type}
                    onChange={onTypeChanged}
                />
                <label className="form__label" htmlFor="car-year">
                    Year:</label>
                <textarea
                    className={`form__input form__input--text ${validYearClass}`}
                    id="car-year"
                    name="year"
                    value={year}
                    onChange={onYearChanged}
                />
                <label className="form__label" htmlFor="car-photo">
                    Photo:</label>
                <input
                    className={`form__input form__input--path ${validPhotoClass}`}
                    id="car-photo"
                    name="photo"
                    value={photo}
                    onChange={onPhotoChanged}
                />
                <div className="form__row">
              
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditCarForm