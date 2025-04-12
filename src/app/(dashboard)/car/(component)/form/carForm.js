"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export const CarForm = ({ action, header }) => {
  const initialState = { message: "", error: null, success: false };
  const [state, formAction] = useActionState(action, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.back();
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="mx-auto">
      <h1 className="text-white text-3xl pb-5">{header}</h1>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your car name"
          required
        />
      </div>
      <div className="flex flex-col w-full justify-end gap-2 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Back
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
