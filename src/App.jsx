import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/layouts/Main";
import {
  Bill,
  CreateBill,
  Retribution,
  CreateRetribution,
  UpdateRetribution,
  Dashboard,
  Invoice,
  Login,
  NotFound,
  User,
  CreateUser,
  UpdateUser,
  Stall,
  CreateStall,
  UpdateStall,
  BusinessType,
  CreateBusinessType,
  UpdateBusinessType,
  Role,
  CreateRole,
  UpdateBill,
  UpdateRole,
  InvoiceDetail,
  DetailBill,
} from "./components/pages";
import { RequireAuth } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./features/auth/authActions";
import jwt_decode from "jwt-decode";

function App() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("Admin");

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setRole(decoded?.UserInfo?.role);
    }
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="invoices">
                <Route index element={<Invoice />} />
                <Route path=":id" element={<InvoiceDetail />} />
              </Route>
              <Route path="bills">
                <Route index element={<Bill />} />
                {role === "Admin" && (
                  <>
                    <Route path="add" element={<CreateBill />} />
                    <Route path=":id/edit" element={<UpdateBill />} />
                    <Route path=":id" element={<DetailBill />} />
                  </>
                )}
              </Route>
              {role === "Admin" && (
                <>
                  <Route path="retributions">
                    <Route index element={<Retribution />} />
                    <Route path="add" element={<CreateRetribution />} />
                    <Route path=":id/edit" element={<UpdateRetribution />} />
                  </Route>
                  <Route path="stalls">
                    <Route index element={<Stall />} />
                    <Route path="add" element={<CreateStall />} />
                    <Route path=":id/edit" element={<UpdateStall />} />
                  </Route>
                  <Route path="type-of-business">
                    <Route index element={<BusinessType />} />
                    <Route path="add" element={<CreateBusinessType />} />
                    <Route path=":id/edit" element={<UpdateBusinessType />} />
                  </Route>
                  <Route path="roles">
                    <Route index element={<Role />} />
                    <Route path="add" element={<CreateRole />} />
                    <Route path=":id/edit" element={<UpdateRole />} />
                  </Route>
                  <Route path="users">
                    <Route index element={<User />} />
                    <Route path="add" element={<CreateUser />} />
                    <Route path=":id/edit" element={<UpdateUser />} />
                  </Route>
                </>
              )}
            </Route>
          </Route>
          <Route path="/auth">
            <Route index element={<Login />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
