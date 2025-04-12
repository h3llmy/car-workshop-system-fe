"use client";
import { authenticate } from "@/lib/actions/auth/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

export default function LoginPage() {
  const initialState = { message: "", token: "", error: null, success: false };
  const [state, formAction] = useActionState(authenticate, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/car");
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={formAction}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            defaultValue={"test2@mail.com"}
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            defaultValue={"12345678"}
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="my-4 flex items-center">
          <p>don't have an account?</p>
          <Link className="text-blue-500 underline ms-4" href={"/register"}>
            register
          </Link>
        </div>
        {state.error && <p className="text-red-500">{state.error}</p>}
        <LoginButton />
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
