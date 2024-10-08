import transporter from "@/lib/nodemailer";
import VerificationEmail from "../../emails/VerificationEmail";
import { render } from "@react-email/render";

export default async function sendVerificationEmail(email, username, verifyCode) {
  const emailHTML = await render(
    <VerificationEmail username={username} otp={verifyCode} />
  );
  const mailOptions = {
    from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Email Verification Code",
    text: "Verification mail", 
    html: emailHTML,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
