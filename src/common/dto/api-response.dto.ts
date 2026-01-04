export class ApiResponseDto<T> {
  data: T;
  message: string;
  timestamp: string;

  constructor(data: T, message: string = 'Sucesso') {
    this.data = data;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}
