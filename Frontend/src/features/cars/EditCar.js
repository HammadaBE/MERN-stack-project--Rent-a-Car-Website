import { useParams } from 'react-router-dom'
import EditCarForm from './EditCarForm'
import { useGetCarsQuery } from './carsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditCar = () => {
    useTitle('Khalilocation: Edit Car')

    const { id } = useParams()

    const { car } = useGetCarsQuery("carsList", {
        selectFromResult: ({ data }) => ({
            car: data?.entities[id]
        }),
    })

    if (!car) return <PulseLoader color={"#FFF"} />

    const content = <EditCarForm car={car} />

    return content
}
export default EditCar