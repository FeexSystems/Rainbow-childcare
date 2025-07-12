export default function Nurseries() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Nurseries
          </h1>
          <p className="text-xl text-gray-600">
            Discover our beautiful, safe, and nurturing environments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=300&fit=crop"
              alt="Hillcrest Rising Stars"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Hillcrest Rising Stars
              </h2>
              <p className="text-gray-600 mb-4">
                Clockhouse Community Association, Hillcrest Hall, Fyshton
                Avenue, Coulsdon, Surrey
              </p>
              <p className="text-gray-700">
                Our main nursery facility offering comprehensive early years
                education in a community setting.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=300&fit=crop"
              alt="Rainbow Stars Nursery"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Rainbow Stars Nursery
              </h2>
              <p className="text-gray-600 mb-4">
                1A Headcorn Road, Thornton Heath, Croydon, Surrey
              </p>
              <p className="text-gray-700">
                Our second location providing full daycare and wrap-around
                childcare services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
