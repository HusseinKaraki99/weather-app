
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Search from '../Components/Search&Unit/Search&Unit';
import axios from 'axios';
import Layout from "../Components/Layout/Layout"
import styles from "../styles/City.module.css"

export async function getServerSideProps(context) {
    const { params } = context;
    let res;
    await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=a41439637ee1644647e713b07dd55a04`
    )
        .then((response) => {
            res = response;
        })

    return {
        props: {
            weather: res.data,
        }
    }
}
export default function City(props) {

    const [current, setCurrent] = useState();
    const [forecast, setForecast] = useState([])
    const weather = props.weather
    const router = useRouter();
    const { query } = router

    useEffect(() => {
        //pass the latitude of the target city to daily forecast request(not possible without latitude)
        const lat = weather.coord.lat
        const lon = weather.coord.lat
        axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,
            minutely&appid=a41439637ee1644647e713b07dd55a04&units=${query.unit}`
        )
            .then((res) => {
                setForecast(res.data.daily)
                setCurrent(res.data.current.temp)
            })
    }, [props.weather])

    const putDate = (i) => {
        const today = new Date()
        const date = new Date(today)
        date.setDate(date.getDate() + i)
        return i === 0 ? "Today" : date.toDateString().substr(0, 10)
    }

    return <>
        <Layout>
            <Search city={weather.name} />
            <div className={styles.container}>
                <div className={styles.details}>
                    <span>{`${weather.name} ' ${weather.sys.country}`}</span>
                    <span className={styles.current}>{current}°</span>
                </div>
                <div className={styles.forecastContainer}>{forecast.map((day, index) => (
                    <div className={styles.forecastDay} key={index}>
                        <p>{putDate(index)}</p>
                        <p>{day.temp.day}°</p>
                    </div>
                ))}
                </div>
            </div>

        </Layout>
    </>
}