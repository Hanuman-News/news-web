import React, { useState } from "react";

const AuthModal = ({
  isLoginOpen,
  setIsLoginOpen,
  isRegister,
  setIsRegister,
  handleAuthSubmit,
}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = isRegister 
      ? { name, email, password } 
      : { name, password };
    handleAuthSubmit(credentials);
    // Clear form after submission
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    isLoginOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl relative">
          <button
            onClick={() => setIsLoginOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
          <h2 className="text-lg font-bold text-center">
            {isRegister ? "Register" : "Login"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
            {isRegister && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            )}
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 hover:underline"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default AuthModal;