import { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import axios from "../../axios";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useAuth from "../../hooks/useAuth";
import useWebsiteTitle from "../../hooks/useWebsiteTitle"

export default function Hotel(props) {
    const { id } = useParams();
    const [hotel, setHotel] = useState({})
    const [loading, setLoading] = useState(true);
    const setTitle = useWebsiteTitle();
    const [auth] = useAuth()
    const [rating, setRating] = useState(5)
    const history = useHistory()

    const fetchHotel = async () => {
        try {
            const res = await axios.get(`/hotels/${id}.json`)
            setHotel(res.data)
            setTitle(res.data.name)
            setLoading(false)
        } catch (ex) {
            console.log(ex.response)
        }
    }

    const rateHotel = async () => {
        try {
            await axios.put(`/hotels/${id}/rating.json`,  rating )
            history.push('/')
        } catch (ex) {
            console.log(ex.response)
        }
    }

    useEffect(() => {
        fetchHotel()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return loading ? <LoadingIcon /> : (
        <div className="card">
            <div className="card-header">
                <h2>Hotel: {hotel.name}</h2>
            </div>
            <div className="card-body d-flex flex-column">
                <img
                    src={`https://placeimg.com/420/180/arch`}
                    alt=""
                    className="img-fluid img-thumbnail text-right" />
                <p>Miejscowość: <b>{hotel.city}</b></p>
                <p>Miejsca: <b>{hotel.rooms}</b></p>
                <p className="lead">{hotel.description}</p>
                <p>Wyposażenia: </p>
                {hotel.features.map(x =>
                    <li key={x}>
                        {x}
                    </li>)}
                <p className="mt-2">Oceny: {hotel.rating ?? 'brak ocen'}</p>
            </div>
            <div className="card-footer">
                {auth ? (
                    <div className="form-group row mt-4">
                        <div className="col">
                            <select className="form-control form-select mb-3" onChange={e => setRating(e.target.value)} value={rating}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col">
                            <button className="btn btn-info text-white" onClick={rateHotel}>Oceń</button>
                        </div>

                    </div>
                ) : null}
            </div>
        </div>
    )
}