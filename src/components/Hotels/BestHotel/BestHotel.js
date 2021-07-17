import { useEffect, useState } from "react";
import moment from 'moment'
import { Link } from "react-router-dom";

const BestHotel = (props) => {
    const [time, setTime] = useState('');

    const endTime = moment().add(23, 'minutes').add(34, 'seconds')
    const hotel = props.getHotel();
    let interval = null;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        interval = setInterval(() => {
            const lefttime = moment().diff(endTime) / 1000
            const minutes = -(lefttime / 60);
            const seconds = -(lefttime % 60)
            setTime(`minut: ${minutes.toString().substring(0, 2)}, sekund: ${seconds.toString().substring(0, 2)}`)
        }, 1000);

        return () => {
            console.log("unmounted best hotel")
            clearInterval(interval)
        }
    }, []);

    return (
        <div className="card bg-success text-white">
            <div className="card-header">Najlepsza oferta!</div>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p>Ocena: {hotel.rating}</p>
                </div>
                <p>Do końca oferty pozostało: {time}</p>
                <Link
                    to={`/hotele/${hotel.id}`}
                    className="btn btn-outline-light btn-sm">Pokaż
                </Link>
            </div>
        </div>

    )

}

export default BestHotel;