import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const userData = {
      email,
      password,
    };
    axios
      .post("/login", userData)
      .then((response) => {
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        setLoading(false);
        props.history.push("/");
      })
      .catch((error) => {
        console.error(error.response.data);
        setErrors(error.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="flex my-8">
      <form className="m-auto w-full max-w-sm">
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userEmail"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="email"
              name="userEmail"
              value={email}
              placeholder="Email Address"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userPassword"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="password"
              name="userPassword"
              value={password}
              placeholder="************"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          {loading ? (
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button
              className="w-1/2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={onSubmitHandler}
            >
              Login
            </button>
          )}
        </div>
        {errors && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-3 mx-4 rounded relative"
            role="alert"
          >
            {errors.general}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
