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
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectMongoDB();
                const user = await User.findOne({
                    email: credentials?.email,
                }).select("+password");

                if (!user) throw new Error("Wrong Email");

                const passwordMatch = await bcrypt.compare(
                    credentials?.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Wrong Password");
                return user;

            },
        }),
    ],
    session: {
        strategy: "jwt",
    }
};