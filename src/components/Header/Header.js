import styles from './Header.module.css';
import withMousePosition from '../hoc/withMousePosition';

function Header(props) {
    const paralaxStyle = {
        transform: `translate(
            ${props.mouseX / -20}px, 
            ${props.mouseY / 120}px)`
    };

    return (
        <header 
            className={`${styles.header} `}>
            <div className={styles.headerImage} style={paralaxStyle}></div>
            {props.children}
        </header>
    );
}

export default withMousePosition(Header);