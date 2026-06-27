import { Op } from "sequelize";
import { UserModel } from "../models/auth.model";
import { customAlphabet } from "nanoid";
import bcrypt from "bcryptjs";
import { CustomError } from "../errors/customError";
import crypto from "crypto";
import { generateAccessToken, generateRandomToken } from "../utils/helpers";
import { EmailService } from "./email.services";
import { adminOrderTemplate, resetPasswordTemplate } from "../utils/template";
import { CreateUserDto, LoginDto, User } from "../types";

export class AuthServices {
  /**
   * ----------------------------------------
   * GENERATE ORDER NUMBER
   * ----------------------------------------
   */
  private static generateUserId() {
    const alphabet = "0123456789";

    const nanoid = customAlphabet(alphabet, 6);

    return `NRW-${nanoid()}`;
  }

  static async Signup(data: CreateUserDto) {
    console.log("data:", data);
    const userId = this.generateUserId();

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({
      fullname: data.fullname,
      email: data.email,
      userId,
      password: hashedPassword,
      role: data.role,
      phoneNumber: data.phoneNumber,
      address: data.address,
      isApproved: false,
    });

    return user;
  }

  static async login(credential: string, password: string): Promise<LoginDto> {
    const user = await UserModel.scope("withPassword").findOne({
      where: {
        [Op.or]: [{ email: credential }, { userId: credential }],
      },
    });

    if (!user) {
      throw new CustomError("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new CustomError("Invalid Credentials");
    }

    const accessToken = generateAccessToken(user.toJSON());

    const responseUser: User = {
      userId: user.userId,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      isApproved: user.isApproved,
      role: user.role,
    };
    return {
      responseUser,
      accessToken,
    };
  }

  static async forgotPassword(email: string) {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomError("Invalid credentials");
    }

    const tokenHash = generateRandomToken(50, "alphanumeric");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    console.log("tokenHash", tokenHash);
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset?token=${tokenHash}`;

    user.resetToken = tokenHash;
    user.resetTokenExpiry = expiresAt;

    await user.save();

    const expiryMinutes = 15;
    const mail = await EmailService.sendMail({
      to: [{ email: user.email, name: user.fullname }],
      subject: "Reset Password Email",
      html: resetPasswordTemplate(user.fullname, resetLink, expiryMinutes),
      sender: {
        name: "Admin@Noble Restaurant",
        email: "noblerestaurantng@gmail.com",
      },
    }).catch((err: any) => {
      console.log("Reset Email failed", err);
    });
  }

  static async resetPassword(token: string, newPassword: string) {
    console.log("token:", token);
    console.log("password:", newPassword);
    const user = await UserModel.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: new Date() },
      },
    });

    if (!user) throw new CustomError("Invalid or Expired Token", 401);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return true;
  }
}
