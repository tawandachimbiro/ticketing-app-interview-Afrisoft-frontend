export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8099/api';

export const TICKET_CATEGORIES = {
  STANDARD: 'STANDARD',
  VIP: 'VIP',
  VVIP: 'VVIP',
};

export const PAYMENT_METHODS = {
  ECOCASH: 'ECOCASH',
  INNBUCKS: 'INNBUCKS',
  ZIMSWITCH: 'ZIMSWITCH',
  INTERNATIONAL_CARD: 'INTERNATIONAL_CARD',
};

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
};

export const EVENT_TYPES = [
  'Concert',
  'Sports',
  'Conference',
  'Festival',
  'Theater',
  'Comedy',
  'Exhibition',
  'Workshop',
  'Other',
];

export const CITIES = [
  'Harare',
  'Bulawayo',
  'Mutare',
  'Gweru',
  'Kwekwe',
  'Kadoma',
  'Masvingo',
  'Chinhoyi',
  'Marondera',
  'Victoria Falls',
];

export const ROUTES = {
  HOME: '/',
  EVENTS: '/events',
  EVENT_DETAILS: '/events/:id',
  PURCHASE_TICKET: '/checkout',
  MY_TICKETS: '/my-tickets',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_CREATE_EVENT: '/admin/events/create',
  ADMIN_EDIT_EVENT: '/admin/events/edit/:id',
};
