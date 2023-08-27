import React, { useEffect } from 'react'
import { useGetProductQuery } from '../../redux/api';
import { useDispatch, useSelector } from 'react-redux';
import { productSliceActions } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { product } = useSelector(state => state.product)
    const { id } = useParams()
    const { data, error, isLoading, refetch } = useGetProductQuery({id});
    console.log(product)
    const updateProduct = (product) => {
        dispatch(productSliceActions.setProduct(product.data));
    }

    const getProduct = () => {
        dispatch(productSliceActions.setLoading(true));
        if (!isLoading) {
            if (error) {
              dispatch(productSliceActions.setError(error));
              dispatch(productSliceActions.setLoading(false));
              toast.error(error.error);
            } else if (data) {
              dispatch(productSliceActions.setLoading(false));
              updateProduct(data)
              toast.success(data.message)
            }
          }
    }

    useEffect(() => {
        getProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error, isLoading, refetch])
  return (
    <div>ProductDetail</div>
  )
}

export default ProductDetail