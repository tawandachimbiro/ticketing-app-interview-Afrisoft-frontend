import { useState, useEffect } from 'react';
import EventList from '../components/events/EventList';
import EventFilters from '../components/events/EventFilters';
import { eventsApi } from '../api/eventsApi';
import Button from '../components/common/Button';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [currentPage, filters]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: currentPage,
        size: 12,
      };
      
      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await eventsApi.filterEvents(params);
      setEvents(response.content || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0);
    setShowFilters(false);
  };

  const handleReset = () => {
    setFilters({});
    setCurrentPage(0);
    fetchEvents();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-dark mb-8">All Events</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <EventFilters onFilter={handleFilter} onReset={handleReset} />
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button 
              variant="secondary" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mb-4"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            
            {showFilters && (
              <div className="mb-4">
                <EventFilters onFilter={handleFilter} onReset={handleReset} />
              </div>
            )}
          </div>

          {/* Events List */}
          <div className="flex-1">
            <EventList events={events} loading={loading} />

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="px-4 py-2"
                >
                  Previous
                </Button>

                <span className="text-gray-600">
                  Page {currentPage + 1} of {totalPages}
                </span>

                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  className="px-4 py-2"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
