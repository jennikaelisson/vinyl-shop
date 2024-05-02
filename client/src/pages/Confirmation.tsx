

import { useState } from "react";

const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifySession = async () => {
    setIsLoading(true); // Sätt isLoading till true när du börjar verifiera sessionen

    const dataFromLS = localStorage.getItem("orderId");
    console.log(dataFromLS);

    if (dataFromLS) {
      const orderId = JSON.parse(dataFromLS);
console.log(dataFromLS);
console.log(orderId);

   
    const response = await fetch(`http://localhost:3000/complete-order/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
      });
      const data = await response.json();

      if (response.ok) {
        setVerified(data.verified);
      }
    }

    setIsLoading(false); // Sätt isLoading till false när verifieringen är klar
  };

  return (
    <>
      {verified && !isLoading ? (
        <p>Tack för ditt köp</p>
      ) : (
        <>
          <button onClick={handleVerifySession} disabled={isLoading}>
            {isLoading ? "Verifierar..." : "Pay"}
          </button>
          {isLoading && <p>Laddar...</p>}
        </>
      )}
    </>
  );
};

export default Confirmation;
