import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsApi } from '../api/eventsApi';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import { formatDateTime, formatCurrency } from '../utils/helpers';
import { TICKET_CATEGORIES } from '../utils/constants';
import { toast } from 'react-toastify';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setEvent, addTicket, updateTicketQuantity, cart, setCustomerInfo } = useCart();
  
  const [event, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTickets, setSelectedTickets] = useState({});

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const data = await eventsApi.getEventById(id);
      setEventData(data);
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (ticketType, change) => {
    const currentQty = selectedTickets[ticketType.category] || 0;
    const newQty = Math.max(0, currentQty + change);
    
    setSelectedTickets(prev => ({
      ...prev,
      [ticketType.category]: newQty,
    }));
  };

  const handleProceedToCheckout = () => {
    // Add selected tickets to cart
    Object.keys(selectedTickets).forEach(category => {
      const quantity = selectedTickets[category];
      if (quantity > 0) {
        const ticketType = event.ticketTypes.find(t => t.category === category);
        updateTicketQuantity(category, quantity);
      }
    });

    if (Object.values(selectedTickets).some(qty => qty > 0)) {
      navigate('/checkout');
    } else {
      toast.warning('Please select at least one ticket');
    }
  };

  const getTotalPrice = () => {
    if (!event || !event.ticketTypes) return 0;
    
    return Object.keys(selectedTickets).reduce((total, category) => {
      const quantity = selectedTickets[category] || 0;
      const ticketType = event.ticketTypes.find(t => t.category === category);
      return total + (ticketType ? ticketType.price * quantity : 0);
    }, 0);
  };

  const getTotalTickets = () => {
    return Object.values(selectedTickets).reduce((sum, qty) => sum + (qty || 0), 0);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Event Not Found</h2>
          <Button variant="primary" onClick={() => navigate('/events')}>
            Browse Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Event Banner */}
        <div className="mb-8">
          <div className="h-64 md:h-96 bg-gradient-to-r from-primary-blue to-blue-400 rounded-lg overflow-hidden relative">
            {event.banner_url ? (
              <img 
                src={event.banner_url} 
                alt={event.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
                  {event.name}
                </h1>
              </div>
            )}
            {event.ispromotion === 'true' && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-primary-red text-white px-4 py-2 rounded-full font-semibold shadow-lg animate-pulse">
                ⭐ FEATURED EVENT
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h1 className="text-3xl font-bold text-dark mb-4">{event.name}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-blue flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-semibold text-dark">{formatDateTime(event.dateTime)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-blue flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-dark">{event.venue}</p>
                      <p className="text-sm text-gray-600">{event.address}, {event.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-blue flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Event Type</p>
                      <p className="font-semibold text-dark">{event.type}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-primary-blue flex-shrink-0 mt-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Capacity</p>
                      <p className="font-semibold text-dark">{event.capacity} people</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-bold text-dark mb-3">About This Event</h2>
                  <p className="text-gray-700 whitespace-pre-line">{event.description || 'No description available.'}</p>
                </div>
              </div>
            </Card>

            {/* Ticket Types */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark mb-4">Select Tickets</h2>
                
                <div className="space-y-4">
                  {event.ticketTypes && event.ticketTypes.length > 0 ? (
                    event.ticketTypes.map((ticketType) => (
                      <div key={ticketType.category} className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-blue transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-dark">{ticketType.category}</h3>
                            <p className="text-2xl font-bold text-primary-blue">{formatCurrency(ticketType.price)}</p>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(ticketType, -1)}
                              disabled={!selectedTickets[ticketType.category] || selectedTickets[ticketType.category] === 0}
                              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="text-xl font-semibold w-8 text-center">
                              {selectedTickets[ticketType.category] || 0}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(ticketType, 1)}
                              className="w-10 h-10 rounded-full bg-primary-blue hover:bg-blue-600 text-white flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No tickets available for this event.</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Checkout Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-4">Order Summary</h3>
                  
                  {getTotalTickets() > 0 ? (
                    <>
                      <div className="space-y-2 mb-4">
                        {Object.keys(selectedTickets).map(category => {
                          const quantity = selectedTickets[category];
                          if (quantity > 0) {
                            const ticketType = event.ticketTypes.find(t => t.category === category);
                            return (
                              <div key={category} className="flex justify-between text-sm">
                                <span>{category} x {quantity}</span>
                                <span className="font-semibold">{formatCurrency(ticketType.price * quantity)}</span>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">Total</span>
                          <span className="text-2xl font-bold text-primary-blue">{formatCurrency(getTotalPrice())}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{getTotalTickets()} ticket(s)</p>
                      </div>
                      
                      <Button 
                        variant="primary" 
                        className="w-full"
                        onClick={handleProceedToCheckout}
                      >
                        Proceed to Checkout
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      <p className="text-gray-500">Select tickets to continue</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
