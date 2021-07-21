import PropTypes from 'prop-types'
import { useContext } from 'react';
import ThemeContext from '../../context/themeContext';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number,
    description: PropTypes.string.isRequired,
};


function Hotel(props) {
    const [auth] = useAuth()
    const theme = useContext(ThemeContext)

    const clickHandler = (e) => {
        if (props.onOpen) {
            props.onOpen(props);
        }
    }

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        <img
                            src={`https://placeimg.com/220/18${Math.floor(Math.random() * 10)}`}
                            alt=""
                            className="img-fluid img-thumbnail" />
                    </div>
                    <div className="col-8 text-left">
                        <div className="row">
                            <div className="col">
                                <h5 className="mb-0"><strong>{props.name}</strong></h5>
                                <span className="badge badge-info">{props.city}</span>
                            </div>
                            <div className="col text-right">
                                <h5>Ocena: {props.rating ?? 0}</h5>
                                <p>Opinie: <span className="badge badge-secondary"></span></p>
                                <Link
                                    to={`hotele/${props.id}`}
                                    className={`btn btn-${theme.color} float-right px-5`}
                                    onClick={clickHandler}
                                >Pokaż
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 text-left">
                        <p className="text-secondary mb-0">{props.description}</p>

                        {auth
                            ? <p className="mt-2">Dostępność: {props.rooms} pokoje wolne</p>
                            : <p className="mt-2">Dostępność: Zaloguj się, żeby zobaczyć</p>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

Hotel.propTypes = propTypes;

export default Hotel;