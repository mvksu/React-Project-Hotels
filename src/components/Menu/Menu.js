import styles from './Menu.module.css'
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom'

function Menu() {
    //const auth = useContext(AuthContext)
    const [auth, setAuth] = useAuth();

    const login = (e) => {
        e.preventDefault();
        setAuth(true)
    }

    const logout = (e) => {
        e.preventDefault();
        setAuth(false)
    }

    return (
        <div className={`${styles.menuContainer} breadcrumb p-1`}>
            <ul className={styles.menu}>
                <li>
                    <NavLink exact to="/"
                        className={styles.menuItem}
                        activeClassName={styles.menuActiveItem}>Home</NavLink>
                </li>
                {auth ?
                    (<>
                        <li>
                            <NavLink to="/profil"
                                className={styles.menuItem}
                                activeClassName={styles.menuActiveItem}>Mój profil</NavLink>
                        </li>
                        <li>
                            <button onClick={logout} className={styles.menuItem}>Wyloguj</button>
                        </li>
                    </>)
                    : <button className={styles.menuItem}
                        onClick={login}>Zaloguj</button>}
            </ul>
        </div>
    )
}

export default Menu;