export default function Policies() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Policies & Procedures
          </h1>
          <p className="text-xl text-gray-600">
            Our commitment to safety, quality, and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Safeguarding Policy
            </h3>
            <p className="text-gray-600 mb-4">
              Our comprehensive child protection procedures
            </p>
            <button className="text-nursery-purple hover:underline">
              Download PDF
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Health & Safety
            </h3>
            <p className="text-gray-600 mb-4">
              Guidelines for maintaining a safe environment
            </p>
            <button className="text-nursery-purple hover:underline">
              Download PDF
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Admissions Policy
            </h3>
            <p className="text-gray-600 mb-4">
              Our fair and transparent admissions process
            </p>
            <button className="text-nursery-purple hover:underline">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
