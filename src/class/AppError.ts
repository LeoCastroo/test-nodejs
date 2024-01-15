export default class AppError extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}
