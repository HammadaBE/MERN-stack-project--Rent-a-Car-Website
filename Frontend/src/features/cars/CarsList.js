import { useGetCarsQuery } from "./carsApiSlice"
import Car from "./Car"
import useAuth from "../../hooks/useAuth"

const CarsList = () => {

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: cars,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCarsQuery('carsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = cars

        

        const tableContent =ids?.length && ids.map (carId => <Car key={carId} carId={carId} />)

        content = (
            <table className="table--cars">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th car__created" >Created</th>
                        <th scope="col" className="table__th car__updated">Updated</th>
                        <th scope="col" className="table__th car__Registration">Registration</th>
                        <th scope="col" className="table__th car__Brand">Brand</th>
                        <th scope="col" className="table__th car__model">Model</th>
                        <th scope="col" className="table__th car__color">Color</th>
                        <th scope="col" className="table__th car__type">Type</th>
                        <th scope="col" className="table__th car__year">Year</th>
                        <th scope="col" className="table__th car__year">Photo</th>
                        <th scope="col" className="table__th car__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default CarsList