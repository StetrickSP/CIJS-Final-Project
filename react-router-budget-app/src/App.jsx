import {createBrowserRouter, RouterProvider} from "react-router-dom";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";
import { deleteBudget } from "./actions/deleteBudget";

// Routes
import Dashboard, { dashboardLoader, dashboardAction } from "./pages/Dashboard";
import About, { aboutLoader } from "./pages/About";
import Error from "./pages/Error";
import ExpensesPage, { expensesLoader, expensesAction } from "./pages/ExpensesPage";
import BudgetPage, { budgetLoader, budgetAction } from "./pages/BudgetPage";
import Chart from "./pages/Chart";

// Library
import { ToastContainer } from 'react-toastify';
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
        action: dashboardAction, // This will call the dashboard action when the user submits the form
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
        element:<>
        <h1>This is our contact infomation</h1>
        <p>Ngô Tấn Tài (CTO): 0767139786</p>
        <p>Hồ Văn Ngọc (CEO): 0903664457</p>
        </>
      },
      {
        path: "chart", 
        element: <Chart/>,
        errorElement: <Error/>,
      },
      {
        path: "budget/:id", 
        element: <BudgetPage/>,
        loader: budgetLoader, 
        action: budgetAction, 
        errorElement: <Error/>,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "expenses", 
        element: <ExpensesPage/>,
        loader: expensesLoader, 
        action: expensesAction, // This will call the expenses action when the user submits the form
        errorElement: <Error/>,
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
