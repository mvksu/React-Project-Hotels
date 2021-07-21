import { useRef } from "react"


const InputText = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input
                value={props.value}
                type={props.type}
                onChange={e => props.onChange(e.target.value)}
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    )
}

const InputTextarea = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <textarea
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    )
}

const InputSelect = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <select
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}>
                {props.options.map(x =>
                    <option value={x.value} key={x.value}>{x.label}</option>
                )}
            </select>
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    )
}

const InputCheckbox = props => {

    const toggleFeature = e => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        const copied = props.values

        if (isChecked) {
            console.log('checked', value)
            const newFeatures = copied.concat(value)
            props.onChange(newFeatures)
        } else {
            console.log('unchecked', value)
            const newFeatures = props.values.filter(x => x !== value)
            props.onChange(newFeatures)
        }

    }

    return (
        <>
            <h3>{props.label}</h3>
            <div className="form-group">
                {props.options.map(opcja =>
                    <div className="form-check p-0" key={opcja.value}>
                        <input
                            type='checkbox'
                            className="mr-1"
                            value={opcja.value}
                            checked={props.values.find(x => x === opcja.value) ?? false}
                            onChange={toggleFeature}
                            key={opcja.value}
                        />
                        <label>{opcja.value}</label>
                    </div>
                )}

            </div>
        </>
    )
}

const InputFile = props => {
    const fileRef = useRef()
    const changeHandler = (e) => {
        props.onChange(e.target.files[0])
    }
    return (
        <>
            <h3>{props.label}</h3>
            <div className="form-group">
                <input
                    type="file"
                    ref={fileRef}
                    onChange={changeHandler}>
                </input>
            </div>
        </>
    )
}

const InputRadio = props => {
    return (
        <>
            <h3>{props.label}</h3>
            <div className="form-group">
                {props.options.map(x => (
                    <div className="form-check" key={`radio-${x.value}`}>
                        <input
                            value={x.value}
                            className="form-check-input"
                            checked={props.values === x.value}
                            onChange={e => props.onChange(e.target.value)}
                            type="radio"
                            name={props.label}
                            id={`radio-${x.value}`}
                            key={`radio-${x.value}`} />
                        <label className="form-check-label" htmlFor={`radio-${x.value}`}>
                            {x.label}
                        </label>
                    </div>
                ))}

            </div>
        </>
    )
}


export default function Input(props) {
    // eslint-disable-next-line default-case
    switch (props.type) {
        case 'select':
            return <InputSelect {...props} />
        case 'password':
            return <InputText {...props} type="password" />
        case 'email':
            return <InputText {...props} type="email" />
        case 'checkbox':
            return <InputCheckbox {...props} />
        case 'file':
            return <InputFile {...props} />
        case 'radio':
            return <InputRadio {...props} />
        case 'textarea':
            return <InputTextarea {...props} />
        default:
            return <InputText {...props} />
    }

}

Input.defaultProps = {
    type: 'text',
    isValid: false,
    showError: false
}