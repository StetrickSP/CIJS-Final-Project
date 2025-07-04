import {createBrowserRouter, RouterProvider} from "react-router-dom";


// Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    loader: dashboardLoader,
    errorElement: <Error/>
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
