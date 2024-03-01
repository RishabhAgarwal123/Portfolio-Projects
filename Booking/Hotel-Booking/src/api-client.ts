import { RegisterForm } from "./pages/Register";
import { SignInForm } from "./pages/SignIn";
import { HotelType } from '../../Backend/src/models/hotel';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterForm) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}

export const signIn = async (loginData: SignInForm) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const signOut = async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Error during sign out");
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: 'GET',
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Token Invalid");
    }

    return response.json();
}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData, // Directly use FormData without modification
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const getMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'GET',
        credentials: 'include',
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}
