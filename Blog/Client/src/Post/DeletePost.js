import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import Loader from '../Loader';

const DeletePost = () => {
    const { isLoading, setIsLoading } = useContext(UserContext);
    const { id } = useParams();
    const naviagte = useNavigate();

    const deletePost = async () => {
    console.log('ca')

        setIsLoading(true)
        try {
            const { data } = await axios.get(`/posts/delete/${id}`);
            if (data.success) {
                naviagte('/');
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
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