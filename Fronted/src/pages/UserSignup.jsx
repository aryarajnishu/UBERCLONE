
import axios from 'axios';
import React , { useState  , useContext} from 'react';
import { Link , useNavigate } from 'react-router-dom';
import {UserDataContext} from '../context/UserContext';



const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setuserData] = useState({})
  

  const navigate = useNavigate();

  const {user , setUser} = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName,
        },
        email: email,
        password: password,
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
  
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
  
      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-black">Register as a User</h1>
        <form onSubmit={submitHandler}>
          <label className="block text-gray-700">What's your name</label>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 p-2 border rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-1/2 p-2 border rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <label className="block text-gray-700">What's your email</label>
          <input
            type="email"
            placeholder="email@example.com"
            className="w-full p-2 border rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-gray-700">Create Password</label>
          <input
            type="password"
            placeholder="password"
            className="w-full p-2 border rounded-md mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link to={'/login'} className="text-blue-500 cursor-pointer">Login here</Link>
        </p>

        <p className='text-[10px] text-gray-500 mt-10'>
          Uber is the best ride sharing platform offering reliable safe fast affordable travel experiences worldwide, connecting drivers and riders seamlessly with smart technology, excellent service, innovation, convenience, trust, comfort, efficiency
        </p>
      </div>
    </div>
    
  );
};

export default UserSignup;
