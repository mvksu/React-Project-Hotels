import { useState } from "react"
import { switchError } from "../../../components/helpers/switchErrors"
import { useHistory } from 'react-router-dom'
import useAuth from "../../../hooks/useAuth"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import axios from "../../../axios-auth"


export default function Login() {
    const [, setAuth] = useAuth()
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [valid, ] = useState(null)
    const [error, setError] = useState('')

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await axios.post('accounts:signInWithPassword', {
                email: email,
                password: password,
                returnSecureToken: true

            });
            console.log(res)
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId
            })
            history.push('/')

        } catch (ex) {
            setLoading(false)
            setError(ex.response.data.error.message)
            console.log(ex.response.data.error.message)
        }
    }

    

    return (
        <div>
            <h2>Logowanie</h2>

            {valid === false ? (
                <div className="alert alert-danger">Niepoprawne dane logowania</div>
            ) : null}
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="moj@email.com" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Hasło</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="form-control" />
                </div>

                {error ? (
                    <div className='alert alert-danger'>{switchError(error)}</div>
                ) : null}

                <LoadingButton loading={loading} label="Zaloguj się" />

            </form>
        </div>
    )
}