import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import { LoginCallBack } from "./pages/auth/LoginCallBack";
import UserPageLayout from "./pages/user/UserPageLayout";
import HomePage from "./pages/user/HomePage";
import { OthersPage } from "./pages/user/OthersPage";
import { RecycleBinPage } from "./pages/user/RecycleBinPage";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/">
      <Route index element={<AuthPage />} />
      <Route path="auth/callback" element={<LoginCallBack />} />
      <Route path="home" element={<UserPageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="others-photos" element={<OthersPage />} />
        <Route path="recycling-bin" element={<RecycleBinPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
