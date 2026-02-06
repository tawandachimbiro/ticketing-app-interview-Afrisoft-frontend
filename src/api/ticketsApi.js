import axiosInstance from './axios';

export const ticketsApi = {
  // Purchase tickets - Real backend API call
  purchaseTicket: async (data) => {
    const response = await axiosInstance.post('/tickets/purchase', data);
    return response.data;
  },

  // Get tickets for current authenticated user
  getMyTickets: async () => {
    const response = await axiosInstance.get('/tickets/my');
    return response.data;
  },

  // Validate ticket
  validateTicket: async (qrData) => {
    const response = await axiosInstance.post('/tickets/validate', qrData);
    return response.data;
  },

  // Redeem ticket
  redeemTicket: async (qrData) => {
    const response = await axiosInstance.post('/tickets/redeem', qrData);
    return response.data;
  },
};
