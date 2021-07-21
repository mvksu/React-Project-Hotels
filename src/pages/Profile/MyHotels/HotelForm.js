import Input from "../../../components/Input/Input"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import { validate } from "../../../components/helpers/validateEmail"
import { useState, useEffect } from "react"
import useAuth from "../../../hooks/useAuth"


const HotelForm = (props) => {
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(true)
    const [auth] = useAuth()
    const [form, setForm] = useState({
        name: {
            name: 'name',
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 4 }]
        },
        city: {
            name: 'city',
            value: '',
            error: '',
            showError: false,
            rules: ['required']
        },
        description: {
            name: 'desc',
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 15 }]
        },
        rooms: {
            name: 'rooms',
            value: 2,
            error: '',
            showError: false,
            rules: ['required']
        },
        features: {
            name: 'features',
            value: [],
            error: '',
            showError: false,
            rules: []
        },
        image: {
            name: 'img',
            value: null,
            error: '',
            showError: false,
            rules: []
        },
        status: {
            name: 'status',
            value: 0,
            error: '',
            showError: false,
            rules: ['required']
        },
        user_id : {
            value: '',
            rules: []
        },
        rating: {
            value: '',
            rules: []
        }
    })

    const submit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            props.onSubmit({
                name: form.name.value,
                city: form.city.value,
                description: form.description.value,
                rooms: form.rooms.value,
                features: form.features.value,
                image: form.image.value,
                status: form.status.value,
                user_id: auth.userId
            })
        } catch (ex) {
            console.log(ex.response)
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

    useEffect(() => {
        setValid(true)
        for (let [, value] of Object.entries(form)) {
            if (!value.value && value.rules[0] === 'required') {
                setValid(false)
            }
            if (value.error) {
                setValid(false)
            }
        }
    }, [form])

    useEffect(() => {
        const newForm = {...form}
        for(const key in props.hotel) {
            newForm[key].value = props.hotel[key]
        }
        setForm(newForm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.hotel])

    return (
        <form onSubmit={submit}>
            <p className="text-muted">Hotel dodany przez: ${form.user_id.value}</p>
            <Input
                label="Nazwa"
                value={form.name.value}
                onChange={value => changeHandler(value, 'name')}
                error={form.name.error}
                showError={form.name.showError}
            />
            <Input
                label="Opis"
                value={form.description.value}
                onChange={value => changeHandler(value, 'description')}
                type="textarea"
                error={form.description.error}
                showError={form.description.showError}
            />
            <Input
                label="Miejscowość"
                value={form.city.value}
                onChange={value => changeHandler(value, 'city')}
                error={form.city.error}
                showError={form.city.showError}
            />

            <Input
                label="Ilość pokoi"
                value={form.rooms.value}
                onChange={value => changeHandler(value, 'rooms')}
                type="select"
                options={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 }]}
                error={form.rooms.error}
                showError={form.rooms.showError}
            />

            <Input
                type="checkbox"
                label="Udogodnienia"
                values={form.features.value}
                onChange={value => changeHandler(value, 'features')}
                options={[
                    { value: "Parking", label: "Parking" },
                    { value: "TV", label: "TV" },
                    { value: "Wi-Fi", label: "Wi-Fi" },
                    { value: "Jacuzzi", label: "Jacuzzi" },
                ]}
                error={form.features.error}
                showError={form.features.showError}
            />

            <Input
                type="file"
                label="Zdjęcia"
                onChange={value => changeHandler(value, 'image')} />

            <Input
                type="radio"
                label="Status"
                values={form.status.value}
                onChange={value => changeHandler(value, 'status')}
                options={[
                    { value: "1", label: "Aktywny" },
                    { value: "0", label: "Nieaktywny" },
                ]}
                error={form.status.error}
                showError={form.status.showError}
            />
            <div className="text-right">
                <LoadingButton label={props.buttonText} loading={loading} className="btn-success" disabled={valid ? false : true} />
            </div>
        </form>

    )
}

export default HotelForm