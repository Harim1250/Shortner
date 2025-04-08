import { createBrowserRouter, Link, Links, RouterProvider } from "react-router-dom";
import './App.css'
import LandingPage from './Pages/LandingPage'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import AppLayout from './Layout/AppLayout'
import UrlProvider from "./Context";
import RequireAuth from "./components/require-auth";
import RedirectLink from "./Pages/RedirectLink";
import Ulinks from "./Pages/Ulinks";
const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
    
      {
        path:"/",
        element:<LandingPage/>
      },

      {
        path:"/auth",
        element:<Auth/>
      },

      {
        path:"/dashboard",
        element:(
           <RequireAuth>
             <Dashboard/>
           </RequireAuth>
        ),
      },

      {
        path: "/link/:id?", 
        element:(
          <RequireAuth>
           <Ulinks/>
          </RequireAuth>
        )
      },

      {
        path: "/:id",
        element:<RedirectLink/>
      },
    ],
  },
])
function App() {
  return (
      <UrlProvider> 
        <RouterProvider router={router}/> 
      </UrlProvider>
  );
}

export default App
