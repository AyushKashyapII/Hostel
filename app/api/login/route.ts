        'use server';
        import bcrypt from "bcryptjs";
        import prisma from "@/libs/prismadb";
        import { NextResponse } from "next/server";

        export async function POST(
            request:Request
        )
        {
            
        const body=await request.json();
        console.log(body);
        const {email,password}=body;
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" });
        }
        try {
            const user = await prisma.user.findUnique({
            where: { email },
            });

            if (!user) {
            return NextResponse.json({ message: "User not found" });
            }
            let isPasswordValid=false;
            if(user.hashedPassword){

                isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
            }
            

            if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" });
            }

            return NextResponse.json({ message: "Login successful", user });
        } catch (error) {
            console.error("Error during login:", error);
            return NextResponse.json({ message: "Internal server error" });
        }

        }