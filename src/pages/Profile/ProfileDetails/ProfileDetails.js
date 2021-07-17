/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import { validateEmail } from "../../../components/helpers/validateEmail";

export default function ProfilDetails() {

    const [email, setEmail] = useState('mo@email.com')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)

        setTimeout(() => {

            setLoading(false)
        }, 500)
    }


    useEffect(() => {
        if(validateEmail(email)) {
            setErrors({...errors, email: ''})
        } else {
            setErrors({...errors, email: 'Niepoprawny email'})
        }
    }, [email])

    useEffect(() => {
        if(password.length >= 4 || !password) {
            setErrors({...errors, password: ''})
        } 
        else {
            setErrors({...errors, password: 'Wymagane 4 znaki'})
        }
    }, [password])

    return (
        <div>
            <h2>Edycja</h2>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="moj@email.com" className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`} />
                    <div className="invalid-feedback">
                        {errors.email}
                    </div>
                    <div className="valid-feedback">
                        Wszystko gra!
                    </div>
                </div>
                <div className="form-group">
                    <label>Hasło</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : 'is-valid'}`} />
                    <div className="invalid-feedback">
                        Wymagane więcej niż 4 znaki
                    </div>
                </div>
                <LoadingButton 
                loading={loading} 
                label="Zapisz" 
                disabled={errors.email || errors.password ? true : false}/>

            </form>
        </div>
    )
}