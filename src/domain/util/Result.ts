export type Result<R> = Success<R> | Failure;

export interface Success<T> {
  type: 'success';
  data: T;
}

// Define Failure class
export interface Failure {
  type: 'failure';
  errorMessage: string;
  statusCode: number;
}

export function success<T>(data: T): Success<T> {
  return { type: 'success', data };
}

export function failure(errorMessage: string, statusCode: number): Failure {
  return { type: 'failure', errorMessage, statusCode };
}
