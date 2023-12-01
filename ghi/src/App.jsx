import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import PlantDetail from './plant_detail/detail';


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="greenhouse/">
                        {/* <Route index element={<Greenhouse />} /> */}
                        <Route path=":id/" element={<PlantDetail />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
