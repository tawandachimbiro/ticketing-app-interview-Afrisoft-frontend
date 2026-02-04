import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsApi } from '../../api/eventsApi';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatDate, formatCurrency } from '../../utils/helpers';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await eventsApi.getAllEvents(0, 20);
      setEvents(response.content || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-dark">Admin Dashboard</h1>
          <Button variant="primary" onClick={() => navigate('/admin/events/create')}>
            Create New Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Total Events</span>
                <svg className="w-8 h-8 text-primary-blue" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-dark">{events.length}</p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Promoted Events</span>
                <svg className="w-8 h-8 text-primary-red" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-dark">
                {events.filter(e => e.ispromotion === 'true').length}
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Upcoming</span>
                <svg className="w-8 h-8 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-dark">
                {events.filter(e => new Date(e.dateTime) > new Date()).length}
              </p>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Past Events</span>
                <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-dark">
                {events.filter(e => new Date(e.dateTime) <= new Date()).length}
              </p>
            </div>
          </Card>
        </div>

        {/* Events Table */}
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-dark mb-4">All Events</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Event Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">City</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Capacity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length > 0 ? (
                    events.map((event) => (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-dark">{event.name}</p>
                            <p className="text-sm text-gray-500">{event.type}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{formatDate(event.dateTime)}</td>
                        <td className="py-3 px-4 text-gray-600">{event.city}</td>
                        <td className="py-3 px-4 text-gray-600">{event.capacity}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col space-y-1">
                            {event.ispromotion === 'true' && (
                              <span className="inline-block px-2 py-1 bg-primary-red text-white text-xs rounded-full w-fit">
                                Promoted
                              </span>
                            )}
                            {new Date(event.dateTime) > new Date() ? (
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full w-fit">
                                Upcoming
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full w-fit">
                                Past
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/events/${event.id}`)}
                              className="text-primary-blue hover:underline text-sm font-semibold"
                            >
                              View
                            </button>
                            <button
                              onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                              className="text-primary-blue hover:underline text-sm font-semibold"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500">
                        No events found. Create your first event!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
