import axios from "../../../axios";
import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom"
import { objectsToArrayWithID } from "../../../components/helpers/objects";
import useAuth from "../../../hooks/useAuth";

export default function MyHotels() {
    const { url } = useRouteMatch();
    const [hotels, setHotels] = useState([])
    const [auth] = useAuth()

    const fetchHotels = async () => {
        try {
            const res = await axios.get('/hotels.json')
            const newHotels = objectsToArrayWithID(res.data).filter(hotel => hotel.user_id === auth.userId)
            setHotels(newHotels)
        } catch (ex) {
            console.log(ex.response)
        }
    }
    useEffect(() => {
        fetchHotels()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const deleteHandler = async id => {
        try {
            await axios.delete(`/hotels/${id}.json`)
            setHotels(hotels.filter(hotel => hotel.id !== id))
        } catch (ex) {
            console.log(ex.response)
        }
    }

    return (
        <div>
            {hotels ? (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Status</th>
                            <th>Opcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map(hotel => (
                            <tr key={hotel.id}>
                                <td>{hotel.name}</td>
                                <td>
                                    {hotel.status === '1' 
                                    ? <span className="badge badge-success text-white">aktywny</span> 
                                    : <span className="badge badge-danger text-white">nieaktywny</span> }

                                </td>
                                <td>
                                    <Link to={`${url}/edytuj/${hotel.id}`} className="btn btn-warning m-2">Edytuj</Link>
                                    <button className="btn btn-danger m-2" onClick={() => deleteHandler(hotel.id)}>Usuń</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Nie masz jeszcze żadnego hotelu</p>
            )}
            <Link to={`${url}/dodaj`} className="btn btn-primary">Dodaj Hotel</Link>
        </div>
    )
}