import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedLayer({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authentication !== authStatus) {
      navigate("/login");
    } else if (!authentication && authentication !== authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return (
      <div className="text-center">
        <h1 className="text-2xl rounded-lg text-slate-600 font-semibold tracking-tight p-2 md:px-4 py-6">
          Loading...
        </h1>
      </div>
    );
  } else return <div>{children}</div>;
}

export default ProtectedLayer;
