import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Card, Button } from "@nextui-org/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Student's Sports Federation
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="max-w-sm w-full">
          <Card className="p-6 w-full">
            <h3 className="text-2xl mb-4">User Login</h3>
            <Link to="/user">
              <Button color="primary" className="w-full mb-2">
                Student Login
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Participate in the events. You can register for up to 3 events.
            </p>
          </Card>
        </div>
        <div className="max-w-sm w-full">
          <Card className="p-6 w-full">
            <h3 className="text-2xl mb-4">Admin Login</h3>
            <Link to="/admin">
              <Button color="secondary" className="w-full mb-2">
                Admin Login
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Manage participants and approve participation requests.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
