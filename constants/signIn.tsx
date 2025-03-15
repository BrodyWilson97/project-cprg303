import React from "react";

export default function Login() {
    return (
      <div className="min-h-screen bg-purple-200 flex flex-col items-center justify-center p-4">
        <h1 className="text-gray-700 text-2xl mb-8">Harmoniq</h1>
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm text-gray-600">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">Log In</button>
          <div className="flex justify-between items-center text-sm text-gray-700">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Username?
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Password?
            </label>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <a href="#" className="hover:underline">Forgot Username?</a>
            <a href="#" className="hover:underline">New User?</a>
          </div>
        </div>
      </div>
    );
  }
  