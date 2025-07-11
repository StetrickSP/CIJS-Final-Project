import { fetchData } from "../helpers";
import { useRouteError, Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Provide a fallback message if error is null
  const message =
    (error && (error.message || error.statusText)) ||
    "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">We have a problem</h1>
      <p>{message}</p>
      <div className="flex-md gap-4 mt-4">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;