import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PlantDetail from './plant_detail/detail'
import Greenhouse from './greenhouse/greenhouse'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import SignUpForm from './accounts/signup'
import HomePage from './main/home'
import LoginForm from './accounts/login'
import Dashboard from './caredashboard/dashboard'

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
                        <Route index element={<HomePage />} />
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
