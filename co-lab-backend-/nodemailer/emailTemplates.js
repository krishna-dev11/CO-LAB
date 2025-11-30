export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0;">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Co-Lab</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #FDF6EC; color: #1E3A8A;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
    <tr>
      <td style="padding: 40px 30px 20px 30px;">
        <img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" alt="Welcome Icon" width="64" style="margin-bottom: 20px;" />
        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Hey {{userName}}, welcome to Co-Lab 👋</h1>
        <p style="margin-top: 10px; font-size: 16px; line-height: 1.6;">
          We’re thrilled to have you here! Co-Lab is your real-time creative space to build, brainstorm, and collaborate.
        </p>
        <p style="margin-top: 20px; font-size: 16px; line-height: 1.6;">
          Jump into your first session with:
        </p>
        <ul style="padding-left: 20px; font-size: 16px; color: #1E3A8A;">
          <li>📝 Real-time collaborative document editing</li>
          <li>🧑‍🎨 Interactive whiteboard with Excalidraw</li>
          <li>💬 Built-in chat to keep ideas flowing</li>
        </ul>
        <div style="margin-top: 30px; text-align: center;">
          <a href="https://your-colab-website.com/start" style="background-color: #1E3A8A; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block; font-weight: 600;">
            Start Collaborating →
          </a>
        </div>
      </td>
    </tr>

    <tr>
      <td style="padding: 30px 30px; background-color: #FDF6EC; text-align: center;">
        <img src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/attachments/878760/Realtime-collaboration.gif" alt="Collaborate illustration" style="width: 100%; border-radius: 10px;" />
        <p style="font-size: 14px; margin-top: 20px; color: #4B5563;">Let your ideas flow freely with Co-Lab.</p>
        <p style="font-size: 14px; color: #9CA3AF;">Need help? <a href="mailto:support@co-lab.io" style="color: #1E3A8A;">Contact Support</a></p>
      </td>
    </tr>
  </table>

</body>
</html>`;

export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email | Co-Lab</title>
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #FDF6EC; color: #1E3A8A; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); overflow: hidden;">
    <div style="background-color: #1E3A8A; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: white;">Welcome to Co-Lab 👋</h1>
      <p style="color: #e0e7ff; margin-top: 8px;">Let's get you verified and collaborating!</p>
    </div>
    <div style="padding: 30px;">
      <p>Hey there,</p>
      <p>Thanks for signing up! Use the code below to verify your email and activate your Co-Lab account:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1E3A8A;">{verificationCode}</span>
      </div>
      <p>The code will expire in <strong>15 minutes</strong>.</p>
      <p>If this wasn't you, no worries — just ignore this message.</p>
      <p>See you inside,<br>— The Co-Lab Team</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #9CA3AF; padding: 20px;">
      <p>This is an automated message. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Reset Your Password | Co-Lab</title>
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #FDF6EC; color: #1E3A8A; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); overflow: hidden;">
    <div style="background-color: #1E3A8A; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: white;">Reset Password</h1>
      <p style="color: #e0e7ff; margin-top: 8px;">We’ve received your password reset request</p>
    </div>
    <div style="padding: 30px;">
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #1E3A8A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Reset My Password</a>
      </div>
      <p><strong>Note:</strong> This link will expire in <strong>1 hour</strong>.</p>
      <p>If you didn’t request this, feel free to ignore it.</p>
      <p>Warm regards,<br>The Co-Lab Team</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #9CA3AF; padding: 20px;">
      <p>This is an automated message. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset Successful | Co-Lab</title>
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #FDF6EC; color: #1E3A8A; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); overflow: hidden;">
    <div style="background-color: #1E3A8A; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: white;">Password Updated</h1>
      <p style="color: #e0e7ff; margin-top: 8px;">You’ve successfully changed your password</p>
    </div>
    <div style="padding: 30px;">
      <p>Hi there,</p>
      <p>Your Co-Lab account password was updated just now. If you didn’t do this, please contact our support immediately.</p>
      <ul style="margin-top: 20px;">
        <li>Use a unique, strong password</li>
        <li>Enable two-factor authentication (coming soon!)</li>
        <li>Never share login credentials</li>
      </ul>
      <p>Keep creating,<br>The Co-Lab Team</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #9CA3AF; padding: 20px;">
      <p>This is an automated message. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

export const TEAM_INVITATION_EMAIL_TEMPLATE = (
  inviteURL,
  teamName,
  invitedBy
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>You're Invited to Join ${teamName} | Co-Lab</title>
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #FDF6EC; color: #1E3A8A; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); overflow: hidden;">
    <div style="background-color: #1E3A8A; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: white;">Team Invitation</h1>
      <p style="color: #e0e7ff; margin-top: 8px;">${invitedBy} has invited you to join <strong>${teamName}</strong></p>
    </div>
    <div style="padding: 30px;">
      <p>Click the button below to accept the invitation and join the team:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${inviteURL}" style="background-color: #1E3A8A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Join ${teamName}</a>
      </div>
      <p><strong>Note:</strong> This link will expire in <strong>24 hours</strong>.</p>
      <p>If you were not expecting this, you can safely ignore this email.</p>
      <p>Warm regards,<br>The Co-Lab Team</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #9CA3AF; padding: 20px;">
      <p>This is an automated message. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;

export const TEAM_JOIN_CONFIRMATION_TEMPLATE = (teamName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to ${teamName} | Co-Lab</title>
</head>
<body style="font-family: 'Inter', sans-serif; background-color: #FDF6EC; color: #1E3A8A; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); overflow: hidden;">
    <div style="background-color: #1E3A8A; padding: 24px; text-align: center;">
      <h1 style="margin: 0; color: white;">You're In!</h1>
      <p style="color: #e0e7ff; margin-top: 8px;">Welcome to <strong>${teamName}</strong></p>
    </div>
    <div style="padding: 30px;">
      <p>You've successfully joined the team <strong>${teamName}</strong> on Co-Lab!</p>
      <p>Start collaborating and building amazing things together.</p>
      <p>Warm regards,<br>The Co-Lab Team</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #9CA3AF; padding: 20px;">
      <p>This is an automated message. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;
