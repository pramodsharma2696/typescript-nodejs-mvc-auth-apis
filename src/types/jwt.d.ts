//structure of the JWT payload
export interface IJwtPayload {
  id: string;                   
  email: string;               
  role: 'student' | 'teacher' | 'admin';                 
}
