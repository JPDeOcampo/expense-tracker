import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (email: string, resetCode: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
       <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; margin-bottom: 20px; }
          .header h2 { color: #003366; }
          .content { font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
          .otp-code { font-size: 24px; font-weight: bold; color: #003366; background-color: #f0f0f0; padding: 10px; border-radius: 5px; text-align: center; width: 100%; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; font-size: 14px; color: #888; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Password Reset Request for Expense Tracker</h2>
          </div>
          <div class="content">
            <p>Hi,</p>
            <p>You requested a password reset for your account. Please use the one-time code below to reset your password:</p>
            <div class="otp-code">${resetCode}</div>
            <p>This code will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `,
  });
}
