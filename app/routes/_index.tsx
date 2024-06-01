import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Card, Button, Input } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = () => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };
  return { env };
};

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  );

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error; // Handle errors gracefully (e.g., display error messages)
    }

    return data?.user; // Access user data within the 'data' property
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hellow from HP");

    try {
      const user = await signIn(email, password);
      // Redirect to users route after successful login
      window.location.href = "/user"; // Replace with appropriate redirect logic
    } catch (error) {
      console.error('Unexpected error:', error);
    setError('It seems the credentials are wrong. Please try again.');
      // Handle errors gracefully (e.g., display error messages)
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <h1 className="text-4xl font-bold text-center mb-10 text-white z-10">
        Student's Sports Federation
      </h1>
      <div className="flex flex-wrap justify-center gap-4 w-[90vw]">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-2/5 p-4">
          <Card className="p-6 w-full">
            <h3 className="text-2xl mb-4">Student Login</h3>
            <form onSubmit={handleSubmit}>
              <Input
                isClearable
                fullWidth
                color="primary"
                size="lg"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <Input
                isClearable
                fullWidth
                color="primary"
                size="lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              {error && (
  <p className="text-red-500 text-sm mb-2">{error}</p>
)}
              <Button type="submit" color="primary" className="w-full mb-2">
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
