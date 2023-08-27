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

    const [users, setUsers] = useState([]);
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

        const result = await axios.get(`http://localhost:3000/suppliers/${UserEmail}/returnedProducts`);

        setUsers(result.data);
    };


    const [success, setSuccess] = useState('')



    return (
        <>
            <Drawer title="Return Product" />

            <SessionCheck />
            <div className='flex items-center text-center justify-center bg-teal-200 text-5xl text-extrabold text-black'>
                <h1>
                    Return History
                </h1>
            </div>
            <div className='bg-gradient-to-b from-teal-200 to-cyan-500 h-screen'>
                {users.map((user) => (
                    <div key={user.id} className="mb-4">
                        <div className="border p-4 rounded cursor-pointer">
                            <div className="flex flex-col items-center text-center justify-center">
                                <div className="my-2">
                                    {user.filename && (
                                        <img
                                            className="h-48 rounded-lg shadow-md"
                                            src={"http://localhost:3000/suppliers/getImage/" + user.filename}
                                            alt="User Image"
                                        />
                                    )}
                                </div>
                                <div className="mt-2">
                                    <p className="font-semibold text-lg">Product Name: {user.name}</p>
                                    <p className="text-black text-lg">Description: {user.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



        </>
    );
}


export default ReturnProduct;
