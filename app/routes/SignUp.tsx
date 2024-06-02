import { Button, Input, Textarea } from "@nextui-org/react"
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";

export const loader = () => {
    const env = {
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    };
    return { env };
  };

const signup = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { env } = useLoaderData<typeof loader>();
  const [supabase] = useState(() =>
    createClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  );

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      

      if (error) {
        setError(error.message); // Set the error message from Supabase
        return;
      }

      setSuccess('Sign-up successful! Please verify your email.');

      
      // Optionally, redirect the user to a different page after successful sign-up
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSignUp}>
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
      <Button type="submit" color="secondary" className="w-full mb-2">
        Sign Up
      </Button>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && (
        <Textarea
          value={success}
          readOnly
          className="text-green-500 text-sm mb-2"
        />
      )}
    </form>
  )
}

export default signup