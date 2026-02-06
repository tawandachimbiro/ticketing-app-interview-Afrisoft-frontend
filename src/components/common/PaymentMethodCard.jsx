import PropTypes from 'prop-types';

// Payment Method Logos as SVG components
const VisaLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
    <text x="24" y="20" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">VISA</text>
  </svg>
);

const MastercardLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#EB001B"/>
    <circle cx="20" cy="16" r="8" fill="#FF5F00" opacity="0.8"/>
    <circle cx="28" cy="16" r="8" fill="#F79E1B" opacity="0.8"/>
  </svg>
);

const EcocashLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#00A651"/>
    <text x="24" y="12" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">ECO</text>
    <text x="24" y="22" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">CASH</text>
  </svg>
);

const InnbucksLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#0066CC"/>
    <text x="24" y="12" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">INN</text>
    <text x="24" y="22" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">BUCKS</text>
  </svg>
);

const ZimSwitchLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#DC3545"/>
    <text x="24" y="12" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">ZIM</text>
    <text x="24" y="22" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">SWITCH</text>
  </svg>
);

const CardLogo = () => (
  <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#6C757D"/>
    <rect x="4" y="8" width="40" height="4" fill="white"/>
    <text x="24" y="24" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">CARD</text>
  </svg>
);

const LOGO_MAP = {
  ECOCASH: EcocashLogo,
  INNBUCKS: InnbucksLogo,
  ZIMSWITCH: ZimSwitchLogo,
  INTERNATIONAL_CARD: CardLogo,
};

const DISPLAY_NAMES = {
  ECOCASH: 'EcoCash',
  INNBUCKS: 'InnBucks',
  ZIMSWITCH: 'ZimSwitch',
  INTERNATIONAL_CARD: 'Visa / Mastercard',
};

const PAYMENT_TYPES = {
  ECOCASH: 'Mobile Money',
  INNBUCKS: 'Mobile Money',
  ZIMSWITCH: 'Card Payment',
  INTERNATIONAL_CARD: 'Card Payment',
};

const PaymentMethodCard = ({ method, value, selected, onChange }) => {
  const LogoComponent = LOGO_MAP[value] || CardLogo;
  const displayName = DISPLAY_NAMES[value] || method;
  const paymentType = PAYMENT_TYPES[value] || 'Payment';
  
  const isCard = value === 'ZIMSWITCH' || value === 'INTERNATIONAL_CARD';
  const isMobile = value === 'ECOCASH' || value === 'INNBUCKS';

  return (
    <label 
      className={`
        relative flex items-center p-4 border-2 rounded-xl cursor-pointer 
        transition-all duration-200 hover:shadow-lg group
        ${selected 
          ? 'border-primary-blue bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-primary-blue bg-white'
        }
      `}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={selected}
        onChange={onChange}
        className="sr-only"
      />
      
      {/* Custom Radio Button */}
      <div className={`
        flex-shrink-0 w-5 h-5 mr-4 rounded-full border-2 flex items-center justify-center
        transition-all duration-200
        ${selected 
          ? 'border-primary-blue bg-primary-blue' 
          : 'border-gray-300 group-hover:border-primary-blue'
        }
      `}>
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
        )}
      </div>

      {/* Logo */}
      <div className="flex-shrink-0 mr-4">
        <LogoComponent />
      </div>

      {/* Payment Details */}
      <div className="flex-1">
        <p className="font-semibold text-dark text-lg">{displayName}</p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          {isMobile && (
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          )}
          {isCard && (
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
          )}
          <span>{paymentType}</span>
        </p>
      </div>

      {/* Selected Indicator */}
      {selected && (
        <div className="flex-shrink-0 ml-2">
          <svg className="w-6 h-6 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </label>
  );
};

PaymentMethodCard.propTypes = {
  method: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaymentMethodCard;
