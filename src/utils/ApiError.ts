export class ApiError {
  statusCode: number;
  message: string = "Something went wrong";
  success: boolean;
  data: unknown;

  constructor(
    statusCode: number,
    data: unknown,
    message = "Something went wrong"
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
