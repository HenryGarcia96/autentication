export class User {
    id: string;           // User ID from Appwrite
    email: string;        // User's email
    name?: string;        // User's name (optional)
    phone?: string;
    registrationDate?: string;  // Optional: Date when user registered (from Appwrite $createdAt)
    status?: boolean;     // Optional: User status (you can set this to active/inactive)
  }