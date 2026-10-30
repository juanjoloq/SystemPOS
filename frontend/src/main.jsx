import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";

import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import SidebarProvider from "./context/SidebarProvider";

import "./api/interceptors";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
              <ThemeProvider>
                <SidebarProvider>
                  <App />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                    }}
                  />
                </SidebarProvider>
              </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);