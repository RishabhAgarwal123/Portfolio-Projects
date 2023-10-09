import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import Loader from '../Loader';
import { toast } from 'react-toastify';

const DeletePost = () => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { id } = useParams();
    const naviagte = useNavigate();

    const deletePost = async () => {

        setIsLoading(true)
        try {
            const { data } = await axios.get(`/posts/delete/${id}`);
            if (data.success) {
                naviagte('/');
                toast.success(data.message);
            } else toast.error(data.message);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error('Something went wrong!');
        }
    }

    useEffect(() => {
        deletePost();
    }, [id]);

    return (
        <>
            {
                isLoading ? <Loader /> : <></>
            }
        </>
    )
}

export default DeletePost