import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Drawer from '../components/drawer'
import SessionCheck from '../components/sessionCheck';

function CustomerReviews({ customerReviews }) {
    return (
        <>
            <Drawer title="Customer Review" />

            <SessionCheck />
            <div className="container px-5 py-24 mx-auto flex flex-col gap-4 items-center text-center bg-gradient-to-b from-teal-200 to-cyan-500 h-screen">
                <h1 className="text-3xl font-semibold mb-6">Customer Reviews</h1>
                <ul className="grid gap-4">
                    {customerReviews.map((review, index) => (
                        <li key={review.id} className="bg-white p-6 shadow rounded-lg hover:shadow-md hover:shadow-black">
                            <p className="text-gray-800">{index + 1}. {review.review}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:3000/suppliers/customerReviews');
        const customerReviews = response.data;
        return { props: { customerReviews } };
    } catch (error) {
        console.error('Error fetching customer reviews:', error);
        return { props: { customerReviews: [] } };
    }
}

export default CustomerReviews;
