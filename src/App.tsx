import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import { LoginCallBack } from "./pages/auth/LoginCallBack";
import HomePageLayout from "./pages/home/HomePageLayout";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/">
      <Route index element={<AuthPage />} />
      <Route path="auth/callback" element={<LoginCallBack />} />
      <Route path="home" element={<HomePageLayout />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
