import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
/*el Route que contiene el element es el padre y el que contiene la ruta y la vista es el hijo, 
index significa que es la pagina principal de esa ruta*/
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
