import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user-model";

export async function POST(request) {
  // Connect to the database
  await dbConnect();

  try {
    const { userId, code } = await request.json();

    // Find user by _id instead of assuming it's an email
    const user = await UserModel.findById(userId);

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    // Uncomment and use the expiry check if needed
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid) {
      // Update the user's verification status
      user.isVerified = true;
      user.verifyCode = ""; // Clear the verification code after it's used
      await user.save();

      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );

      // Uncomment if you want to handle code expiry
      } else if (!isCodeNotExpired) {
        // Code has expired
        return Response.json(
          {
            success: false,
            message: "Verification code has expired. Please request a new code.",
          },
          { status: 400 }
        );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
