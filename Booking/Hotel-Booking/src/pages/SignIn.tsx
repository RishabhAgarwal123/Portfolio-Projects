import { useForm } from "react-hook-form";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from "react-query";
import { signIn } from "../api-client";

export type SignInForm = {
    email: string;
    password: string;
}

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(signIn, {
        onSuccess: async () => {
            showToast({ message: 'User Logged In Successfully!', type: 'SUCCESS' });
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
            <h2 className="text-3xl font-bold">Sign Into Your Account</h2>

            <label htmlFor="lastName" className="text-gray-500 text-sm font-bold flex-1">
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

            <label htmlFor="lastName" className="text-gray-500 text-sm font-bold flex-1">
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

            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered? <Link className="underline" to="/register">Create an new account</Link>
                </span>
                <button type="submit" className="bg-blue-500 border rounded text-white p-3 hover:bg-blue-800 text-xl">Sign Into Your Account</button>
            </span>
        </form>
    )
}

export default SignIn