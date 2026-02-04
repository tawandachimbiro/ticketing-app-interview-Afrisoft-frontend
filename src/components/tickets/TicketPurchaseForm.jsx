import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { PAYMENT_METHODS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';
import { ticketsApi } from '../../api/ticketsApi';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const TicketPurchaseForm = () => {
  const { cart, clearCart, getTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: isAuthenticated ? `${user?.firstName} ${user?.lastName}` : '',
    customerEmail: isAuthenticated ? user?.email : '',
    mobileNumber: isAuthenticated ? user?.phoneNumber || '' : '',
    paymentMethod: PAYMENT_METHODS.ECOCASH,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    try {
      const purchaseData = {
        eventId: cart.event.id,
        tickets: cart.tickets.map(t => ({
          category: t.category,
          quantity: t.quantity,
        })),
        paymentMethod: formData.paymentMethod,
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        mobileNumber: formData.mobileNumber,
      };

      const response = await ticketsApi.purchaseTicket(purchaseData);
      
      if (response.success) {
        toast.success(response.message);
        clearCart();
        navigate('/my-tickets');
      }
    } catch (error) {
      toast.error(error.message || 'Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = getTotal();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-dark mb-4">Customer Information</h3>
        
        <Input
          label="Full Name"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          error={errors.customerName}
          placeholder="John Doe"
          required
        />

        <Input
          label="Email"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={handleChange}
          error={errors.customerEmail}
          placeholder="john@example.com"
          required
        />

        <Input
          label="Mobile Number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          error={errors.mobileNumber}
          placeholder="0771234567"
          required
        />
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-dark mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          {Object.entries(PAYMENT_METHODS).map(([key, value]) => (
            <label key={value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-primary-blue transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value={value}
                checked={formData.paymentMethod === value}
                onChange={handleChange}
                className="mr-3"
              />
              <div>
                <p className="font-semibold text-dark">{key.replace('_', ' ')}</p>
                <p className="text-sm text-gray-500">
                  {value.includes('CARD') ? 'Card Payment' : 'Mobile Money'}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-primary-blue text-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        
        <div className="space-y-2 mb-4">
          {cart.tickets.map((ticket) => (
            <div key={ticket.category} className="flex justify-between">
              <span>{ticket.category} x {ticket.quantity}</span>
              <span>{formatCurrency(ticket.price * ticket.quantity)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-blue-400 pt-4">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="primary" 
        className="w-full text-lg py-4"
        disabled={loading}
      >
        {loading ? 'Processing...' : `Pay ${formatCurrency(total)}`}
      </Button>

      <p className="text-center text-sm text-gray-500">
        By completing this purchase, you agree to our terms and conditions. 
        A confirmation email will be sent to your email address.
      </p>
    </form>
  );
};

export default TicketPurchaseForm;
