import { useContext } from "react";
import AuthContext from "../components/context/authContext";

export default function useAuth() {
    const authContext = useContext(AuthContext);
    const auth = authContext.user;

    const setAuth = (user) => {
        if (user) {
            console.log('zalogowano')
            authContext.login(user)
            window.localStorage.setItem('token-data', JSON.stringify(user))

        } else {
            authContext.logout()
            window.localStorage.removeItem('token-data', JSON.stringify(user))

        }

    }

    return [auth, setAuth]
}