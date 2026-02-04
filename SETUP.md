# ASA Ticketing App - Setup & Usage Guide

## 🎯 Overview

This is a complete full-stack ticketing application with:
- **Backend (Spring Boot)**: Located in `e-commerce-app-customer/`
- **Frontend (React 19)**: Located in `e-commerce-app-ticket-frontend/`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- MySQL/MariaDB
- Backend running on `http://localhost:8099`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd "C:\Users\AFROSOFT\IdeaProjects\MyProjects\afrisoft ticketing app\e-commerce-app-ticket-frontend"
```

2. **Install dependencies** (already done):
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Access the application:**
Open your browser to: `http://localhost:3000`

## 🎨 Application Features

### For Customers

#### 1. Browse Events
- **URL**: `http://localhost:3000/events`
- **Features**:
  - Grid view of all events
  - Filter by city, type, date range, price range
  - Search by event name
  - View promoted events
  - Pagination

#### 2. View Event Details
- **URL**: `http://localhost:3000/events/{id}`
- **Features**:
  - Full event information
  - Ticket type selection (STANDARD, VIP, VVIP)
  - Quantity selection
  - Real-time price calculation
  - Location details

#### 3. Purchase Tickets
- **URL**: `http://localhost:3000/checkout`
- **Payment Methods**:
  - EcoCash (Mobile Money)
  - Innbucks (Mobile Money)
  - ZimSwitch (Card)
  - International Card
- **Note**: Currently using dummy payment (20% success rate) for testing

#### 4. View My Tickets
- **URL**: `http://localhost:3000/my-tickets`
- **Features**:
  - List of all purchased tickets
  - QR code display for each ticket
  - Download QR code
  - Filter by upcoming/past events
  - Ticket validation status

#### 5. User Authentication
- **Login**: `http://localhost:3000/login`
- **Signup**: `http://localhost:3000/signup`
- **Profile**: `http://localhost:3000/profile`

### For Administrators

#### 1. Admin Dashboard
- **URL**: `http://localhost:3000/admin`
- **Features**:
  - Statistics overview
  - List of all events
  - Quick event management
  - Event status tracking

#### 2. Create Event
- **URL**: `http://localhost:3000/admin/events/create`
- **Required Fields**:
  - Event name
  - Date & time
  - Venue, address, city
  - Event type
  - Capacity
  - Ticket prices (at least one)
- **Optional Fields**:
  - Description
  - Banner & thumbnail images
  - Latitude & longitude
  - Promoted status

#### 3. Edit Event
- **URL**: `http://localhost:3000/admin/events/edit/{id}`
- **Features**:
  - Update all event details
  - Modify ticket prices
  - Change promotion status

## 🎨 Design System

### Colors
- **Primary Blue**: `#2E7DD6` - Navigation, links, accents
- **Primary Red**: `#EF4444` - CTAs, buttons, important actions
- **Dark Text**: `#1F2937` - Body text
- **White**: `#FFFFFF` - Cards, backgrounds

### Typography
- System fonts for optimal performance
- Clear hierarchy with font sizes and weights

### Components
- **Buttons**: Primary (red), Secondary (blue outline), Ghost (text only)
- **Cards**: White with shadow, hover effects
- **Inputs**: Underline style matching the ASA brand
- **Modals**: Centered with backdrop

## 📁 Project Structure

```
e-commerce-app-ticket-frontend/
├── public/                 # Static assets
├── src/
│   ├── api/               # API integration layer
│   │   ├── axios.js       # Axios instance with interceptors
│   │   ├── authApi.js     # Authentication endpoints
│   │   ├── eventsApi.js   # Events endpoints
│   │   ├── ticketsApi.js  # Ticket purchase (dummy)
│   │   └── paymentsApi.js # Payment endpoints
│   │
│   ├── components/
│   │   ├── common/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── auth/          # Authentication forms
│   │   │   ├── LoginForm.jsx
│   │   │   └── SignupForm.jsx
│   │   │
│   │   ├── events/        # Event components
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventList.jsx
│   │   │   └── EventFilters.jsx
│   │   │
│   │   ├── tickets/       # Ticket components
│   │   │   ├── TicketCard.jsx
│   │   │   └── TicketPurchaseForm.jsx
│   │   │
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/           # React Context
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   │
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── EventsPage.jsx
│   │   ├── EventDetailsPage.jsx
│   │   ├── PurchaseTicketPage.jsx
│   │   ├── MyTicketsPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminCreateEvent.jsx
│   │       └── AdminEditEvent.jsx
│   │
│   ├── utils/             # Utilities
│   │   ├── constants.js   # App constants
│   │   └── helpers.js     # Helper functions
│   │
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
│
├── .env                   # Environment variables
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── SETUP.md (this file)
```

## 🔧 Configuration

### Environment Variables
Edit `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8099/api
```

### API Integration
- All API calls go through `src/api/axios.js`
- JWT token automatically attached to requests
- 401 responses redirect to login
- Error handling with toast notifications

### Dummy Payment
Located in `src/api/ticketsApi.js`:
- Simulates 20% success rate
- 2-second delay for realistic UX
- No actual backend payment call

## 📝 Testing Guide

### Test Account Creation
1. Go to `http://localhost:3000/signup`
2. Fill in the form:
   - Username: testuser
   - Email: test@example.com
   - Password: password123
   - First Name: Test
   - Last Name: User
3. Click "Sign Up"

### Test Admin Account
1. Create an account via signup
2. Manually update the database to set role to 'ADMIN'
3. Login to access admin dashboard

### Test Event Creation (Admin)
1. Login as admin
2. Go to `http://localhost:3000/admin`
3. Click "Create New Event"
4. Fill in all required fields
5. Set ticket prices
6. Submit

### Test Ticket Purchase
1. Browse events
2. Click on an event
3. Select ticket quantities
4. Click "Proceed to Checkout"
5. Fill in customer information
6. Select payment method
7. Click "Pay"
8. Try multiple times to get a successful payment (20% chance)

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Error**
- Ensure backend is running on `http://localhost:8099`
- Check backend Swagger UI: `http://localhost:8099/swagger-ui/index.html`
- Verify CORS is enabled in backend

**2. Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**3. Tailwind CSS Not Working**
- Check `postcss.config.js` uses `@tailwindcss/postcss`
- Verify `tailwind.config.js` content paths
- Restart dev server

**4. Login Not Working**
- Check backend database is running
- Verify JWT secret in backend config
- Check browser console for errors

## 📦 Deployment

### Production Build

```bash
npm run build
```

Output in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy Options
- **Vercel**: Automatic deployment from Git
- **Netlify**: Drag and drop `dist/` folder
- **AWS S3 + CloudFront**: Static hosting
- **Docker**: Containerized deployment

## 🔐 Security Notes

- JWT tokens stored in localStorage
- Protected routes require authentication
- Admin routes require ADMIN role
- CORS configured in backend
- Input validation on forms
- XSS prevention with React

## 📊 Performance

- Code splitting with React Router
- Lazy loading for routes (can be added)
- Optimized images (external URLs)
- Pagination for large datasets
- Debounced search (can be added)

## 🎓 Learning Resources

- [React 19 Docs](https://react.dev/)
- [Vite Docs](https://vite.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [React Router Docs](https://reactrouter.com/)

## 📞 Support

For issues or questions:
- Email: info@asa.com
- Create an issue in the repository

## 📄 License

© 2026 Africa Software Architects. All rights reserved.
