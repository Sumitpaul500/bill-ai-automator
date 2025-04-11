
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "@/components/auth/SignupForm";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary">BillScan AI</h1>
        <p className="text-muted-foreground mt-2">Smart bill processing with AI</p>
      </div>
      <SignupForm />
    </div>
  );
};

export default Register;
