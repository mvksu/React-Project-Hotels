import { useEffect, useState } from "react"
import LoadingButton from "../../../../components/UI/LoadingButton/LoadingButton"
import Input from "../../../../components/Input/Input"
import { validate } from "../../../../components/helpers/validateEmail"

export default function AddHotel() {
    const [form, setForm] = useState({
        name: {
            value: '',
            error: 'Default error',
            showError: false,
            rules: ['required', {rule: 'min', length: 4}]
        },
        city: {
            value: '',
            error: '',
            showError: false,
            rules: ['required']
        },
        description: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', {rule: 'min', length: 15}]
        },
        rooms: {
            value: 2,
            error: '',
            showError: false,
            rules: ['required']
        },
        features: {
            value: [],
            error: '',
            showError: false,
            rules: []
        },
        image: {
            value: null,
            error: '',
            showError: false,
            rules: []
        },
        status: {
            value: 0,
            error: '',
            showError: false,
            rules: ['required']
        }
    })

    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(true)


    const submit = e => {
        setLoading(true)
        e.preventDefault()
        setTimeout(() => {
            setLoading(false)
        }, 500)
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
        console.log('efekt')
        setValid(true)
        for (let [, value] of Object.entries(form)) {
            if(!value.value && value.rules[0] === 'required') {
                setValid(false)
            }
            if(value.error) {
                setValid(false)
            }
        }
    } ,[form])

    return (
        <div className="card">
            <div className="card-header">Nowy Hotel</div>
            <div className="card-body">
                <form onSubmit={submit}>
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
                        <LoadingButton label="Dodaj hotel" loading={loading} className="btn-success" disabled={valid ? false : true}/>
                    </div>
                </form>
            </div>
        </div>
    )
}