import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "../pages/auth/LoginPage";

import RegistrarVentaPage from "../pages/ventas/RegistrarVentaPage";
import HistorialVentasPage from "../pages/ventas/HistorialVentasPage";
import EditarVentaPage from "../pages/ventas/EditarVentaPage";
import CategoriasPage from "../pages/categorias/CategoriasPage";
import ProductosPage from "../pages/productos/ProductosPage";
import UsuariosPage from "../pages/usuarios/UsuariosPage";
import AuditoriaPage from "../pages/auditoria/AuditoriaPage";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>

          <Route index element={<RegistrarVentaPage />} />

          {/* Usuarios */}
          <Route path="usuarios" element={<UsuariosPage />} />

          {/* Categorías */}
          <Route path="categorias" element={<CategoriasPage />} />

          {/* Productos */}
          <Route path="productos" element={<ProductosPage />} />

          {/* Ventas */}
          <Route path="ventas"  element={<HistorialVentasPage />}/>
          <Route path="/ventas/:id/editar" element={<EditarVentaPage />}/>

          {/* Auditoría */}
          <Route path="auditoria" element={<AuditoriaPage />} />

        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default AppRoutes;