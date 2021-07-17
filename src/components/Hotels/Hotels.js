import { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import Hotel from './Hotel/Hotel'
import styles from './Hotels.module.css'

const propTypes = {
    hotels: PropTypes.array.isRequired
}

function Hotels(props) {
    const count = props.hotels.length

    useEffect(() => console.log('hotels renderr'))

    return (
        <div className={`${styles.container}`}>
            <h2 className={styles.title}>Oferty: ({count})</h2>
            {props.hotels.map(hotel =>
                <Hotel
                    onOpen={props.onOpen}
                    key={hotel.id} {...hotel}
                />)}
        </div>
    )
}


Hotels.propTypes = propTypes;

const areEqual = (prevProps, nextProps) => {
    return prevProps.hotels === nextProps.hotels ? true : false
}


export default memo(Hotels, areEqual);