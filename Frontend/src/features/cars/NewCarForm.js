import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewCarMutation } from "./carsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewCarForm = ({ car }) => {

    const [addNewCar, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCarMutation()

    const navigate = useNavigate()

    const [registration, setRegistration] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [type, setType] = useState('')
    const [year, setYear] = useState('')
    const [photo, setPhoto] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setRegistration('')
            setBrand('')
            setModel('')
            setColor('')
            setType('')
            setYear('')
            setPhoto('')
            navigate('/dash/cars')
        }
    }, [isSuccess, navigate])

    const onRegistrationChanged = e => setRegistration(e.target.value)
    const onBrandChanged = e => setBrand(e.target.value)
    const onModelChanged = e => setModel(e.target.value)
    const onColorChanged = e => setColor(e.target.value)
    const onTypeChanged = e => setType(e.target.value)
    const onYearChanged = e => setYear(e.target.value)
    const onPhotoChanged = e => setPhoto(e.target.value)

    const canSave = [registration, brand, model, color, type, year, photo].every(Boolean) && !isLoading


    const onSaveCarClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewCar({ registration, brand, model, color, type, year, photo })
        }
    }

    // const options = cars.map(carr => {
    //     return (
    //         <option
    //             key={car.id}
    //             value={user.id}
    //         > {user.username}</option >
    //     )
    // })

    const errClass = isError ? "errmsg" : "offscreen"
    const validRegistrationClass = !registration ? "form__input--incomplete" : ''
    const validBrandClass = !brand ? "form__input--incomplete" : ''
    const validModelClass = !model ? "form__input--incomplete" : ''
    const validColorClass = !color ? "form__input--incomplete" : ''
    const validTypeClass = !type ? "form__input--incomplete" : ''
    const validYearClass = !year ? "form__input--incomplete" : ''
    const validPhotoClass = !photo ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveCarClicked}>
                <div className="form__title-row">
                    <h2>New Car</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
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
                <label className="form__label" htmlFor="car-photo-path">
                    Photo:</label>
                <input
                    className={`form__input form__input--text ${validPhotoClass}`}
                    id="car-photo-path"
                    name="photo"
                    value={photo}
                    onChange={onPhotoChanged}
                />

            </form>
        </>
    )

    return content
}

export default NewCarForm