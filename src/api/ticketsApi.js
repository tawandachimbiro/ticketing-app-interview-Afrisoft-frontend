import axiosInstance from './axios';
import { simulatePaymentSuccess, generateTicketId } from '../utils/helpers';

export const ticketsApi = {
  // Purchase tickets - DUMMY IMPLEMENTATION (no real BE call)
  purchaseTicket: async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const success = simulatePaymentSuccess();
    
    if (success) {
      return {
        success: true,
        message: 'Tickets purchased successfully! Check your email for details.',
        transactionId: generateTicketId(),
        ticketDetails: `${data.tickets.reduce((sum, t) => sum + t.quantity, 0)} ticket(s) purchased`,
        code: 'SUCCESS',
        paymentMethod: data.paymentMethod,
        hostedUrl: null,
        checkoutId: null,
      };
    } else {
      throw new Error('Payment failed. Please try again.');
    }
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
