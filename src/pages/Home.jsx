import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventList from '../components/events/EventList';
import Button from '../components/common/Button';
import { eventsApi } from '../api/eventsApi';
import { ROUTES } from '../utils/constants';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsApi.filterEvents({
        ispromotion: 'true',
        page: 0,
        size: 6,
      });
      setEvents(response.content || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-blue via-blue-600 to-primary-red text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Discover Amazing Events
            </h1>
            <p className="text-xl mb-8 drop-shadow">
              Book tickets for concerts, sports, conferences, and more. 
              Experience the best events in Zimbabwe!
            </p>
            <Link to={ROUTES.EVENTS}>
              <Button variant="primary" className="text-lg px-8 py-4 bg-white text-primary-blue hover:bg-gray-100">
                Explore Events 🎫
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" style={{width: '2.5rem', height: '2.5rem'}}>
                  <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your tickets in just a few clicks. Quick and hassle-free process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" style={{width: '2.5rem', height: '2.5rem'}}>
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Multiple payment options including EcoCash, Innbucks, and card payments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" style={{width: '2.5rem', height: '2.5rem'}}>
                  <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Digital Tickets</h3>
              <p className="text-gray-600">
                Get instant QR code tickets sent to your email. No need to print!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promoted Events Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary-blue">Featured Events</h2>
            <Link to={ROUTES.EVENTS}>
              <Button variant="primary">View All Events →</Button>
            </Link>
          </div>
          
          <EventList events={events} loading={loading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-red via-red-500 to-primary-blue text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">Ready to Experience Amazing Events?</h2>
          <p className="text-xl mb-8 drop-shadow">
            Browse thousands of events and book your tickets today!
          </p>
          <Link to={ROUTES.EVENTS}>
            <Button variant="primary" className="text-lg px-8 py-4 bg-white text-primary-red hover:bg-gray-100 shadow-2xl">
              Get Started Now 🚀
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
