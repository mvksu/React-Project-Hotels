import styles from './Menu.module.css'
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom'

function Menu() {
    //const auth = useContext(AuthContext)
    const [auth, setAuth] = useAuth();

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
                    :
                    (<>
                        <NavLink
                            to="/rejestracja"
                            className={styles.menuItem}
                            activeClassName={styles.menuActiveItem}>Zarejestruj się
                        </NavLink>
                        <NavLink
                            to="/zaloguj"
                            className={styles.menuItem}
                            activeClassName={styles.menuActiveItem}>Zaloguj
                        </NavLink>
                    </>)
                }
            </ul>
        </div>
    )
}

export default Menu;