import axios from "../../../../axios"
import { useHistory } from "react-router-dom"
import HotelForm from "../HotelForm"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function EditHotel() {
    const history = useHistory()
    const [hotel, setHotel] = useState(null)
    const { id } = useParams()

    const submit = async form => {
        await axios.put(`hotels/${id}`, form)
        history.push('/profil/hotele')
    }

    const fetchHotel = async () => {
        const res = await axios.get(`hotels/${id}.json`)
        setHotel(res.data)
    }

    useEffect(() => {
        fetchHotel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="card">
            <div className="card-header">Edytuj Hotel</div>
            <div className="card-body">
                <HotelForm
                    hotel={hotel}
                    buttonText="Zapisz"
                    onSubmit={submit}
                />
            </div>
        </div>
    )
}