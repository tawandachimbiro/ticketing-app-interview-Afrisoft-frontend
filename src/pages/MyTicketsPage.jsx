import { useState } from 'react';
import TicketCard from '../components/tickets/TicketCard';
import Loader from '../components/common/Loader';

// MOCK DATA - In real app, fetch from API
const mockTickets = [];

const MyTicketsPage = () => {
  const [tickets] = useState(mockTickets);
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [loading] = useState(false);

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') {
      return new Date(ticket.event.dateTime) > new Date();
    }
    if (filter === 'past') {
      return new Date(ticket.event.dateTime) <= new Date();
    }
    return true;
  });

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-dark mb-8">My Tickets</h1>

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setFilter('all')}
            className={`pb-2 px-4 font-semibold transition-colors ${
              filter === 'all'
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-gray-600 hover:text-primary-blue'
            }`}
          >
            All Tickets
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`pb-2 px-4 font-semibold transition-colors ${
              filter === 'upcoming'
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-gray-600 hover:text-primary-blue'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`pb-2 px-4 font-semibold transition-colors ${
              filter === 'past'
                ? 'text-primary-blue border-b-2 border-primary-blue'
                : 'text-gray-600 hover:text-primary-blue'
            }`}
          >
            Past
          </button>
        </div>

        {/* Tickets List */}
        {filteredTickets.length > 0 ? (
          <div className="space-y-6">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-16 h-16 text-primary-red"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{width: '4rem', height: '4rem'}}
              >
                <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary-blue mb-2">No Tickets Found</h3>
            <p className="text-gray-600 mb-6">You haven't purchased any tickets yet. Start exploring amazing events!</p>
            <a href="/events" className="inline-block bg-gradient-to-r from-primary-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              Browse Events
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTicketsPage;
