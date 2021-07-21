import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "../../axios";
import { objectsToArrayWithID } from "../../components/helpers/objects";
import Hotels from "../../components/Hotels/Hotels";
export default function Search(props) {

    const { term } = useParams();
    const [hotels, setHotels] = useState([])

    const searchHandler = async () => {
        try {
            const res = await axios.get('/hotels.json')
            const newHotels = objectsToArrayWithID(res.data).filter(hotel => hotel.name.includes(''))
            setHotels(newHotels)
        } catch (ex) {
            console.log(ex.response)
        }
      }

    useEffect(() => {
        searchHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term])  ;

    return(
        <div>
            <h2>Wyniki: {term}</h2>
            <Hotels hotels={hotels} />
        </div>
    )
}