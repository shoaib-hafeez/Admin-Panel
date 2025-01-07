
import axiosClient from "../lib/axios";

export const signUpUserApi = async (userData) => {
    try {
        const response = await axiosClient.post('/users/register', userData, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });

        return response.data; // Return the response data
    } catch (error) {
        throw error; // Throw error so it can be caught in the component
    }
};
export const loginUserApi = async (userData) => {
    try {
        const response = await axiosClient.post('/users/login', userData, {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
        });
        return response.data; // Returning response data
    } catch (error) {
        throw error; // Throwing error to be handled in the component
    }
};

