import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PlantDetail from './plant_detail/detail'
import Greenhouse from './greenhouse/greenhouse'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'
import SignUpForm from './accounts/signup'
import SignInForm from './accounts/signin'
import Homepage from './main/home'

const URL = import.meta.env.VITE_APP_API_HOST
if (!URL) {
    throw Error('VITE_APP_API_HOST was undefined')
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
                    <Route path="signup/">
                        <Route index element={<SignUpForm />} />
                    </Route>
                    <Route path="signin/">
                        <Route index element={<SignInForm />} />
                    </Route>
                    <Route path="homepage/">
                        <Route index element={<Homepage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
