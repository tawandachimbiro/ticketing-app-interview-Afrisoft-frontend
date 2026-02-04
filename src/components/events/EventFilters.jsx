import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { EVENT_TYPES, CITIES } from '../../utils/constants';

const EventFilters = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    type: '',
    ispromotion: '',
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      name: '',
      city: '',
      type: '',
      ispromotion: '',
      startDate: '',
      endDate: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(emptyFilters);
    onReset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-dark mb-4">Filters</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Search by name"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Event name..."
        />

        <div>
          <label className="block text-primary-blue font-medium mb-2">City</label>
          <select
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none bg-white"
          >
            <option value="">All Cities</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-primary-blue font-medium mb-2">Event Type</label>
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none bg-white"
          >
            <option value="">All Types</option>
            {EVENT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-primary-blue font-medium mb-2">Promoted</label>
          <select
            name="ispromotion"
            value={filters.ispromotion}
            onChange={handleChange}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none bg-white"
          >
            <option value="">All Events</option>
            <option value="true">Promoted Only</option>
            <option value="false">Not Promoted</option>
          </select>
        </div>

        <div>
          <label className="block text-primary-blue font-medium mb-2">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-primary-blue font-medium mb-2">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-primary-blue focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Min Price"
            name="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="0"
          />
          <Input
            label="Max Price"
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="1000"
          />
        </div>

        <div className="flex space-x-2">
          <Button type="submit" variant="primary" className="flex-1">
            Apply Filters
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset} className="flex-1">
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventFilters;
