export interface UserResponse {
  id: number,
  fullName: string,
  email: string,
  createAt: Date,
  deletedAt: Date | null ,
}
