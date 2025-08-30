import { Link } from "react-router-dom";

export default function PreNursery() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Pre-Nursery</h1>
      <p className="mt-4 text-gray-600 max-w-2xl">
        Our Pre-Nursery focuses on gentle, sensory-rich experiences that build curiosity and social skills for our youngest learners.
      </p>
      <div className="mt-8">
        <Link to="/fees" className="text-nursery-purple hover:underline">View fees</Link>
      </div>
    </div>
  );
}
