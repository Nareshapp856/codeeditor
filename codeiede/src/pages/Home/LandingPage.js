import { useEffect } from "react";
import { useNavigate } from "react-router";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}

export default LandingPage;
