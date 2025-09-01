import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to CalmSpace 🌿</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Your smart, round-the-clock wellness partner. Manage stress, stay balanced,
        and take control of your daily wellbeing.
      </p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-6 py-3 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 rounded-2xl border border-green-600 text-green-600 hover:bg-green-50 transition"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
