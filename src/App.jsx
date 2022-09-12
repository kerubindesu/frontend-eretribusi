import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import ContainerApp from "./components/templates";
import {
  Retributions,
  PostRetribution,
  UpdateRetribution,
  Analytics,
  Dashboard,
  Login,
  NotFound,
  Register,
  Users,
} from "./components/pages";
import RequireAuth from "./config";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<ContainerApp />}>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="retributions">
                <Route index element={<Retributions />} />
                <Route path="add" element={<PostRetribution />} />
                <Route path=":id" element={<UpdateRetribution />} />
              </Route>
              <Route path="users" element={<Users />} />
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
