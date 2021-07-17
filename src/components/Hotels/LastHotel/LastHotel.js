import { Link } from 'react-router-dom'


function LastHotel(props) {

    return (
        <div className="card bg-light mb-2">
            <div className="card-header">Ostatnio oglądałeś ten hotel. Wciąż zaintedresowany?</div>
            <div className="card-body">
                <div className="">
                    <h5 className="card-title">{props.name}</h5>
                    <span className="badge badge-dark">{props.city}</span>
                </div>
                <div className="text-end">
                    <Link to={`/hotele/${props.id}`} className="btn btn-dark btn-sm ml-2">Tak!</Link>
                    <button className="btn btn-dark btn-sm ml-2" onClick={props.removeHotel}>Nie!</button>
                </div>
            </div>
        </div>
    )
}

export default LastHotel;