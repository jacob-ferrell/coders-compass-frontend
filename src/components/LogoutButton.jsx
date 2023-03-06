export default function LogoutButton(props) {
  return (
    <button className="bg-purple-500" onClick={() => navigate("/logout")}>
      Logout
    </button>
  );
}
