import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const CustomerLogin = () => {
  const { loginUser, logoutUser } = useUser();

  const [emailLoginInput, setEmailLoginInput] = useState("");
  const [passwordLoginInput, setPasswordLoginInput] = useState("");

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: emailLoginInput,
        password: passwordLoginInput,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      loginUser(data);
    } else {
      logoutUser();
    }
    setEmailLoginInput("");
    setPasswordLoginInput("");
  };

  const handleLoginEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailLoginInput(e.target.value);
  };

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordLoginInput(e.target.value);
  };

  return (
    <>
      <h2>Log in here</h2>
      <form onSubmit={login}>
        <label htmlFor="emailLoginInput">Email</label>
        <input
          id="emailLoginInput"
          value={emailLoginInput}
          onChange={handleLoginEmailChange}
        />
        <label htmlFor="passwordLoginInput">Password</label>
        <input
          id="passwordLoginInput"
          type="password"
          value={passwordLoginInput}
          onChange={handleLoginPasswordChange}
        />
        <button>Logga in</button>
      </form>
      <div>
        <Link to="/register">Need to register?</Link>
      </div>
    </>
  );
};

export default CustomerLogin;
