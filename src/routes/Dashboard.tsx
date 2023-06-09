import DashboardHeader from "../components/DashboardHeader";
import DashboardNav from "../components/DashboardNav";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";

export default function Dashboard() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isLoggedIn) {
      return navigate("/");
    }

    if (location.pathname === "/dashboard") {
      return navigate("/dashboard/account");
    }
  });

  return (
    <>
      <DashboardHeader />
      <main className="dashboard">
        <DashboardNav />
        <div className="dashboard-main">
          <Outlet />
        </div>
      </main>
    </>
  );
}
