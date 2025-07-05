import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";

// Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import About, { aboutLoader } from "./pages/About";
import Error from "./pages/Error";

// Library
import{ ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      {
        path: "about",
        element: <About/>,
        loader: aboutLoader,
        errorElement: <Error/>
      },
      {
        path: "contact", 
        element: <h1>This is our contact infomation</h1>
      },
      {
        path: "logout", 
        action: logoutAction, // This will call the logout action when the user navigates to /logout
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
      <ToastContainer />  
    </div>
  )
}

export default App;
