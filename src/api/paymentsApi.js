import axiosInstance from './axios';

export const paymentsApi = {
  // Process payment - NOT USED (using dummy payment)
  processPayment: async (data) => {
    const response = await axiosInstance.post('/payments', data);
    return response.data;
  },

  // Get transaction by reference
  getTransactionByReference: async (reference) => {
    const response = await axiosInstance.get(`/payments/${reference}`);
    return response.data;
  },
};
