// /app/api/auth/send-otp/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodborder";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { sendOTPEmail } from "@/lib/sendOTPEmail";

export async function POST(request: Request) {
  console.log(">>> send-otp API POST hit");

  await dbConnect();

  try {
    const { name, email, password, role, organization } = await request.json();

    const existingVerifiedUserByEmail = await User.findOne({
      email,
      isEmailVerified: true,
    })

    if (existingVerifiedUserByEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await User.findOne({ email });
    let otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isEmailVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.otp = otp;
        existingUserByEmail.otpExpiration = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        organization,
        otp,
        otpExpiration: expiryDate,
        isEmailVerified: false,
        isVerified: false,
        applicationStatus: "PENDING",
      });

      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendOTPEmail(email, name, otp);
    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    // ✅ Set the just-registered cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );

    response.cookies.set("just-registered", email, {
      httpOnly: true,
      maxAge: 5 * 60, // 5 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
