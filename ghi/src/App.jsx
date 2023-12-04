import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'
import PlantDetail from './plant_detail/detail'
import Greenhouse from './greenhouse/greenhouse'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import LoginForm from './accounts/signin'

function App() {
    return (
        <div>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="login">
                            <Route index element={<LoginForm />} />
                        </Route>
                        <Route path="greenhouse/">
                            <Route index element={<Greenhouse />} />
                            <Route path=":id/" element={<PlantDetail />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    )
}

export default App
