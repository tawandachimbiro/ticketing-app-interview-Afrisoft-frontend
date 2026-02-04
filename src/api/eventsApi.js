import axiosInstance from './axios';

export const eventsApi = {
  // Get all events with pagination
  getAllEvents: async (page = 0, size = 10) => {
    const response = await axiosInstance.get('/events', {
      params: { page, size },
    });
    return response.data;
  },

  // Get event by ID
  getEventById: async (id) => {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data;
  },

  // Filter events
  filterEvents: async (filters) => {
    const response = await axiosInstance.get('/events/filter', {
      params: filters,
    });
    return response.data;
  },

  // Create event (admin)
  createEvent: async (data) => {
    const response = await axiosInstance.post('/events', data);
    return response.data;
  },

  // Update event (admin)
  updateEvent: async (id, data) => {
    const response = await axiosInstance.put(`/events/${id}`, data);
    return response.data;
  },
};
