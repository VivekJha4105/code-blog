import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Error while logging out: ", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="py-2 px-4 rounded-lg font-semibold duration-200 shadow-lg bg-slate-600 text-white hover:bg-slate-800 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
