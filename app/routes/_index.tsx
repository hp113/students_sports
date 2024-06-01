import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { supabase } from "../../supabase";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        console.log("Signed in successfully:", data);
        // Handle successful sign-in (e.g., redirect user to dashboard)
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      
      <h1 className="text-4xl font-bold text-center mb-10 text-white z-10">
        Student's Sports Federation
      </h1>
      <div className="flex flex-wrap justify-center gap-4 w-[90vw]">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 p-4">
          <Card className="p-6 w-full">
          <h3 className="text-2xl mb-4">Student Login</h3>
          <form onSubmit={handleSignIn}>
              <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
                isClearable
                
                fullWidth
                color="primary"
                size="lg"
                className="mb-4"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isClearable
                fullWidth
                color="secondary"
                size="lg"
                className="mb-4"
              />
              {error && <p className="text-red-500">{error}</p>}
              <Button type="submit" color="secondary" className="w-full mb-2">
                Student Login
              </Button>
            </form>
          </Card>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 p-4">
          <Card className="p-6 w-full">
            <h3 className="text-2xl mb-4">Admin Login</h3>
            <form>
              <Input
                isClearable
                
                fullWidth
                color="secondary"
                size="lg"
                placeholder="Email"
                className="mb-4"
              />
              <Input
                isClearable
                
                fullWidth
                color="secondary"
                size="lg"
                type="password"
                placeholder="Password"
                className="mb-4"
              />
              <Link to="/admin">
                <Button color="secondary" className="w-full mb-2">
                  Admin Login
                </Button>
              </Link>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
