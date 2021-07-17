import { useContext, useEffect, useRef, useState } from 'react'
import ThemeContext from '../../context/themeContext';
import { useHistory } from 'react-router-dom'


function Searchbar(props) {
    const [term, setTerm] = useState("");
    const theme = useContext(ThemeContext)
    const inputRef = useRef(null)
    const history = useHistory()

    const search = () => {
        history.push(`/wyszukaj/${term}`)
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className="d-flex">
            <input
                ref={inputRef}
                value={term}
                onKeyDown={e => e.key === "Enter" && search()}
                onChange={(e) => setTerm(e.target.value)}
                type="text"
                placeholder="Szukaj..."
                className="form-control mr-1"
            />
            <button
                onClick={search}
                className={`btn btn-${theme.color}`}>Szukaj
            </button>


        </div>
    )
}

export default Searchbar;