import QRPickupComponent from "@/components/QRPickup";

export default function QRPickup() {
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            QR Pickup System
          </h1>
          <p className="text-xl text-gray-600">
            Secure, contactless child pickup with time-bound QR codes
          </p>
        </div>

        <QRPickupComponent />
      </div>
    </div>
  );
}
