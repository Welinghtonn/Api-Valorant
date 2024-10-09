import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import Visualizar from "../pages/Visualizar"
import { SlugSkinScreen } from "../pages/slugSkin"

export const Rotas = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path='/visualizar' element={<Visualizar />} />
            <Route path='/visualizar/:id' element={<SlugSkinScreen/>}/>
        </Routes>
    )
}