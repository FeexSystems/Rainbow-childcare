import { Link } from "react-router-dom";

export default function DayNursery() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Day Nursery</h1>
      <p className="mt-4 text-gray-600 max-w-2xl">
        Welcome to our Day Nursery. We provide a warm, nurturing environment focused on early years development and play-based learning.
      </p>
      <div className="mt-8">
        <Link to="/apply" className="text-nursery-purple hover:underline">Apply now</Link>
      </div>
    </div>
  );
}
