const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-primary-blue ${
        hover ? 'transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary-red cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
