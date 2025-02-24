
import React, { useState , useContext} from 'react'; ;
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';




const Captainlogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { captain, setCaptain } = React.useContext(CaptainDataContext);
    const navigate = useNavigate();
  


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const captain = {
            email:email,
            password:password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
        if(response.status === 200){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');  
        }

        setEmail('');
        setPassword('');   
    };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-6 text-left">FastRide Captain</h2>
            <form onSubmit={handleSubmit}>
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
            <div className="mt-8 text-center">
                <span className="text-gray-700">Join a fleet? </span>
                <Link to="/captain-signup" className="text-blue-600 hover:underline">Register as a Captain</Link>
            </div>
            <div className="mt-6">
            <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 w-full rounded-3xl focus:outline-none focus:shadow-outline flex justify-center"
                type="button"
            >
                Sign in as User
            </Link>

            </div>
        </div>
    </div>
  )
}

export default Captainlogin