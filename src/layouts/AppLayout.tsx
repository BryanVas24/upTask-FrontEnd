import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <>
      <div>Soy un layout principal</div>
      <Outlet />
    </>
  );
};

export default AppLayout;
