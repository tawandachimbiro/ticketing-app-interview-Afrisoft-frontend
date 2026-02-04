import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import TicketPurchaseForm from '../components/tickets/TicketPurchaseForm';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatDateTime, formatCurrency } from '../utils/helpers';
import { useEffect } from 'react';

const PurchaseTicketPage = () => {
  const { cart, getTotal, getTicketCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if cart is empty
    if (!cart.event || cart.tickets.length === 0) {
      navigate('/events');
    }
  }, [cart, navigate]);

  if (!cart.event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-dark mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchase Form */}
          <div className="lg:col-span-2">
            <TicketPurchaseForm />
          </div>

          {/* Event Summary */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-4">Event Details</h3>
                
                {cart.event.image_url && (
                  <img 
                    src={cart.event.image_url} 
                    alt={cart.event.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                
                <h4 className="text-lg font-bold text-dark mb-2">{cart.event.name}</h4>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDateTime(cart.event.dateTime)}
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {cart.event.venue}, {cart.event.city}
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-dark">Selected Tickets</h4>
                  {cart.tickets.map((ticket) => (
                    <div key={ticket.category} className="flex justify-between text-sm">
                      <span>{ticket.category} x {ticket.quantity}</span>
                      <span className="font-semibold">{formatCurrency(ticket.price * ticket.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary-blue">{formatCurrency(getTotal())}</span>
                </div>

                <Button 
                  variant="secondary" 
                  onClick={() => navigate(`/events/${cart.event.id}`)}
                  className="w-full mt-4"
                >
                  Back to Event
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicketPage;
