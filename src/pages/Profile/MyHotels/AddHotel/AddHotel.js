import axios from "../../../../axios"
import { useHistory } from "react-router-dom"
import HotelForm from "../HotelForm"

export default function AddHotel() {
    const history = useHistory()

    const submit = async form => {
        await axios.post('hotels.json', form)
        history.push('/profil/hotele')
    }

    return (
        <div className="card">
            <div className="card-header">Dodaj Hotel</div>
            <div className="card-body">
                    <HotelForm 
                        buttonText="Dodaj"
                        onSubmit={submit}
                    />
            </div>
        </div>
    )
}