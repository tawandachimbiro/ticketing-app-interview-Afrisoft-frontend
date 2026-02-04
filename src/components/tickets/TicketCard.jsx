import { QRCodeSVG } from 'qrcode.react';
import { formatDateTime, formatCurrency } from '../../utils/helpers';
import Card from '../common/Card';
import Button from '../common/Button';

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
    <Card>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* QR Code */}
          <div className="flex-shrink-0">
            <div id={`qr-${ticket.id}`} className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <QRCodeSVG value={qrData} size={150} />
            </div>
            <Button 
              variant="secondary" 
              onClick={handleDownload}
              className="w-full mt-2 text-sm py-2"
            >
              Download QR
            </Button>
          </div>

          {/* Ticket Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-dark">{ticket.event?.name}</h3>
                <p className="text-gray-600">{formatDateTime(ticket.event?.dateTime)}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ticket.redeemed 
                  ? 'bg-gray-200 text-gray-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {ticket.redeemed ? 'REDEEMED' : 'ACTIVE'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Ticket Type</p>
                <p className="font-semibold text-dark">{ticket.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold text-dark">{formatCurrency(ticket.price)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-semibold text-dark">{ticket.event?.venue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ticket ID</p>
                <p className="font-semibold text-dark text-sm">{ticket.id}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {ticket.event?.address}, {ticket.event?.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TicketCard;
