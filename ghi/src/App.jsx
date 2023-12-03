import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import PlantDetail from './plant_detail/detail'
import Greenhouse from './greenhouse/greenhouse'
import { AuthProvider } from "./authorization/authorization";



const URL = import.meta.env.VITE_APP_API_HOST;
if (!URL) {
    throw Error("VITE_APP_API_HOST was undefined");
}


function App() {
    return (
        <AuthProvider baseUrl={URL}>
            <BrowserRouter>
                <Routes>
                    <Route path="greenhouse/">
                        <Route index element={<Greenhouse />} />
                        <Route path=":id/" element={<PlantDetail />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        // </AuthProvider>
    )
}

export default App