import { Endpoints } from "../../backend/endpoints.ts";

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Welcome To Photo Blogger
        </h1>
        <p className="text-gray-600 mb-6">Login to continue</p>
        <a
          className="w-full bg-orange-600 text-white text-center block px-2 py-2 text-lg rounded-sm hover:bg-orange-600/90"
          href={Endpoints.AUTH.LOGIN}
        >
          Login with cognito
        </a>
      </div>
    </div>
  );
};

export default AuthPage;
