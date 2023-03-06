const LoginForm = ({handleChange, handleSubmit}) => {
  return (
    <form className="w-full max-w-md rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
      <h1 className="mb-8">Login</h1>
      <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
        Email
      </label>
      <input
        onChange={handleChange}
        type="email"
        name="email"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label
        htmlFor="password"
        className="block text-gray-700 font-bold mb-2"
      >
        Password
      </label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button className="bg-purple-500" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
