import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
      <div className="App">
        <Outlet />
      </div>
  );
};

export default Layout;
