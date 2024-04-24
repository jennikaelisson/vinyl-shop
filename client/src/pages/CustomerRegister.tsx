import { useState, FormEvent, ChangeEvent } from "react";

const CustomerRegister = () => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [nameInput, setNameInput] = useState("");
  

    const register = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/register", { // JETODO vilken url?
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ name: nameInput, email: emailInput, password: passwordInput }),
        });
        const data = await response.json();
        console.log(data);
    
      };

      const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
      }
    
      const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
      };
    
      const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value);
      };
      
    return <><form onSubmit={register}>
    <label htmlFor="">Name</label>
    <input
      id="nameInput"
      value={nameInput}
      onChange={handleNameChange}
    />
    <label htmlFor="emailInput">Email</label>
    <input
      id="emailInput"
      value={emailInput}
      onChange={handleEmailChange}
    />
    <label htmlFor="passwordInput">Password</label>
    <input
      id="passwordInput"
      value={passwordInput}
      onChange={handlePasswordChange}
    />
    <button>Registrera</button>
  </form></>
}
export default CustomerRegister;