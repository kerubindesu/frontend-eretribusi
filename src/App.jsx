import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import Main from "./components/templates/Main";
import {
  Bill,
  CreateBill,
  Retribution,
  CreateRetribution,
  UpdateRetribution,
  Analytic,
  Dashboard,
  Invoice,
  Login,
  NotFound,
  Register,
  User,
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
} from "./components/pages";
import { RequireAuth } from "./config";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytic />} />
              <Route path="invoices">
                <Route index element={<Invoice />} />
                {/* <Route path="add" element={<CreateRetribution />} />
                <Route path=":id/edit" element={<UpdateRetribution />} /> */}
              </Route>
              <Route path="bills">
                <Route index element={<Bill />} />
                <Route path="add" element={<CreateBill />} />
                <Route path=":id/edit" element={<UpdateBill />} />
              </Route>
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
              <Route path="users" element={<User />} />
            </Route>
          </Route>
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
