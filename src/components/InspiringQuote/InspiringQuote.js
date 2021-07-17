import { useEffect, useState, useLayoutEffect } from "react";

const quotes = [
    "Physically, yes, I could fight a bird. But emotionally? Imagine the toll. - Albert Einstein",
    "So apparently the 'bad vibes' I’ve been feeling are actually severe psychological distress",
    "I’ve come to a point in my life where I need a stronger word than fuck",
    "When someone points at your black clothes and asks whose funeral it is, having a look around the room and saying 'Haven’t decided yet' is typically a good response."
]

const styles = {
    position: 'absolute',
    top: '20px',
    padding: '10px',
    left: 0,
    right: 0,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center'
}

function InspiringQuote(props) {
    const [quote, setQuote] = useState("Ładowanie cytatu...")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    useLayoutEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }, [loading])

    return (
        <p style={styles}>{quote}</p>
    )
}
export default InspiringQuote;