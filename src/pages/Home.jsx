import axios from "axios";
import React, { useEffect, useState } from "react";
import '../style/card.css';
import '../style/home.css';
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { Riple } from "react-loading-indicators";
import PorDosOL from "../assets/por-do-sol.jpg"

export const Home = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            try {
                await axios.get(`https://valorant-api.com/v1/weapons`)
                    .then((res) => {
                        console.log(res.data.data)
                        setData(res.data.data)
                    })
            } catch (error) {
                console.log(`Error no home.jsx/fetchGuns`, error)
            } finally {
                setLoading(false);
            }
        }

        fetch()
    }, [])

    if (loading) {
        return (
            <div className="ContainerLoading">
                <Riple color="#ffffff" size="medium" text="" textColor="" />

            </div>
        )
    }

    return (
        <>
            <Header />
            <div className="apresentation-site">
                <figure>
                    <img src={PorDosOL} alt="" />
                    <figcaption> <h1>Enjoy the website</h1></figcaption>
                </figure>
            </div>
            <div className="main">
                <div className="container">
                    {data?.map((item, index) => {
                        const category = item.category;
                        const categoryName = category.split("::").pop()
                        return (
                            <div className="card" onClick={() => navigate(`visualizar?id=${item.uuid}`)}>
                                <div className="containerImg">
                                    <img src={item.displayIcon} alt="" className="img" />
                                </div>
                                <div className="container-details-weapon">
                                    <h2 className="title">{item.displayName}</h2>
                                    <h5>{categoryName}</h5>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    );
}
