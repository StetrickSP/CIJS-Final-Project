import { fetchData } from "../helpers";
import { useRouteError, Link } from "react-router-dom";

// Libraries
import { HomeIcon, ArrowUturnLeft } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigation();
>>>>>>>>> Temporary merge branch 2
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">We have a problem</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md gap-4 mt-4">
        <button className="btn btn--dark"
          onClick={() => navigate(-1)}>
          <ArrowUturnLeft width={20} />
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