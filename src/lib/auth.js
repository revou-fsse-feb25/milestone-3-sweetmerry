import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            email: credentials.email,
            name: "Demo User",
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: "2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8",
  debug: false,
}; 