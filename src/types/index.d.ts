// Define any generic types for the application that might be used globally
export type ResponseStatus = 'success' | 'error';  // Could be used for API responses

// Generic API response format
export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data?: T;  // Optional data of type T (could be any object or array)
}
