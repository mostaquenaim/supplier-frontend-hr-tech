import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import SessionCheck from '../components/sessionCheck';
import Drawer from '../components/drawer';

export default function Index() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null); // State to hold the selected file

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('filename', file); // Append the selected file to the FormData

            await axios.post(`http://localhost:3000/suppliers/${email}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }, // Set proper headers for file upload
            });

            setSuccess('Successfully uploaded file.');
            router.push('updateProfile')

        } catch (error) {
            setSuccess('Error uploading file: ' + error);
        }
    };

    useEffect(() => {
        const UserEmail = sessionStorage.getItem('email');
        setEmail(UserEmail);
    }, []);

    return (
        <>
            <Drawer title="file upload" />
            <SessionCheck />

            <section>
                <p>{success}</p>
                <div>
                    <input type="file" name="filename" onChange={handleFileChange} />
                </div>

                <button
                    onClick={handleUpdate}
                    className="btn bg-blue-400 text-black hover:text-white"
                >
                    Update
                </button>
            </section>
        </>
    );
}
