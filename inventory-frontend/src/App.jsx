import { BrowserRouter } from "react-router-dom";
import { LoggedLayout } from "./components/routes";
import { AuthProvider } from "./context";

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen">
        <AuthProvider>
          <LoggedLayout />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}


