import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user-model";

export async function POST() {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername }); //TODO: change it top email and mobile no

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    // const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()

    if (isCodeValid) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified successfully",//TODO: check verification mail
        },
        { status: 200 }
      );
    } 
    // ek else if condition dena h jisme code expire check hoga
    else {
      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error checking username", error);

    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
