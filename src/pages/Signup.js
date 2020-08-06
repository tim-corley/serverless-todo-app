import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userFirstName") {
      setFirstName(value);
    } else if (name === "userLastName") {
      setLastName(value);
    } else if (name === "userPhoneNumber") {
      setPhoneNumber(value);
    } else if (name === "userCountry") {
      setCountry(value);
    } else if (name === "userName") {
      setUsername(value);
    } else if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "userConfirmPassword") {
      setConfirmPassword(value);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const newUserData = {
      firstName,
      lastName,
      phoneNumber,
      country,
      username,
      email,
      password,
      confirmPassword,
    };
    axios
      .post("/signup", newUserData)
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

  const handleErrors = (errorObj) => {
    const allErrors = Object.entries(errorObj);
    const errItems = allErrors.map((error, index) => {
      return (
        <div
          className="bg-red-100 border border-red-400 text-sm text-red-700 px-4 py-3 my-3 mx-4 rounded relative"
          role="alert"
          key={index}
        >{`The ${error[0]} field ${error[1].toLowerCase()}.`}</div>
      );
    });
    return <div>{errItems}</div>;
  };

  return (
    <div className="flex my-8">
      <form className="m-auto w-full max-w-sm">
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userFirstName"
            >
              First Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="userFirstName"
              value={firstName}
              placeholder="Alex"
              id="userFirstName"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userLastName"
            >
              Last Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="userLastName"
              value={lastName}
              placeholder="Smith"
              id="userLastName"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userPhoneNumber"
            >
              Phone Number
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="tel"
              name="userPhoneNumber"
              value={phoneNumber}
              placeholder="212-555-1234"
              id="userPhoneNumber"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userCountry"
            >
              Country
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="userCountry"
              value={country}
              placeholder="United States"
              id="userCountry"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userName"
            >
              Display Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="userName"
              value={username}
              placeholder="a.smith321"
              id="userName"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
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
              placeholder="smith@email.com"
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
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 mr-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="userConfirmPassword"
            >
              Confirm Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="password"
              name="userConfirmPassword"
              value={confirmPassword}
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
              Sign Up
            </button>
          )}
        </div>
        {errors && handleErrors(errors)}
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
};

export default Signup;
