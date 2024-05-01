import { useState, FormEvent, ChangeEvent } from "react";

const CustomerRegister = () => {
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [streetInput, setStreetInput] = useState("");
    const [cityInput, setCityInput] = useState("");

    const register = async (e: FormEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/create-customer", { 
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ 
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            address: {
              street: streetInput,
              city: cityInput
            }
          }),
        });
        const data = await response.json();
        console.log(data);
    
      };

      const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstNameInput(e.target.value);
      };

      const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastNameInput(e.target.value);
      };
    
      const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
      };
    
      const handleStreetChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStreetInput(e.target.value);
      };

      const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCityInput(e.target.value);
      };
      
    return (
        <form onSubmit={register}>
            <label htmlFor="firstNameInput">First Name</label>
            <input
                id="firstNameInput"
                value={firstNameInput}
                onChange={handleFirstNameChange}
            />
            <label htmlFor="lastNameInput">Last Name</label>
            <input
                id="lastNameInput"
                value={lastNameInput}
                onChange={handleLastNameChange}
            />
            <label htmlFor="emailInput">Email</label>
            <input
                id="emailInput"
                value={emailInput}
                onChange={handleEmailChange}
            />
            <label htmlFor="streetInput">Street</label>
            <input
                id="streetInput"
                value={streetInput}
                onChange={handleStreetChange}
            />
            <label htmlFor="cityInput">City</label>
            <input
                id="cityInput"
                value={cityInput}
                onChange={handleCityChange}
            />
            <button>Register</button>
        </form>
    );
};

export default CustomerRegister;
