import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { ContainerApp, ContainerAuth } from "./components/templates";
import {
  Retributions,
  PostRetribution,
  UpdateRetribution,
  Analytics,
  Dashboard,
  Login,
  NotFound,
  Register,
  Accounts,
  PostAccount,
  UpdateAccount,
} from "./components/pages";
import ProtectedRoute from "./config";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ContainerApp />}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="retributions">
                <Route index element={<Retributions />} />
                <Route path="add" element={<PostRetribution />} />
                <Route path=":id" element={<UpdateRetribution />} />
              </Route>
              <Route path="bank-accounts">
                <Route index element={<Accounts />} />
                <Route path="add" element={<PostAccount />} />
                <Route path=":id" element={<UpdateAccount />} />
              </Route>
            </Route>
          </Route>
          <Route path="/auth" element={<ContainerAuth />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
