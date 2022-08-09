import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { AppFrame, AuthFrame } from "./components/templates";
import {
  Analytics,
  AddUser,
  Dashboard,
  EditUser,
  Login,
  NotFound,
  Register,
  Retributions,
  Users,
} from "./components/pages";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppFrame />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<Users />}>
              <Route path="create" element={<AddUser />} />
              <Route path="edit/:id" element={<EditUser />} />
            </Route>
            <Route path="retribusi" element={<Retributions />} />
          </Route>
          <Route path="/auth" element={<AuthFrame />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
