import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLogoutUserQuery } from '../../redux/api';
import { userSliceActions } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useLogoutUserQuery();

  if (!isLoading) {
    if (error) {
      dispatch(userSliceActions.setError(error));
      dispatch(userSliceActions.setLoading(false));
      toast.error(error.error);
      dispatch(userSliceActions.resetState());
    } else {
      dispatch(userSliceActions.setLoading(false));
      dispatch(userSliceActions.setAuthenticated(false));
      dispatch(userSliceActions.setUser(null));
      navigate('/');
      toast.success(data.message)
    }
  }
  
  return (
    <div>Logout</div>
  )
}

export default Logout