import React from 'react';
import axios from 'axios';
import SessionCheck from '@/pages/components/sessionCheck';
import Drawer from '../components/drawer'

function Products({ products }) {
    return (
        <>
                <Drawer title="Product Categories"/>

        <SessionCheck/>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-teal-200 to-cyan-500 h-screen">
                <div className="w-full max-w-lg p-5 bg-white rounded shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Product Categories</h1>
                    <ul className="space-y-2">
                        {products.map(product => (
                            <li key={product.id} className="border rounded p-2 hover:bg-gray-100 transition">
                                {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const response = await axios.get('http://localhost:3000/suppliers/productCategories');
        const products = response.data;
        return { props: { products } };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { props: { products: [] } };
    }
}

export default Products;
