import { HotelSearchResponse, HotelType } from "../../Backend/src/shared/types";
import { RegisterForm } from "./pages/Register";
import { SignInForm } from "./pages/SignIn";

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

export const getMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        method: 'GET',
        credentials: 'include',
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const editMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
        method: 'PUT',
        credentials: 'include',
        body: hotelFormData, // Directly use FormData without modification
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[],
    types?: string[],
    stars?: string[],
    maxPrice?: string,
    sortOption?: string
}

export const searchHotels = async ({ destination, checkIn, checkOut, adultCount, childCount, page, maxPrice, facilities, types, stars, sortOption }: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", destination || '');
    queryParams.append("checkIn", checkIn || '');
    queryParams.append("checkOut", checkOut || '');
    queryParams.append("adultCount", adultCount || '');
    queryParams.append("childCount", childCount || '');
    queryParams.append("page", page || '');

    queryParams.append('maxPrice', maxPrice || '');
    queryParams.append('sortOption', sortOption || '');

    facilities?.forEach((facility) => queryParams.append("facilities", facility));
    types?.forEach((type) => queryParams.append("types", type));
    stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
        method: 'GET',
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const getHotelById = async (hotelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
        method: 'GET',
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
}