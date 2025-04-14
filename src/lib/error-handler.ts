// import { NeonDbError } from "@neondatabase/serverless";

// export const serverErrorHandler = <T extends (...args: any[]) => Promise<any>>(
//   fn: T,
// ): ((...args: Parameters<T>) => Promise<
//   | Awaited<ReturnType<T>> // Ensure correct return type of the original function
//   | { error: string } // Allow error handling
// >) => {
//   return async (...args: Parameters<T>) => {
//     try {
//       return await fn(...args);
//     } catch (error) {
//       if (error instanceof NeonDbError) {
//         switch (error.code) {
//           case "23505":
//             return { error: "This number has already taken" };
//           default:
//             return { error: error.message };
//         }
//       }
//       return { error: "An unknown error occurred" };
//     }
//   };
// };
