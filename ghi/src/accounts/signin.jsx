// import React, { useState } from 'react'
// import useToken from '@galvanize-inc/jwtdown-for-react'

// const SignInForm = () => {
//     const [username, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const { login } = useToken()

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         login(username, password)
//         e.target.reset()
//     }

//     return (
//         <div>
//             <h2>Sign In</h2>
//             <form onSubmit={(e) => handleSubmit(e)}>
//                 <label htmlFor="username">Email:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     value={username}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />

//                 <button type="submit">Sign In</button>
//             </form>
//         </div>
//     )
// }

// export default SignInForm
// // confirm password zipcode name put things in a formdata

import useToken from '@galvanize-inc/jwtdown-for-react'
import { useState } from 'react'

const SignInForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useToken()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
        e.target.reset()
    }

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input
                            name="username"
                            type="text"
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Login"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignInForm
