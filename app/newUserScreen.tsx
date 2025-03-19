export default function NewUser() {
    return (
      <div className="min-h-screen bg-purple-200 p-6 flex flex-col justify-center items-center space-y-6">
        <h1 className="text-2xl font-semibold text-gray-700">Create New Account</h1>
  
        <input
          type="text"
          placeholder="Username"
          className="w-80 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
  
        <input
          type="email"
          placeholder="Email"
          className="w-80 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
  
        <input
          type="password"
          placeholder="Password"
          className="w-80 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
  
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-80 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
  
        <button className="w-80 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Create Account</button>
  
        <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-purple-500">Log In</a></p>
      </div>
    );
  }
  