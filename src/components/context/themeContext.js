import { createContext  } from "react"

const ThemeContext = createContext({
    color: 'primary',
    changeTheme: () => {}
});

export default ThemeContext;