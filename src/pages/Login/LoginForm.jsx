const LoginForm = (props) => {
  return (
    <form className="w-full max-w-md rounded-lg shadow-lg p-8" action="">
      <h1 className="mb-8">Login</h1>
      <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
        Username
      </label>
      <input
        type="text"
        name="username"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label
        htmlFor="password"
        className="block text-gray-700 font-bold mb-2"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </form>
  );
};

export default LoginForm;
