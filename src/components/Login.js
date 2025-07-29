import React from "react";
import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%] ">
        <div>
          <img
            width={"200px"}
            src="/NodesLogoForEcho.png"
            alt="Logo"
            className="logo mb-4"
          />
        </div>
        <div>
          <div>
            <h1 className="text-8xl font-bold mb-10">Welcome to Echo.</h1>
          </div>
          <h1 className="text-2xl font-bold mb-4">
            {isLogin ? "Sign up" : "Login"}
          </h1>
          <form className="flex flex-col w-[50%]] max-w-[300px] space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="  outline-slate-500 border border-gray-300 p-2 rounded-md font-medium"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className=" outline-slate-500 border border-gray-300 p-2 rounded-md font-medium"
                />
              </>
            )}

            <input
              type="text"
              placeholder="Email"
              className=" outline-slate-500 border border-gray-300 p-2 rounded-md font-medium"
            />
            <input
              type="text"
              placeholder="Password"
              className=" outline-slate-500 border border-gray-300 p-2 rounded-md font-medium"
            />
            <button className=" bg-slate-900 text-white p-2 rounded-md font-semibold hover:bg-slate-700 transition duration-300">
              Login
            </button>

            <h1 className="font-medium text-gray-600">
              {isLogin
                ? "Do not have an account? "
                : "Already have an account? "}
              <span
                onClick={loginHandler}
                className="cursor-pointer font-semibold text-slate-900 hover:text-slate-700 active:scale-95 transition-all duration-200 underline-offset-2 hover:underline ml-1"
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
