import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
      </QueryClientProvider>
   
    </AuthProvider>
  </React.StrictMode>
);
