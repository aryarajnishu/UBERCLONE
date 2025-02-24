import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserLogin = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ userData, setUserData ] = useState({})

    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate()



    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = {
        email: email,
        password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

        if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
        }

        setEmail('')
        setPassword('')
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-left">FastRide</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            What&apos;s your email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Enter Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            required
                        />
                    </div>
                    <button
                        className="bg-black text-white font-bold py-2 px-4 w-full rounded-3xl focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                {/* <div className="mt-4 text-center">
                    <span className="text-gray-700">Forgot your password? </span>
                    <Link to="/forgot-password" className="text-blue-600 hover:underline">Reset Password</Link>
                </div> */}
                <div className="mt-4 text-center">
                    <span className="text-gray-700">New here? </span>
                    <Link to="/signup" className="text-blue-600 hover:underline">Create new Account</Link>
                </div>
                <div className="mt-6">
                <Link
                    to="/captain-login"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-full rounded-3xl focus:outline-none focus:shadow-outline flex justify-center"
                    type="button"
                >
                    Sign in as Captain
                </Link>

                </div>
            </div>
        </div>
    );
};

export default UserLogin;
