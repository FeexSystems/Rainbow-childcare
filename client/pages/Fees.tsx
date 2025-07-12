export default function Fees() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Fees & Funding
          </h1>
          <p className="text-xl text-gray-600">
            Transparent pricing and funding options for your family
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-900 mb-2">
            FREE Early Years Entitlement Funding
          </h2>
          <p className="text-yellow-800">
            We offer FREE early years entitlement funding for 2, 3 and 4 year
            olds across ALL our settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              2 Year Olds
            </h3>
            <p className="text-3xl font-bold text-nursery-purple mb-2">£35</p>
            <p className="text-gray-600 mb-4">per day</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Full day care (7:30am - 6:30pm)</li>
              <li>• All meals included</li>
              <li>• Educational activities</li>
              <li>• Personal care</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              3 Year Olds
            </h3>
            <p className="text-3xl font-bold text-nursery-purple mb-2">£30</p>
            <p className="text-gray-600 mb-4">per day</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Funded hours available</li>
              <li>• Structured learning</li>
              <li>• School readiness activities</li>
              <li>• Social development focus</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              4+ Year Olds
            </h3>
            <p className="text-3xl font-bold text-nursery-purple mb-2">£28</p>
            <p className="text-gray-600 mb-4">per day</p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 30 hours funded places</li>
              <li>• Reception preparation</li>
              <li>• Advanced curriculum</li>
              <li>• Independence building</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
