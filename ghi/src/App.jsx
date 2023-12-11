import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PlantDetail from './plant_detail/detail'
import Greenhouse from './greenhouse/greenhouse'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import SignUpForm from './accounts/signup'
import HomePage from './main/home'
import LoginForm from './accounts/login'
<<<<<<< HEAD
import Dashboard from './caredashboard/dashboard'
=======
import PlantCare from './main/PlantCare'
>>>>>>> 4a8498f2c3b871ca1a7275f5b7ee9d07753e6f49

const URL = import.meta.env.VITE_APP_API_HOST
if (!URL) {
    throw Error('VITE_APP_API_HOST was undefined')
}

function App() {
    return (
        <AuthProvider baseUrl={URL}>
            <BrowserRouter>
                <Routes>
                    <Route path="greenhouse">
                        <Route index element={<Greenhouse />} />
                        <Route path=":id/" element={<PlantDetail />} />
                    </Route>
                    <Route path="signup">
                        <Route index element={<SignUpForm />} />
                    </Route>
                    <Route path="login/">
                        <Route index element={<LoginForm />} />
                    </Route>
                    <Route path="/">
                        <Route index element={<HomePage/>} />
                    </Route>
                    <Route path="PlantCare">
                        <Route index element={<PlantCare/>} />
                    </Route>
                    <Route path="dashboard/">
                        <Route index element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
