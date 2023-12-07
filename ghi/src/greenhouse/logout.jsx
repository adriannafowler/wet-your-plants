import useToken from '@galvanize-inc/jwtdown-for-react'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const { logout } = useToken()
    const navigate = useNavigate()

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
        navigate('/signin')
    }

    return (
        <div>
            <h5>Log out</h5>
            <div>
                <form onSubmit={handleLogout}>
                    <div>Are you sure you want to log out?</div>
                    <button type="submit">Logout</button>
                </form>
            </div>
        </div>
    )
}

export default LogoutButton
