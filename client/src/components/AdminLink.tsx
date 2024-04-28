// import { useState, useLayoutEffect } from "react";
// import { Link } from "react-router-dom";

// const AdminLoginLink = () => {
//     const [showAdminLogin, setShowAdminLogin] = useState(false);

//     useLayoutEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY;
//             const pageHeight = document.body.scrollHeight;
//             const windowHeight = window.innerHeight;

//             // Om användaren har scrollat nästan hela vägen ner, visa admininlogg-länken
//             if (scrollPosition >= pageHeight - windowHeight) {
//                 setShowAdminLogin(true);
//             } else {
//                 setShowAdminLogin(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     return (
//         <div style={{ display: showAdminLogin ? "block" : "none" }}>
//            <Link to="/admin">Adminlogin</Link>
           
//         </div>
//     );
// };

// export default AdminLoginLink;

import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

const AdminLoginLink = () => {
    const [showAdminLogin, setShowAdminLogin] = useState(false);

    useLayoutEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const pageHeight = document.body.scrollHeight;
            const windowHeight = window.innerHeight;

            // Fördröjning innan länken visas
            if (scrollPosition >= pageHeight - windowHeight && !showAdminLogin) {
                // Fördröjning på 500 ms (justera efter behov)
                timeoutId = setTimeout(() => {
                    setShowAdminLogin(true);
                }, 2000);
            }

            // Om användaren har scrollat tillbaka upp, dölj länken igen
            if (scrollPosition < pageHeight - windowHeight && showAdminLogin) {
                setShowAdminLogin(false);
                clearTimeout(timeoutId);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, [showAdminLogin]);

    return (
        <div style={{ display: showAdminLogin ? "block" : "none" }}>
           <Link to="/admin">Adminlogin</Link>
        </div>
    );
};

export default AdminLoginLink;
