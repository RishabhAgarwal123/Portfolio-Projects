import { ApiConfig } from './apiConfig';

// verfiy receiver account
export const VerifyAccount = async (payload) => {
    try {
        return await ApiConfig.post('/api/transaction/verify-account', payload);
    } catch (error) {
        return error.response.data;
    }
}

// transfer funds
export const TransferFunds = async (payload) => {
    try {
        return await ApiConfig.post('/api/transaction/transfer-fund', payload);
    } catch (error) {
        return error.response.data;
    }
}

// fetched transactions data
export const GetTransactionsDetails = async (payload) => {
    try {
        return await ApiConfig.post('/api/transaction/get-all-transactions-by-user', payload);
    } catch (error) {
        return error.response.data;
    }
}

// Deposit funds using stripe
export const DepositFunds = async (payload) => {
    try {
        console.log(payload)
        return await ApiConfig.post('/api/transaction/deposit-funds', payload);
    } catch (error) {
        return error.message.data;
    }
}