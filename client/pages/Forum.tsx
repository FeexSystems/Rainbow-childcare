export default function Forum() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Parent Community Forum
          </h1>
          <p className="text-xl text-gray-600">
            Connect, share, and support each other in our parenting journey
          </p>
        </div>

        <div className="bg-nursery-purple/10 border border-nursery-purple/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-nursery-purple mb-4">
            Coming Soon
          </h2>
          <p className="text-gray-700 mb-6">
            We're building an interactive community forum where parents can:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Share Experiences
              </h3>
              <p className="text-sm text-gray-600">
                Connect with other parents and share parenting tips
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Ask Questions
              </h3>
              <p className="text-sm text-gray-600">
                Get advice from teachers and experienced parents
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-2">
                Event Planning
              </h3>
              <p className="text-sm text-gray-600">
                Organize playdates and community activities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
