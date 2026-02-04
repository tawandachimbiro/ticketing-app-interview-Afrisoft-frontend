# ASA Ticketing Frontend

A modern React 19 ticketing application built for Africa Software Architects.

## Features

- 🎫 Event browsing and ticket purchasing
- 🔐 JWT-based authentication
- 💳 Multiple payment methods (EcoCash, Innbucks, ZimSwitch, International Cards)
- 📱 Responsive design (Mobile, Tablet, Desktop)
- 🎨 Modern UI with Tailwind CSS
- 📧 Email confirmations with QR code tickets
- 👨‍💼 Admin dashboard for event management
- 🔍 Advanced event filtering and search

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Toastify** - Notifications
- **QRCode.react** - QR code generation
- **Date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8099`

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8099/api
```

4. Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── api/              # API service layer
├── components/       # Reusable components
│   ├── common/       # Common UI components
│   ├── auth/         # Authentication components
│   ├── events/       # Event-related components
│   └── tickets/      # Ticket-related components
├── context/          # React Context (Auth, Cart)
├── pages/            # Page components
│   └── admin/        # Admin pages
├── utils/            # Utility functions and constants
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## Color Scheme

- **Primary Blue:** #2E7DD6
- **Primary Red:** #EF4444
- **Dark Text:** #1F2937
- **White:** #FFFFFF

## Features by User Role

### Customer
- Browse events with filters
- View event details
- Purchase tickets
- View purchased tickets with QR codes
- Manage profile

### Admin
- Create and edit events
- View all events dashboard
- Manage ticket types and pricing
- View statistics

## API Integration

The frontend integrates with the Spring Boot backend running on `http://localhost:8099/api`

### Main Endpoints:
- `/auth/*` - Authentication
- `/events/*` - Event management
- `/tickets/*` - Ticket operations

## Payment Integration

**Note:** Currently using dummy payment (20% success rate) for testing. Real payment integration is WIP in the backend.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Africa Software Architects. All rights reserved.

## Contact

For support, email info@asa.com
