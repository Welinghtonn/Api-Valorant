import axios from "axios";
import React, { useState, useEffect } from "react";
import { Mosaic } from "react-loading-indicators";
import ReactPlayer from 'react-player'
import Header from "../components/header";
import PorDosOL from "../assets/por-do-sol.jpg"
import "../style/slugSkin.css"

export const SlugSkinScreen = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
        const product = urlParams.get('id')

        async function fetch() {
            setLoading(true);
            try {
                await axios.get(`https://valorant-api.com/v1/weapons/skins/${product}`)
                    .then((res) => {
                        console.log(res);
                        setData(res.data.data)
                    })
            } catch (error) {
                console.log(`Error no home.jsx/fetchSkins`, error)
            } finally {
                setLoading(false);
            }
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return (
            <div className="ContainerLoading">
                <Mosaic color="#ffffff" size="medium" text="" textColor="" />
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className="apresentation-site">
                <figure>
                    <img src={PorDosOL} alt="" />
                    <figcaption> <h1>Enjoy the previews</h1></figcaption>
                </figure>
            </div>
            <div className="main">
                <h2>Chromas</h2>
                <div className="containerSlug">
                    {data?.chromas.map((item) =>
                        <>
                                {item.streamedVideo &&
                                    <ReactPlayer
                                        className="video"
                                        url={item.streamedVideo}
                                        controls
                                        width={420}
                                        height={300}
                                        p={item.displayName}
                                    />
                                }
                        </>
                    )}
                </div>
                <h2>Levels</h2>
                <div className="containerSlug">
                    {data?.levels.map((item) =>
                        <div>
                            <h2>{item.displayName}</h2>
                            {item.streamedVideo &&
                                <ReactPlayer
                                    url={item.streamedVideo}
                                    controls
                                />
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}