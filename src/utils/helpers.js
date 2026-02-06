import { format, parseISO, isPast, isFuture } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'MMMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'MMMM dd, yyyy - hh:mm a');
  } catch (error) {
    return dateString;
  }
};

export const formatTime = (dateString) => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'hh:mm a');
  } catch (error) {
    return dateString;
  }
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const isEventPast = (dateString) => {
  if (!dateString) return false;
  try {
    return isPast(parseISO(dateString));
  } catch (error) {
    return false;
  }
};

export const isEventUpcoming = (dateString) => {
  if (!dateString) return false;
  try {
    return isFuture(parseISO(dateString));
  } catch (error) {
    return false;
  }
};

export const calculateTotal = (tickets) => {
  if (!tickets || tickets.length === 0) return 0;
  return tickets.reduce((total, ticket) => {
    return total + (ticket.price * ticket.quantity);
  }, 0);
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

export const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    return null;
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateTicketId = () => {
  return 'TKT' + Date.now() + Math.random().toString(36).substring(2, 9).toUpperCase();
};
