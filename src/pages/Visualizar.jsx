import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import '../style/card.css';
import '../style/home.css';
import { Riple } from "react-loading-indicators";
import PorDosOL from "../assets/por-do-sol.jpg"
import Header from "../components/header";

const Visualizar = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);
        const product = urlParams.get('id')

        async function fetch() {
            setLoading(true);
            try {
                await axios.get(`https://valorant-api.com/v1/weapons/${product}`)
                    .then((res) => {
                        console.log(res.data.data.skins);
                        setData(res.data.data.skins)
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
                    <figcaption> <h1>Enjoy the skins</h1></figcaption>
                </figure>
            </div>
            <div className="main">
                <div className="container">
                    {data?.filter(item => !item.displayName.includes("Standard") && !item.displayName.includes("Random") && !item.displayName.includes("Luxe") && !item.displayName.includes("Melee")).map((item, index) => (
                        <>
                            {item.displayIcon && (<div key={index}>
                                <div className="card">
                                    <div className="card" onClick={() => navigate(`${convertString(item.displayName)}?id=${item.uuid}`)}>
                                        <div className="containerImg">
                                            <img className="img" src={item.displayIcon} alt={item.displayName} />
                                        </div>
                                        <div className="container-details-weapon">
                                            <h8 className="titleSkin">{item.displayName}</h8>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Visualizar

function convertString(string) {
    const normalized = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Substitui espaços por hífens e converte para minúsculas
    return normalized.replace(/\s+/g, '-').toLowerCase();
}