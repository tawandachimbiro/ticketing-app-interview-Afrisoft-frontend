import { QRCodeSVG } from 'qrcode.react';
import { formatDateTime, formatCurrency } from '../../utils/helpers';

const TicketCard = ({ ticket }) => {
  const qrData = JSON.stringify({
    ticketId: ticket.id,
    eventId: ticket.event?.id,
    type: ticket.category,
  });

  const handleDownload = () => {
    // Create a canvas to convert QR code to image
    const canvas = document.createElement('canvas');
    const qrCanvas = document.querySelector(`#qr-${ticket.id} canvas`);
    if (qrCanvas) {
      canvas.width = qrCanvas.width;
      canvas.height = qrCanvas.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(qrCanvas, 0, 0);
      
      // Download as PNG
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ticket-${ticket.id}.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      <div className="flex flex-col md:flex-row">
        {/* Left Section - QR Code with decorative border */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:border-r-2 md:border-dashed border-gray-300 flex flex-col items-center justify-center md:w-48">
          <div id={`qr-${ticket.id}`} className="bg-white p-2 rounded-lg shadow-sm mb-2">
            <QRCodeSVG value={qrData} size={110} />
          </div>
          <button 
            onClick={handleDownload}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
          >
            Download QR
          </button>
        </div>

        {/* Right Section - Ticket Details */}
        <div className="flex-1 p-4">
          {/* Header with status badge */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 pr-2">
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                {ticket.event?.name}
              </h3>
              <p className="text-sm text-gray-600">{formatDateTime(ticket.event?.dateTime)}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
              ticket.redeemed 
                ? 'bg-gray-200 text-gray-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {ticket.redeemed ? 'REDEEMED' : 'ACTIVE'}
            </span>
          </div>

          {/* Ticket Details Grid - More compact */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <span className="text-gray-500">Type:</span>
              <span className="ml-1 font-semibold text-gray-900">{ticket.category}</span>
            </div>
            <div>
              <span className="text-gray-500">Price:</span>
              <span className="ml-1 font-semibold text-gray-900">{formatCurrency(ticket.price)}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Venue:</span>
              <span className="ml-1 font-semibold text-gray-900">{ticket.event?.venue}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Location:</span>
              <span className="ml-1 text-gray-700">{ticket.event?.address}, {ticket.event?.city}</span>
            </div>
          </div>

          {/* Ticket ID at bottom */}
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Ticket ID: <span className="font-mono text-gray-700">{ticket.id}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
