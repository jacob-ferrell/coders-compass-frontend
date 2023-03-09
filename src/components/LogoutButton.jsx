import { useNavigate } from "react-router-dom";

export default function LogoutButton(props) {
  const navigate = useNavigate();

  return (
    <button className="bg-purple-500 text-white" onClick={() => navigate("/logout")}>
      Logout
    </button>
  );
}
