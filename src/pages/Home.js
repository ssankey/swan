import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LatestPosts from '../components/LatestPosts';

const Home = () => {
    return (
        <div>
           <h1 className='text-xl md:text-2xl font-bold my-2'>Home</h1>
            <div className='flex flex-col md:flex-row gap-3'>
                <div className='flex-1 border border-gray-300 rounded-xl shadow-lg bg-white p-5'>
                    <div className='flex justify-between items-center'>
                        <h1>Get Started</h1>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </div>
                    <p>Read our getting started guide to get the most out of your Capitalmind Subscription</p>
                    <button className="text-blue-600 hover:text-blue-800">Learn More</button>
                </div>
                <div className='flex-1 border border-gray-300 rounded-xl shadow-lg bg-white p-5'>
                    <div className='flex justify-between items-center'>
                        <h1>Get Started</h1>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </div>
                    <p>Read our getting started guide to get the most out of your Capitalmind Subscription</p>
                    <button className="text-blue-600 hover:text-blue-800">Learn More</button>
                </div>
                <div className='flex-1 border border-gray-300 rounded-xl shadow-lg bg-white p-5'>
                    <div className='flex justify-between items-center'>
                        <h1>Get Started</h1>
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </div>
                    <p>Read our getting started guide to get the most out of your Capitalmind Subscription</p>
                    <button className="text-blue-600 hover:text-blue-800">Learn More</button>
                </div>
            </div>
            <h1 className='text-xl md:text-2xl font-bold mt-6 my-2'>Latest Posts</h1>

            <LatestPosts />
        </div>
    );
};

export default Home;
