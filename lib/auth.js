import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectMongoDB from "./mongodb";
import User from "@/models/user";

export const authOptions = {
    providers: [
        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" },
                rememberMe: { label: "Remember me", type: "checkbox" }
            },
            async authorize(credentials) {
                await connectMongoDB();
                const user = await User.findOne({
                    $or: [
                        { email: credentials?.identifier },
                        { username: credentials?.identifier },
                    ],
                }).select("+password");

                if (!user) throw new Error("Wrong Email or Username");

                const passwordMatch = await bcrypt.compare(
                    credentials?.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Wrong Password");

                const maxAge = credentials.rememberMe === 'true' ? 30 * 24 * 60 * 60 : 24 * 60 * 60; //30 days, 1 day
                user.maxAge = maxAge;

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub;
                session.user.username = token["username"];
                session.maxAge = token["maxAge"];
                if (session.maxAge) {
                    session.expires = new Date(Date.now() + session.maxAge * 1000).toISOString();
                } else {
                    throw new Error("maxAge is not defined");
                }
                return session;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token["username"] = user.username;
                token["maxAge"] = user.maxAge;
            }
            return token;
        },
    },
};
