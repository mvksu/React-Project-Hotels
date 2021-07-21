import { createContext  } from "react"

const AuthContext = createContext({
    user: {},
    login: () => {},
    logout: () => {},
});

export default AuthContext;