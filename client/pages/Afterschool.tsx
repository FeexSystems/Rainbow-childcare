import { Link } from "react-router-dom";

export default function Afterschool() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Afterschool</h1>
      <p className="mt-4 text-gray-600 max-w-2xl">
        Our Afterschool program offers engaging activities, homework support, and a safe space for children after the school day.
      </p>
      <div className="mt-8">
        <Link to="/contact" className="text-nursery-purple hover:underline">Contact us</Link>
      </div>
    </div>
  );
}
