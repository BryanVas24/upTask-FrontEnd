import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RegquestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordview from "./views/profile/ChangePasswordview";
import ProfileLayout from "./layouts/ProfileLayout";
/*el Route que contiene el element es el padre y el que contiene la ruta y la vista es el hijo, 
index significa que es la pagina principal de esa ruta*/
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:projectId/details"
            element={<ProjectDetailsView />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route
              path="/profile/ChangePassword"
              element={<ChangePasswordview />}
            />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RegquestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
