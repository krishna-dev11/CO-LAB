import { transporter, sender } from "./nodemailer.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  TEAM_INVITATION_EMAIL_TEMPLATE,
  TEAM_JOIN_CONFIRMATION_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendEmailVerification = async (email, verificationToken) => {
  try {
    const response = await transporter.sendMail({
      from: sender, // sender address
      to: email, // list of receivers
      subject: "Email Verification", // Subject line
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Error sending email verification ${error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Welcome to CO-LAB",
      html: WELCOME_EMAIL_TEMPLATE.replace("{{userName}}", name),
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    throw new Error(`Error sending welcome email ${error.message}`);
  }
};

export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const response = await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    });
    console.log("forget-password email sent successfully", response);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Error sending email verification ${error.message}`);
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: sender, // sender address
      to: email, // list of receivers
      subject: "Password Reset Success", // Subject line
      html: PASSWORD_RESET_SUCCESS_TEMPLATE, // plain text body
    });

    console.log("Password reset success email sent successfully", info);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(
      `Error sending password reset success email ${error.message}`
    );
  }
};

export const sendInvitationToUserEmail = async (
  email,
  inviteLink,
  teamName,
  userName
) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: `Invitation to join ${teamName} on Co-Lab`,
      html: TEAM_INVITATION_EMAIL_TEMPLATE(inviteLink, teamName, userName),
    });
    console.log("Invitation email sent successfully", info);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Error sending invitation email ${error.message}`);
  }
};

export const sendSuccessInviteEmail = async (email, teamName) => {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: email,
      subject: `Invitation to join ${teamName} on Co-Lab`,
      html: TEAM_JOIN_CONFIRMATION_TEMPLATE(teamName).replace(
        "{teamName}",
        teamName
      ),
    });
    console.log("Invitation email sent successfully", info);
  } catch (error) {
    console.error("Error sending email", error);
    throw new Error(`Error sending invitation email ${error.message}`);
  }
};
