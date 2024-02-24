import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

export type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: 'User Registered Successfully!', type: 'SUCCESS' });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="firstName" className="text-gray-500 text-sm font-bold flex-1">
                    First Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" {
                        ...register("firstName", {
                            required: "Firstname is required"
                        })
                    } />
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label htmlFor="lastName" className="text-gray-500 text-sm font-bold flex-1">
                    Last Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" {
                        ...register("lastName", {
                            required: "Lastname is required"
                        })
                    } />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>

            <label htmlFor="email" className="text-gray-500 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" {
                    ...register("email", {
                        required: "Email is required"
                    })
                } />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            <label htmlFor="password" className="text-gray-500 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" {
                    ...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at atleast 6 characters"
                        }
                    })
                } />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>

            <label htmlFor="Confirm Password" className="text-gray-500 text-sm font-bold flex-1">
                Confirm Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" {
                    ...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) return "Confirm Password is required"
                            else if (watch("password") !== val) return "Password do not match with confirm password"
                        }
                    })
                } />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>

            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Already a member? <Link className="underline" to="/sign-in">Sign into your account</Link>
                </span>
                <button type="submit" className="bg-blue-500 border rounded text-white p-3 hover:bg-blue-800 text-l">Create Account</button>
            </span>
        </form>
    )
}

export default Register