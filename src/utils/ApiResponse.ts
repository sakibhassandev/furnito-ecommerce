export class ApiResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: unknown;
  constructor(statusCode: number, data: unknown, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
