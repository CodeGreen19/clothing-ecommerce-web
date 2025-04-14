import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";

export const handleSuccess = async (
  data: { error?: string; message?: string },
  queryClient?: QueryClient,
  query?: string[],
) => {
  console.log(data, "data");

  if (data?.message) {
    toast.success(data.message); // ✅ Show success toast
  }
  if (data?.error) {
    toast.error(data.error); // ✅ Show success toast
  }
  if (queryClient && query) {
    await queryClient.invalidateQueries({ queryKey: query });
  }
};

export const handleError = (error: unknown) => {
  let errorMessage = "Something went wrong!";

  if (error instanceof Error) {
    errorMessage = error.message;

    // ✅ Handle PostgreSQL Unique Constraint Error (Drizzle forwards as a generic error)
    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      const match = error.message.match(/unique constraint "([^"]+)"/);
      const constraintName = match ? match[1] : "Unique constraint";
      errorMessage = `Duplicate value error: ${constraintName}. Please use a different value.`;
    }

    // ✅ Handle Foreign Key Constraint Errors
    if (error.message.includes("violates foreign key constraint")) {
      errorMessage =
        "This record is linked to another entity and cannot be deleted.";
    }

    // ✅ Handle Not-Null Constraint Violations
    if (error.message.includes("violates not-null constraint")) {
      errorMessage = "A required field is missing.";
    }
  }

  // ✅ Handle Zod Validation Errors
  if (error instanceof ZodError) {
    errorMessage = error.errors.map((err) => err.message).join("\n");
  }

  // ✅ Handle Fetch Errors (API Calls)
  if (error instanceof Response) {
    if (error.status === 400)
      errorMessage = "Bad request! Please check your input.";
    if (error.status === 401) errorMessage = "Unauthorized! Please log in.";
    if (error.status === 403)
      errorMessage = "Forbidden! You don't have permission.";
    if (error.status === 404)
      errorMessage = "Not found! The requested resource doesn't exist.";
    if (error.status === 500)
      errorMessage = "Internal server error! Try again later.";
  }

  // 🔥 Show the error toast
  toast.error(errorMessage);
};
