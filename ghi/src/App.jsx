import { useState, useEffect } from 'react'
import ErrorNotification from './ErrorNotification'
import Construct from './Construct'
import './App.css'

console.log(import.meta.env)

function App() {
    const [launchInfo, setLaunchInfo] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            let url = `${import.meta.env.VITE_API_HOST}/api/launch-details`
            console.log('fastapi url: ', url)
            let response = await fetch(url)
            console.log('------- hello? -------')
            let data = await response.json()

            if (response.ok) {
                console.log('got launch data!')
                setLaunchInfo(data.launch_details)
            } else {
                console.log('drat! something happened')
                setError(data.message)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <ErrorNotification error={error} />
            <Construct info={launchInfo} />
        </div>
    )
}

export default App
