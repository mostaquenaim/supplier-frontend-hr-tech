import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState } from "react"
import MyHeader from '../components/header';

function CreateSupplier() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [success, setSuccess] = useState('')

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/suppliers/create', data);
            console.log('User created:', response.data);

            setSuccess('supplier add successfully');
            reset();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>

            <MyHeader title="Register" />

            <section className="flex flex-col md:flex-row h-screen items-center text-center justify-evenly
              bg-[url('/supplier.jpg')]
              gap-5">

                <div className='bg-white p-5 shadow-lg rounded-lg hover:shadow-2xl hover:shadow-black'>

                    {/* Form start */}
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" action="#" className="max-w-md mx-auto">

                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="2">
                                        <h1 className='font-bold text-black text-xl'>Create New Deliveryman Account</h1>
                                        <p>{success}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Username</label>
                                    </td>
                                    <td>
                                        <input className="input input-bordered input-success w-full max-w-xs text-white" type="text" {...register('username', { required: true })} />
                                        {errors.username && <p>This field is required</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>First Name</label>
                                    </td>
                                    <td>
                                        <input className="input input-bordered input-success w-full max-w-xs text-white" type="text" {...register('firstName', { required: true })} />
                                        {errors.firstName && <p>This field is required</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Last Name</label>
                                    </td>
                                    <td>
                                        <input className="input input-bordered input-success w-full max-w-xs text-white" type="text" {...register('lastName', { required: true })} />
                                        {errors.lastName && <p>This field is required</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Email</label>
                                    </td>
                                    <td>
                                        <input className="input input-bordered input-success w-full max-w-xs text-white" type="email" {...register('email', { required: true })} />
                                        {errors.email && <p>This field is required</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Password</label>
                                    </td>
                                    <td>
                                        <input className="input input-bordered input-success w-full max-w-xs text-white" type="password" {...register('password', { required: true })} />
                                        {errors.password && <p>This field is required</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <button className='btn bg-green-50' type="submit">Create User</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <p className="mt-4">
                        Have an account?{' '}
                        <a className="text-blue-500" href="/supplier/login">
                            Login here
                        </a>
                    </p>
                </div>
            </section>
        </>
    );

}

export default CreateSupplier;
