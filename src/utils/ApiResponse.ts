export class ApiResponse {
  status: number;
  message: string;
  success: boolean;
  data?: unknown;
  constructor(status: number, data: unknown, message = "Success") {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}
