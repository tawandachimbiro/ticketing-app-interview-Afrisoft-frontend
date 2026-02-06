import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import PaymentMethodCard from '../common/PaymentMethodCard';
import { PAYMENT_METHODS } from '../../utils/constants';
import { formatCurrency, calculateTotal } from '../../utils/helpers';
import { ticketsApi } from '../../api/ticketsApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const TicketPurchaseForm = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Load cart directly from localStorage
  const [cart, setCart] = useState({ event: null, tickets: [], customerInfo: null });
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart({ event: null, tickets: [], customerInfo: null });
  };

  const getTotal = () => calculateTotal(cart.tickets);

  const [formData, setFormData] = useState({
    customerName: isAuthenticated ? `${user?.firstName || ''} ${user?.lastName || ''}`.trim() : '',
    customerEmail: isAuthenticated ? user?.email || '' : '',
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
    
    // Guard against empty cart
    if (!cart.event || !cart.tickets || cart.tickets.length === 0) {
      toast.error('Your cart is empty. Please select tickets first.');
      navigate('/events');
      return;
    }
    
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
        toast.success(response.message || 'Tickets purchased successfully! Check your email.');
        clearCart();
        navigate('/my-tickets');
      } else {
        toast.error(response.message || 'Purchase failed. Please try again.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error.response?.data?.message || error.message || 'Purchase failed. Please try again.');
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
        <h3 className="text-xl font-bold text-dark mb-4">
          💳 Select Payment Method
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Choose your preferred payment method. All payments are 100% secure.
        </p>
        
        <div className="space-y-3">
          {Object.entries(PAYMENT_METHODS).map(([key, value]) => (
            <PaymentMethodCard
              key={value}
              method={key}
              value={value}
              selected={formData.paymentMethod === value}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-primary-blue text-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        
        <div className="space-y-2 mb-4">
          {cart.tickets && cart.tickets.map((ticket) => (
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <p className="font-semibold text-primary-blue">Email Confirmation</p>
        </div>
        <p className="text-sm text-gray-600">
          After successful payment, you'll receive an email with your ticket QR codes.
          Keep them safe for event entry!
        </p>
      </div>
      
      <p className="text-center text-xs text-gray-400">
        By completing this purchase, you agree to our terms and conditions.
      </p>
    </form>
  );
};

export default TicketPurchaseForm;
