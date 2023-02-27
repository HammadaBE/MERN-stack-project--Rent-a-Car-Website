import { useState, useEffect } from "react"
import { useUpdateCarMutation, useCarNoteMutation } from "./carsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditCarForm = ({ car, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateCar, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteCar, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCarMutation()

    const navigate = useNavigate()

    const [registration, setRegistration] = useState(car.registartion)
    const [brand, setBrand] = useState(car.brand)
    const [model, setModel] = useState(car.model)
    const [color, setColor] = useState(car.color)
    const [type, setType] = useState(car.type)
    const [year, setYear] = useState(car.year)
    

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setRegistration('')
            setBrand('')
            setModel('')
            setColor('')
            setType('')
            setYear('')
            navigate('/dash/cars')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onRegistrationChanged = e => setRegistration(e.target.value)
    const onBrandChanged = e => setBrand(e.target.value)
    const onModelChanged = e => setModel(prev => !prev)
    const onColorChanged = e => setColor(e.target.value)
    const onTypeChanged = e => setType(e.target.value)
    const onYearChanged = e => setYear(e.target.value)

    const canSave = [registration, brand, model,color,type,year].every(Boolean) && !isLoading

    const onSaveCarClicked = async (e) => {
        if (canSave) {
            await updateCar({ id: car.id,registration, brand, model, color, type,year })
        }
    }

    const onDeleteCarClicked = async () => {
        await deleteCar({ id: car.id })
    }

    const created = new Date(car.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(car.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = cars.map(car => {
        return (
            <option
                key={car.id}
                value={car.id}

            > {car.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validRegistrationClass = !registartion ? "form__input--incomplete" : ''
    const validBrandClass = !brand ? "form__input--incomplete" : ''
    const validModelClass = !model ? "form__input--incomplete" : ''
    const validColorClass = !color ? "form__input--incomplete" : ''
    const validTypeClass = !type ? "form__input--incomplete" : ''
    const validYearClass = !year ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteCarClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

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
                        {deleteButton}
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
                <div className="form__row">
                    {/* <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            ASSIGNED TO:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div> */}
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