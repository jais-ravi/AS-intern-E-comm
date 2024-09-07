import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import {ApiResponse} from "@/types/ApiResponse"

// const resend = new Resend('process.env.RESEND_API_KEY');

export async function sendVerificationEmail(email, username, verifyCode) {
  try {
    await resend.emails.send({
      from: "AS-intern <onboarding@resend.dev>",
      to: email,
      subject: "Hello world",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
