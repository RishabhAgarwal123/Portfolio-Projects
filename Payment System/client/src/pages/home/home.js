import React from 'react';
import { useSelector } from 'react-redux';
import PageTitle from '../../components/pageTitle';

function Home() {
    const { user } = useSelector(state => state.user);

    return (
        <div>
            <PageTitle title={
                `Hello ${user.firstName} ${user.lastName} , Welcome to Payment Gateway`
            } />
            <div className='p-2 w-50 bg-tertiary flex flex-col uppercase' style={{marginTop: '10px'}}>
                <div className='flex justify-between'>
                    <h1 className='text-md text-white'>Account Number </h1>
                    <h1 className='text-md text-white'>{user._id}</h1>
                </div>

                <div className='flex justify-between' style={{marginTop: '10px'}}>
                    <h1 className='text-md text-white'>Balance </h1>
                    <h1 className='text-md text-white'>$ {user.balance || 0}</h1>
                </div>
            </div>

            <div className='card p-2 w-50 flex flex-col uppercase' style={{marginTop: '10px'}}>
                <div className='flex justify-between'>
                    <h1 className='text-md'>Name </h1>
                    <h1 className='text-md'>{user.firstName}, {user.lastName}</h1>
                </div>

                <div className='flex justify-between' style={{marginTop: '10px'}}>
                    <h1 className='text-md'>Email </h1>
                    <h1 className='text-md'>{user.email}</h1>
                </div>

                <div className='flex justify-between' style={{marginTop: '10px'}}>
                    <h1 className='text-md'>Mobile Number </h1>
                    <h1 className='text-md'>{user.phone}</h1>
                </div>

                <div className='flex justify-between' style={{marginTop: '10px'}}>
                    <h1 className='text-md'>Identification Type </h1>
                    <h1 className='text-md'>{user.idType}</h1>
                </div>

                <div className='flex justify-between' style={{marginTop: '10px'}}>
                    <h1 className='text-md'>Identification Number </h1>
                    <h1 className='text-md'>{user.idNumber}</h1>
                </div>

                <div className='flex justify-between' style={{marginTop: '10px'}}>
                    <h1 className='text-md'>Date of Birth </h1>
                    <h1 className='text-md'>{user.dob}</h1>
                </div>

                <div className='flex justify-between' style={{marginTop: '10px'}}>
                    <h1 className='text-md'>Address </h1>
                    <h1 className='text-md'>{user.address}</h1>
                </div>
            </div>
        </div>
    )
}

export default Home