import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useLocalStorage from '../../hooks/useLocalStorage'
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import Hotels from '../../components/Hotels/Hotels';
import { useEffect, useState } from "react";
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon'


const defaulthotels = [{
    id: 1,
    name: 'Pensjonat 1',
    city: 'Warszawa',
    rating: 7.7,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unkn ",
    image: ""
},
{
    id: 2,
    name: 'Hotel 1',
    city: 'Gdańsk',
    rating: 8.8,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ",
    image: ""
}];


export default function Home(props) {
    const [lastHotel, setLastHotel] = useLocalStorage('last-hotel', null)
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([])
    useWebsiteTitle('Stona główna');
    
    const getBestHotel = () => {
        if (hotels.length < 2) {
            return null
        } else {
            return hotels.sort((a, b) => a.rating > b.rating ? -1 : 1)[0]
        }
    }

    const openHotel = (hotel) => {
        console.log(hotel)
        setLastHotel(hotel)
    }
    const removeHotel = () => setLastHotel(null)

    useEffect(() => {  
        setTimeout(() => {
            setHotels(defaulthotels);
            setLoading(false);
        }, 1000)
        console.log('component mounted')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {lastHotel ? <LastHotel {...lastHotel} removeHotel={removeHotel} /> : null}
            {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
            {loading ? <LoadingIcon /> : <Hotels hotels={hotels} onOpen={openHotel} />}
        </>
    )
}