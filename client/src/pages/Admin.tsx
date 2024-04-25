import { useState } from "react";
import AdminAddProducts from "../components/AdminAddProducts";
import AdminEditProducts from "../components/AdminEditProduct";
import OrderList from "../components/OrderList";
import AdminLogin from "../components/AdminLogin";

const Admin = () => {
  const [admin, setAdmin] = useState(() => localStorage.getItem("admin") !== null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAdminStatus = (adminStatus: boolean) => {
    adminStatus ? localStorage.setItem("admin", "true") : localStorage.removeItem("admin");
    setAdmin(adminStatus);
  };

  return (
    <>
      <main className="flex-shrink mt-5">
        <div className="container py-4">
          <h2>ADMIN</h2>
          {admin ? (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="p-2 bg-light border my-2">
                    {showAddProduct ? (
                      <AdminAddProducts />
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowAddProduct(true)}
                      >
                        Add Product
                      </button>
                    )}
                    <AdminEditProducts />
                  </div>
                  <div><h2>ORDERS</h2><OrderList /></div>
                </div>
              </div>
              <button
                className="btn btn-outline-primary button"
                onClick={() => handleAdminStatus(false)}
              >
                Logout
              </button>
            </>
          ) : (
            <AdminLogin handleAdminStatus={handleAdminStatus} />
          )}
        </div>
      </main>
    </>
  );
};

export default Admin;