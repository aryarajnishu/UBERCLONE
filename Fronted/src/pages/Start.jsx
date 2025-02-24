
import 'react';
import { Link } from 'react-router-dom';
// import './Home.css';

const Start = () => {


    return (
        <div className="h-[100%] w-screen bg-[url('https://static.vecteezy.com/system/resources/previews/037/814/594/non_2x/ai-generated-cyclist-riding-a-bike-on-a-rainy-day-in-the-city-photo.jpg')] bg-cover bg-center">
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                <h1 className="absolute top-0 left-0 font-bold text-4xl m-4">FastRide</h1>
                <h2 className="text-3xl font-bold mb-5 absolute bottom-[100px]">Get Started with Uber</h2>
                <Link
                    to="/login"
                    className="flex items-center justify-center w-1/3 bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-800 absolute bottom-[50px]"
                >
                    Continue 
                </Link>
            </div>
        </div>

        
    );
};

export default Start;
