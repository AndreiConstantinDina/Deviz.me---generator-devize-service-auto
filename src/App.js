import './App.css';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Carbrand from './components/CarBrand';
import Authentificate from "./components/Authentificate";
import DataFetch from "./components/DataFetch";
import Navbar from "./components/Navbar";
import CarEstimate from './components/CarEstimate'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Estimates from './components/Estimates'
import About from './components/About'
import RootPage from "./components/RootPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "/istoric-devize",
                index: true,
                element: <Estimates />,
            },
            {
                path: "/creare-deviz",
                element: <CarEstimate />,
            },

            {
                path: "/about",
                element: <About />,
            },
        ],
    },
]);

function App() {
    return <div>
        <RouterProvider router={router} />
    </div>
}

export default App;
