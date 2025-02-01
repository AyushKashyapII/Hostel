'use server';
import prisma from "@/libs/prismadb";
import bcrypt from "bcryptjs";
import { request } from "http";
import { NextResponse } from "next/server";
export async function POST(
    request:Request
){
    const body=await request.json();
    console.log(body);
    const {name,email,password}=body;

    if(!name||!email||!password){
        return NextResponse.json("Name, email and password are required");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    try{
        const user=await prisma.user.create({data:{email,name,hashedPassword}});
        return NextResponse.json(user);
    }catch (error) {
        if (error instanceof Error) {
            console.error("Error creating user:", error.message);
            return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
        } else {
            console.error("Unknown error creating user");
            return NextResponse.json({ error: "Unknown error" }, { status: 500 });
        }
    }
}
