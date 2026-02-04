import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsApi } from '../../api/eventsApi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { EVENT_TYPES, CITIES, TICKET_CATEGORIES } from '../../utils/constants';
import { toast } from 'react-toastify';

const AdminEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateTime: '',
    venue: '',
    address: '',
    city: '',
    type: '',
    ispromotion: 'false',
    latitude: '',
    longitude: '',
    capacity: '',
    description: '',
    banner_url: '',
    image_url: '',
  });
  
  const [ticketTypes, setTicketTypes] = useState([
    { category: TICKET_CATEGORIES.STANDARD, price: '' },
    { category: TICKET_CATEGORIES.VIP, price: '' },
    { category: TICKET_CATEGORIES.VVIP, price: '' },
  ]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const event = await eventsApi.getEventById(id);
      
      // Format datetime for input
      const dateTime = event.dateTime ? new Date(event.dateTime).toISOString().slice(0, 16) : '';
      
      setFormData({
        name: event.name || '',
        dateTime: dateTime,
        venue: event.venue || '',
        address: event.address || '',
        city: event.city || '',
        type: event.type || EVENT_TYPES[0],
        ispromotion: event.ispromotion || 'false',
        latitude: event.latitude || '',
        longitude: event.longitude || '',
        capacity: event.capacity || '',
        description: event.description || '',
        banner_url: event.banner_url || '',
        image_url: event.image_url || '',
      });

      // Populate existing ticket types
      if (event.ticketTypes && event.ticketTypes.length > 0) {
        const existingTickets = [...ticketTypes];
        event.ticketTypes.forEach(ticket => {
          const index = existingTickets.findIndex(t => t.category === ticket.category);
          if (index !== -1) {
            existingTickets[index].price = ticket.price;
          }
        });
        setTicketTypes(existingTickets);
      }
    } catch (error) {
      toast.error('Failed to load event');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTicketPriceChange = (index, value) => {
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index].price = value;
    setTicketTypes(newTicketTypes);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Event name is required';
    if (!formData.dateTime) newErrors.dateTime = 'Date and time is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.capacity || formData.capacity <= 0) newErrors.capacity = 'Valid capacity is required';
    
    const hasValidTicket = ticketTypes.some(t => t.price && parseFloat(t.price) > 0);
    if (!hasValidTicket) {
      newErrors.tickets = 'At least one ticket type must have a price';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      const validTicketTypes = ticketTypes
        .filter(t => t.price && parseFloat(t.price) > 0)
        .map(t => ({
          category: t.category,
          price: parseFloat(t.price),
        }));

      const eventData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        ticketTypes: validTicketTypes,
      };

      await eventsApi.updateEvent(id, eventData);
      toast.success('Event updated successfully!');
      navigate('/admin');
    } catch (error) {
      toast.error(error.message || 'Failed to update event');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="secondary" onClick={() => navigate('/admin')}>
              ← Back to Dashboard
            </Button>
          </div>

          <h1 className="text-4xl font-bold text-dark mb-8">Edit Event</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark mb-4">Basic Information</h2>
                
                <Input
                  label="Event Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary-blue font-medium mb-2">
                      Event Type <span className="text-primary-red">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none bg-white"
                    >
                      {EVENT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-primary-blue font-medium mb-2">
                      Date & Time <span className="text-primary-red">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-b-2 focus:outline-none ${
                        errors.dateTime ? 'border-red-500' : 'border-gray-300 focus:border-primary-blue'
                      }`}
                    />
                    {errors.dateTime && <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                    error={errors.capacity}
                    required
                  />

                  <div>
                    <label className="block text-primary-blue font-medium mb-2">
                      Promoted Event?
                    </label>
                    <select
                      name="ispromotion"
                      value={formData.ispromotion}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none bg-white"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-primary-blue font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark mb-4">Location Details</h2>
                
                <Input
                  label="Venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  error={errors.venue}
                  required
                />

                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-primary-blue font-medium mb-2">
                      City <span className="text-primary-red">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none bg-white"
                    >
                      <option value="">Select City</option>
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <Input
                    label="Latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                  />

                  <Input
                    label="Longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Card>

            {/* Images */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark mb-4">Images</h2>
                
                <Input
                  label="Banner Image URL"
                  name="banner_url"
                  value={formData.banner_url}
                  onChange={handleChange}
                />

                <Input
                  label="Thumbnail Image URL"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </div>
            </Card>

            {/* Ticket Types */}
            <Card>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-dark mb-4">Ticket Types & Pricing</h2>
                
                <div className="space-y-4">
                  {ticketTypes.map((ticket, index) => (
                    <div key={ticket.category} className="grid grid-cols-2 gap-4 items-end">
                      <div>
                        <label className="block text-primary-blue font-medium mb-2">
                          {ticket.category}
                        </label>
                        <input
                          type="text"
                          value={ticket.category}
                          disabled
                          className="w-full px-4 py-3 border-b-2 border-gray-300 bg-gray-100"
                        />
                      </div>
                      <Input
                        label="Price (USD)"
                        type="number"
                        step="0.01"
                        value={ticket.price}
                        onChange={(e) => handleTicketPriceChange(index, e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  ))}
                </div>
                {errors.tickets && <p className="text-red-500 text-sm mt-2">{errors.tickets}</p>}
              </div>
            </Card>

            {/* Submit */}
            <div className="flex space-x-4">
              <Button 
                type="submit" 
                variant="primary" 
                className="flex-1"
                disabled={submitting}
              >
                {submitting ? 'Updating Event...' : 'Update Event'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/admin')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditEvent;
