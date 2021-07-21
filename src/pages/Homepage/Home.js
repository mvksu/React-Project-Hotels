import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useLocalStorage from '../../hooks/useLocalStorage'
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import Hotels from '../../components/Hotels/Hotels';
import { useEffect, useState } from "react";
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon'
import { objectsToArrayWithID } from '../../components/helpers/objects'
import axios from '../../axios';


export default function Home(props) {
    useWebsiteTitle('Stona główna');
    const [lastHotel, setLastHotel] = useLocalStorage('last-hotel', null)
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([])
    
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

    const fetchHotels = async () => {
        try {
            const res = await axios.get('/hotels.json')
            const newHotels = objectsToArrayWithID(res.data).filter(hotel => hotel.status === "1")
            console.log('new hotels')
            console.log(newHotels)
            setHotels(newHotels)
            setLoading(false)
        } catch (ex) {
            console.log(ex.response)
        }
    }
    useEffect(() => {
        fetchHotels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {lastHotel ? <LastHotel {...lastHotel} removeHotel={removeHotel} /> : null}
            {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
            {loading ? <LoadingIcon /> : <Hotels hotels={hotels} onOpen={openHotel} />}
        </>
    )
}