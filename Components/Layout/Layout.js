
import styles from './Layout.module.css'
import Nav from "../Nav/Nav"




export default function Layout(props) {
    return <>
        <Nav />

        <div className={styles.container}>
            {props.children}
        </div>

    </>
}
