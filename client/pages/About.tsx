export default function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about our journey, values, and commitment to providing
            exceptional early childhood education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop"
              alt="Children playing"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We are located in a community hall in a lovely residential area,
                close to Woodmansterne stations and Croydon town stations.
              </p>
              <p>
                We offer a safe, caring, fun and stimulating learning
                environment for children ages 24 months to five years. We have
                dedicated nursery nurses for different age groups, each room
                follows areas of learning as outlined in the early years
                foundation stage.
              </p>
              <p>
                We are opened 50 weeks a year, closed for bank holidays and
                during Christmas week and new year.
              </p>
              <p className="font-semibold">
                We offer full and half day sessions from 7:30am – 6:30pm.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Enhanced Features Coming Soon
          </h2>
          <p className="text-gray-600 mb-6">
            We're building new digital features to better serve our community:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Parent Dashboard
              </h3>
              <p className="text-sm text-gray-600">
                Real-time updates on your child's daily activities and progress
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                QR Pickup System
              </h3>
              <p className="text-sm text-gray-600">
                Secure, contactless pickup using QR codes
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Community Forum
              </h3>
              <p className="text-sm text-gray-600">
                Connect with other parents and share experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
