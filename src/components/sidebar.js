import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faUser, faGift, faUserPlus, faFlask, faBox } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    const location = useLocation(); // Hook to get the current location

    // Function to determine if the link is active based on the current location
    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <div className={`transform top-0 flex justify-between flex-col left-0 w-64 bg-white text-gray-600 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div>
                    <div className='m-3'>
                        <a aria-label="Capitalmind Header Logo" href="/">
                            <svg width={147} height={40} viewBox="0 0 217 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M62.5227 11.039C66.799 11.039 69.4629 13.425 70.2691 16.925L66.4266 17.9163C66.1475 16.0574 64.9396 14.5086 62.5851 14.5086C60.2306 14.5086 58.4337 16.3674 58.4337 19.1562C58.4337 21.945 60.0754 23.8038 62.5851 23.8038C64.9396 23.8038 66.0243 22.4401 66.4266 20.4265L70.2691 21.3869C69.5253 24.8874 66.8294 27.2734 62.5227 27.2734C58.0613 27.2734 54.5293 23.9281 54.5293 19.1562C54.5293 14.3843 58.0613 11.039 62.5227 11.039Z" fill="currentColor" /><path d="M78.4759 24.0513C81.2027 24.0513 82.7201 22.4396 82.7201 20.3326V19.9613L78.0117 20.5193C76.5546 20.7045 75.8423 21.3559 75.8423 22.2539C75.8423 23.3071 76.7413 24.0513 78.4759 24.0513ZM79.6534 11.0385C83.7434 11.0385 86.624 13.4244 86.624 17.1421V26.8391H82.7825V24.6708H82.3488C81.8531 25.6925 80.769 27.2728 77.5155 27.2728C74.0459 27.2728 71.7523 25.414 71.7523 22.47C71.7523 20.0227 73.8907 18.3191 76.8336 18.0091L82.7201 17.3582V16.8631C82.7201 15.438 81.6669 14.1981 79.4986 14.1981C78.6332 14.1981 77.0147 14.3925 76.094 16.3633L72.9344 14.4415C74.1429 12.676 75.5638 11.0385 79.6534 11.0385Z" fill="currentColor" /><path d="M101.833 19.1557C101.833 16.1812 99.9732 14.5081 97.6187 14.5081C95.2023 14.5081 93.4053 16.2426 93.4053 19.1557C93.4053 22.0687 95.2023 23.8033 97.6187 23.8033C99.9732 23.8033 101.833 22.1301 101.833 19.1557ZM89.5015 11.4722H93.3435V13.6405H93.7767C94.5818 12.3398 95.945 11.0385 98.6719 11.0385C102.514 11.0385 105.736 14.4467 105.736 19.1557C105.736 23.8646 102.514 27.2728 98.6719 27.2728C95.945 27.2728 94.5818 25.9715 93.7767 24.6708H93.4053V31.0122H89.5015V11.4722Z" fill="currentColor" /><path d="M112.379 26.8391H108.476V11.4722H112.379V26.8391ZM110.427 4.34533C111.977 4.34533 113.185 5.43 113.185 7.01032C113.185 8.59012 111.977 9.67478 110.427 9.67478C108.878 9.67478 107.67 8.59012 107.67 7.01032C107.67 5.43 108.878 4.34533 110.427 4.34533Z" fill="currentColor" /><path d="M116.887 11.4722V6.80911H120.791V11.4722H123.53V14.7561H120.791V22.6252C120.791 23.2457 121.1 23.5551 121.658 23.5551H124.136V26.839H119.923C118.188 26.839 116.887 25.5991 116.887 23.8646V14.7561H115.298V11.4722H116.887Z" fill="currentColor" /><path d="M154.209 11.4724V13.765H154.643C155.293 12.277 156.563 11.2243 158.701 11.2243C160.684 11.2243 162.14 12.277 162.791 13.8258H163.225C163.906 12.4013 165.145 11.2243 167.594 11.2243C170.413 11.2243 172.675 13.3621 172.675 16.5537V26.8392H168.77V16.8632C168.77 15.4381 167.748 14.632 166.261 14.632C164.65 14.632 163.473 15.5624 163.473 17.4821V26.8392H159.568V16.8632C159.568 15.4381 158.546 14.632 157.059 14.632C155.448 14.632 154.271 15.5624 154.271 17.4821V26.8392H150.366V11.4724H154.209Z" fill="currentColor" /><path d="M179.459 26.8391H175.555V11.4722H179.459V26.8391ZM177.506 4.34533C179.056 4.34533 180.264 5.43 180.264 7.01032C180.264 8.59012 179.056 9.67478 177.506 9.67478C175.957 9.67478 174.749 8.59012 174.749 7.01032C174.749 5.43 175.957 4.34533 177.506 4.34533Z" fill="currentColor" /><path d="M186.17 11.5867V14.0645H186.604C187.223 12.6394 188.649 11.3386 191.468 11.3386C194.876 11.3386 197.448 13.7859 197.448 17.7821V26.9535H193.544V18.1545C193.544 16.0167 192.304 14.7463 190.074 14.7463C187.564 14.7463 186.232 16.2957 186.232 19.022V26.9535H182.328V11.5867H186.17Z" fill="currentColor" /><path d="M204.17 19.1556C204.17 22.1301 206.029 23.8032 208.384 23.8032C210.801 23.8032 212.598 22.0687 212.598 19.1556C212.598 16.2426 210.801 14.508 208.384 14.508C206.029 14.508 204.17 16.1812 204.17 19.1556ZM216.502 26.839H212.66V24.6707H212.226C211.421 25.9715 210.057 27.2728 207.331 27.2728C203.489 27.2728 200.266 23.8646 200.266 19.1556C200.266 14.4466 203.489 11.0384 207.331 11.0384C210.057 11.0384 211.421 12.3397 212.226 13.6405H212.598V6.80965H216.502V26.839Z" fill="currentColor" /><path d="M143.578 6.80965H147.488V26.839H143.578V6.80965Z" fill="currentColor" /><path d="M132.556 24.0462C135.283 24.0462 136.801 22.4344 136.801 20.3275V19.9562L132.092 20.5142C130.636 20.6994 129.923 21.3508 129.923 22.2488C129.923 23.3014 130.822 24.0462 132.556 24.0462ZM133.734 11.0333C137.824 11.0333 140.705 13.4193 140.705 17.137V26.8339H136.863V24.6657H136.429C135.934 25.6874 134.85 27.2677 131.597 27.2677C128.127 27.2677 125.833 25.4089 125.833 22.4649C125.833 20.0175 127.971 18.3139 130.914 18.004L136.801 17.3531V16.8579C136.801 15.4329 135.748 14.193 133.579 14.193C132.714 14.193 131.095 14.3874 130.175 16.3582L127.015 14.4364C128.223 12.6709 129.644 11.0333 133.734 11.0333Z" fill="currentColor" /><path d="M25.1587 24.5326C18.3794 23.6057 13.6354 17.3582 14.5628 10.5789C15.0254 7.1986 16.8141 4.32937 19.3285 2.41174L25.6693 11.7075L32.5961 11.7621L32.542 0H17.6832C7.91706 0.00051577 0 7.91758 0 17.6842C0 27.4503 7.91706 35.3679 17.6837 35.3679C26.0871 35.3679 33.116 29.5046 34.9161 21.6474C32.3197 23.8796 28.8176 25.0334 25.1587 24.5326Z" fill="currentColor" /><path d="M48.0872 30.5599C48.1919 27.2223 45.4475 24.4836 42.1089 24.4464C38.7698 24.4093 36.2487 27.0583 36.2632 30.3592C36.2714 32.298 37.0817 33.7607 38.727 34.8475C39.9834 35.6778 41.5916 35.9636 42.7036 35.4262L40.3233 38.578L42.212 40L47.3048 33.2568C47.7834 32.5657 48.0526 31.6677 48.0872 30.5599Z" fill="currentColor" /></svg>
                        </a>
                    </div>
                    <ul className="mt-10">
                        <li className="p-4 flex items-center">
                            <Link to="/" className={`hover:text-blue-700 active:bg-gray-200 flex items-center w-full p-2 rounded ${isActive('/') ? 'bg-gray-200' : ''}`}>
                                <FontAwesomeIcon icon={faHome} className="mr-2" /> Home
                            </Link>
                        </li>
                        <li className="p-4 flex items-center">
                            <Link to="/portfolio" className={`hover:text-blue-700 active:bg-gray-200 flex items-center w-full p-2 rounded ${isActive('/portfolio') ? 'bg-gray-200' : ''}`}>
                                <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> Portfolio
                            </Link>
                        </li>
                        <li className="p-4 flex items-center">
                            <Link to="/" className={`hover:text-blue-700 active:bg-gray-200 flex items-center w-full p-2 rounded ${isActive('') ? 'bg-gray-200' : ''}`}>
                                <FontAwesomeIcon icon={faFlask} className="mr-2" /> Experimentals
                            </Link>
                        </li>
                        <li className="p-4 flex items-center">
                            <Link to="/" className={`hover:text-blue-700 active:bg-gray-200 flex items-center w-full p-2 rounded ${isActive('') ? 'bg-gray-200' : ''}`}>
                                <FontAwesomeIcon icon={faBox} className="mr-2" /> Slack Archives
                            </Link>
                        </li>
                        <li className="p-4 flex items-center">
                            <Link to="/" className={`hover:text-blue-700 active:bg-gray-200 flex items-center w-full p-2 rounded ${isActive('') ? 'bg-gray-200' : ''}`}>
                                <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Refer A friend
                            </Link>
                        </li>
                        <li className="p-4 flex items-center">
                            <Link to="/" className={`hover:text-blue-700 active:bg-gray-200 flex items-center w-full p-2 rounded ${isActive('') ? 'bg-gray-200' : ''}`}>
                                <FontAwesomeIcon icon={faGift} className="mr-2" /> Gift A Subscription
                            </Link>
                        </li>
                        <li className="p-4 flex items-center">
                            <Link to="/" className={`hover:text-blue-700 active:bg-gray-200 flex items-center w-full p-2 rounded ${isActive('') ? 'bg-gray-200' : ''}`}>
                                <FontAwesomeIcon icon={faUser} className="mr-2" /> Account
                            </Link>
                        </li>
                    </ul>

                <div className='flex px-5 items-center mt-28 justify-between'>
                    <div className='w-10 h-10 rounded-full bg-green-400'></div>
                    <div className='text-right'>
                        <p>CMP1Y</p>
                        <p>Valid till Apr 10, 2025</p>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Sidebar;
