/* eslint-disable jsx-a11y/anchor-is-valid */
import ProfilDetails from "./ProfileDetails/ProfileDetails";
import MyHotels from "./MyHotels/MyHotels";
import { Switch, Route, NavLink, useRouteMatch } from "react-router-dom";

export default function Profile() {
    const { path, url } = useRouteMatch()


    return (
        <div className="card">
            <div className="card-header">
                <h2>Mój profil</h2>
            </div>
            <div className="card-body">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink exact to={`${url}`} className="nav-link" href="#">Profil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`${url}/hotele`} className="nav-link" >Hotele</NavLink>
                    </li>
                </ul>

                <div className="pt-4">
                    <Switch>
                        <Route path={`${path}/hotele`} component={MyHotels} />
                        <Route path={`${path}`} component={ProfilDetails} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}