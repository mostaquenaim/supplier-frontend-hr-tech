import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from './header';

function Drawer(props) {
    const [email, setEmail] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const session = sessionStorage.getItem('email');
            if (session) {
                setEmail(session);
            }
        }
    }, []);

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            sessionStorage.removeItem('email');
            setEmail(null);
            router.push('/supplier/login');
        } catch (error) {
            console.error(error)
        }

    };

    return (
        <>
            <Header title={props.title} />

            <div class="drawer">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content bg-teal-200 ">
                    {/* Page content here */}
                    <label for="my-drawer" class="btn btn-primary drawer-button">
                        <svg
                            class="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <a
                                href="vision"
                                class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-500"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                    <path d="M12 14v7m0-7L3 7l9-5 9 5-9 5z"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Company</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="productList"
                                class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-500"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="productCat"
                                class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-500"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 9l6 6 6-6"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Product Category</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="customerReview"
                                class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-500"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Customer Review</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="support"
                                class="flex items-center p-2 text-gray-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-500"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 2c-5.522 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10zm0 2a8 8 0 100 16 8 8 0 000-16z"></path>
                                    <path d="M12 6v6l4 2"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">Support</span>
                            </a>
                        </li>

                        {/* Profile button */}
                        <li class="p-2">
                            <Link href="updateProfile">
                                <button class="px-2 py-1 text-white bg-gray-800 rounded-md">Profile</button>
                            </Link>
                        </li>

                        {/* Sign Out button */}
                        <li class="p-2">
                            <button class="px-2 py-1 text-white bg-red-500 rounded-md" onClick={handleSignOut}>Sign Out</button>
                        </li>


                        {/* Add more navigation links here */}
                    </ul>
                </div>
            </div>

        </>
    );
}

export default Drawer;

