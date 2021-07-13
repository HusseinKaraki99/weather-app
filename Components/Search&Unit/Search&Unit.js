import { useState, useEffect } from 'react';
import styles from "./Search.module.css"
import { useRouter } from 'next/router'

export default function Search(props) {

    const [city, setCity] = useState(props.city ? props.city : "")
    const [goCity, setGoCity] = useState(false);
    const [converter, setConverter] = useState(false);

    const router = useRouter();

    const changeConverter = () => {
        setConverter(!converter)
        setGoCity(true)
    }

    useEffect(() => {

        const data = localStorage.getItem('unit')

        if (data) {
            setConverter(JSON.parse(data))
        }

    }, [])

    useEffect(() => {
        if (goCity) {
            router.push({
                pathname: `/${city}`,
                query: {
                    unit: !converter ? "metric" : "imperial"
                }
            })
            setGoCity(false);
            localStorage.setItem('unit', JSON.stringify(converter))
        }
    })
    return <>
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Search for a city"
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={(e) => {
                        e.key === "Enter"
                            ? setGoCity(true)
                            : setGoCity(false)
                    }
                    }
                ></input>
                <button className={styles.searchGo} onClick={() => setGoCity(true)}>GO</button>
            </div>
            <div className={styles.units}>
                <button className={!converter ? `${styles.btn} ${styles.btnCircle} ${styles.active}` : `${styles.btn} ${styles.btnCircle}`}
                    onClick={converter ? changeConverter : null}>°C</button>
                <button className={converter ? `${styles.btn} ${styles.btnCircle} ${styles.active}` : `${styles.btn} ${styles.btnCircle}`}
                    onClick={!converter ? changeConverter : null}>°F</button>
            </div>
        </div>




    </>
}