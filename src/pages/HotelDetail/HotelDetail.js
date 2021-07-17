import { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle"

export default function Hotel(props) {
    // const { id } = useParams();
    const [hotel, setHotel] = useState({})
    const [loading, setLoading] = useState(true);
    const setTitle = useWebsiteTitle();

    const fetchHotel = () => {
        setHotel({
            id: 2,
            name: 'Hotel 1',
            city: 'Gdańsk',
            rating: 8.8,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ",
            image: ""
        })
        setTitle('Hotel Dębowy')
        setLoading(false)
    }

    useEffect(() => {
        setTimeout(() => {
            fetchHotel()
        }, 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return loading ? <LoadingIcon /> : (
        <div>Hotel: {hotel.name}</div>
    )
}