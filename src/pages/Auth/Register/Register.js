import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import Input from "../../../components/Input/Input"
import { switchError } from "../../../components/helpers/switchErrors"
import { validate } from "../../../components/helpers/validateEmail"
import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import { useHistory } from "react-router-dom"
import axios from "../../../axios-auth"

export default function Register() {
    const history = useHistory()
    const [, setAuth] = useAuth()
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(false)
    const [form, setForm] = useState({
        email: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', 'email']
        },
        password: {
            value: '',
            error: '',
            showError: false,
            rules: ['required']
        }
    })
    const [error, setError] = useState('')

    useEffect(() => {
        setValid(true)
        for (let [, value] of Object.entries(form)) {
            if (value.error) setValid(false)
        }
    }, [form])

    const submit = async e => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await axios.post('accounts:signUp', {
                email: form.email.value,
                password: form.password.value,
                returnSecureToken: true

            });
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId
            })
            history.push('/')

        } catch (ex) {
            setError(ex.response.data.error.message)
            console.log(ex.response.data.error.message)
        }

        setLoading(false)

    }

    const changeHandler = (value, fieldName) => {
        const error = validate(form[fieldName].rules, value)

        setForm({
            ...form,
            [fieldName]:
            {
                ...form[fieldName],
                value: value,
                showError: true,
                error: error
            }
        })
    }

    
    return (
        <div className="card">
            <div className="card-header">Rejestracja</div>
            <div className="card-body">

                <form onSubmit={submit}>

                    <Input
                        label="E-mail"
                        type="email"
                        value={form.email.value}
                        onChange={value => changeHandler(value, 'email')}
                        error={form.email.error}
                        showError={form.email.showError}
                    />

                    <Input
                        label="Hasło"
                        type="password"
                        value={form.password.value}
                        onChange={value => changeHandler(value, 'password')}
                        error={form.password.error}
                        showError={form.password.showError}
                    />

                    {error ? (
                        <div className="alert alert-danger">
                            {switchError(error)}
                        </div>
                    ) : null}

                    <div className="text-right">
                        <LoadingButton
                            label="Zarejestruj się"
                            loading={loading}
                            className="btn-success"
                            disabled={valid ? false : true}
                        />
                    </div>
                </form>
            </div>
        </div >
    )
}