const SignUpForm = ({handleChange, handleSubmit}) => {
  return (
    <form className="w-full max-w-md rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
      <h1 className="mb-8">Sign Up</h1>
      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
        Email
      </label>
      <input
        onChange={handleChange}
        type="email"
        name="email"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
      <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
        Username
      </label>
      <input
        onChange={handleChange}
        type="text"
        name="username"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
      <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
        Password
      </label>
      <input
        onChange={handleChange}
        type="password"
        name="password"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
     />
      <label htmlFor="password2" className="block text-gray-700 font-bold mb-2">
        Confirm Password
      </label>
      <input
        onChange={handleChange}
        type="password"
        name="password2"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
      <button className='bg-purple-500' type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
