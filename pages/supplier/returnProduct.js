import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState, useEffect } from "react"
import SessionCheck from '@/pages/components/sessionCheck';
import Drawer from '../components/drawer'

function ReturnProduct() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("")
    const [file, setFile] = useState(null); // State to hold the selected file

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const UserEmail = sessionStorage.getItem('email')
        setEmail(UserEmail)

        const result = await axios.get(`http://localhost:3000/suppliers/findUserByEmail/${UserEmail}`);

        setUser(result.data);
    };


    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('filename', file);
        formData.append('name', data.name);
        formData.append('description', data.description);

        console.log(formData)
        try {
            const response = await axios.post(`http://localhost:3000/suppliers/${user.id}/returnProduct`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Product returned:', response.data);

            setSuccess('successful');
            reset();
        } catch (error) {
            console.error('Error returning product:', error);
        }
    };

    return (
        <>
            <Drawer title="Return Product" />

            <SessionCheck />
            <section className="bg-gray-100 dark:bg-gray-800 h-screen flex justify-center items-center">
                <div className="container mx-auto bg-white shadow-md hover:shadow-lg hover:shadow-black p-6 rounded-lg bg-gradient-to-b from-teal-200 to-cyan-500 h-screen">
                    <div className="text-center mb-4">
                        <h1 className="font-bold text-xl">Return Product</h1>
                        <p className="text-red-500">{success}</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="#">
                        <table className="mx-auto">
                            <tbody>
                                <tr>
                                    <td colSpan="2">
                                        <label className="block text-black text-xl font-bold mb-2">Product name</label>
                                        <input
                                            type="text"
                                            {...register('name', { required: true })}
                                            className="border p-1 rounded w-full focus:outline-none focus:border-blue-500"
                                        />
                                        {errors.name && <p className="text-red-500">This field is required</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <label className="block text-black text-xl font-bold mb-2">Reason</label>
                                        <textarea
                                            type="text"
                                            placeholder='Describe in details why you want to return...'
                                            {...register('description', { required: true })}
                                            className="border p-1 rounded w-full focus:outline-none focus:border-blue-500"
                                        />
                                        {errors.description && <p className="text-red-500">This field is required</p>}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="2">
                                        <label className="block text-black text-xl font-bold mb-2">Upload necessary picture</label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className="border p-1 rounded w-full focus:outline-none focus:border-blue-500"
                                        />

                                        {errors.filename && <p className="text-red-500">This field is required</p>}
                                    </td>
                                </tr>


                                <tr>
                                    <td colSpan="2" className="text-center mt-4">
                                        <button
                                            type="submit"
                                            className="btn bg-blue-400 text-black hover:text-white transition-colors duration-300 ease-in-out"
                                        >
                                            Submit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </section>

        </>
    );
}


export default ReturnProduct;
