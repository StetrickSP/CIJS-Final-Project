import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
      {
        index: true, // This will render the Dashboard component at the root path
        element: <Dashboard/>,
        loader: dashboardLoader,
        errorElement: <Error/>
      },
    ]
  },
  {
    path: "*", // Catch-all route for 404 errors
    element: <Error/>,
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
