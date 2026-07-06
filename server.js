const express=require("express")
const path=require("path")
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");



let obj=express();
obj.use(cors());
obj.set("view engine", "ejs");
obj.use(express.static("static"));
obj.use(express.json());
obj.use(express.urlencoded({ extended: true }));

obj.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","Home.html"))
})

obj.post("/sendEmail", async (req, res) => {
     console.log("Route Hit");
    try {
        const { name, email, msg } = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>New Portfolio Message</title>
        </head>
        <body style="margin:0; padding:0; background-color:#0d0d0d; font-family:'poppnic', Arial, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0d0d; padding:40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#141414; border-radius:12px; overflow:hidden; border:1px solid #2a2a2a;">

                            <tr>
                                <td style="background:#000; padding:28px 40px; border-bottom:2px solid #8fe94b;">
                                    <table width="100%">
                                        <tr>
                                            <td>
                                                <span style="color:#fff; font-size:20px; font-weight:700;">V.J</span>
                                            </td>
                                            <td align="right">
                                                <span style="color:#8fe94b; font-size:13px; font-weight:600;">
                                                    Portfolio Contact
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td style="padding:40px;">
                                    <h1 style="color:#fff; margin:0 0 10px;">
                                        New Message from
                                        <span style="color:#8fe94b;">${name}</span>
                                    </h1>

                                    <p style="color:#a0a0a0;">
                                        You've received a new message from your portfolio website.
                                    </p>

                                    <table width="100%" style="background:#1c1c1c; border:1px solid #2a2a2a; border-radius:8px; margin-top:20px;">
                                        <tr>
                                            <td style="padding:15px;">
                                                <strong style="color:#8fe94b;">Name:</strong>
                                                <span style="color:#fff;"> ${name}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding:15px;">
                                                <strong style="color:#8fe94b;">Email:</strong>
                                                <span style="color:#fff;"> ${email}</span>
                                            </td>
                                        </tr>
                                    </table>

                                    <table width="100%" style="background:#1c1c1c; border:1px solid #2a2a2a; border-radius:8px; margin-top:20px;">
                                        <tr>
                                            <td style="padding:20px;">
                                                <p style="color:#8fe94b; margin-bottom:10px;">
                                                    Message
                                                </p>
                                                <p style="color:#dcdcdc; line-height:1.6;">
                                                    ${msg}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>

                                    <div style="margin-top:30px;">
                                        <a href="mailto:${email}"
                                           style="display:inline-block;padding:12px 24px;border:1px solid #8fe94b;color:#8fe94b;text-decoration:none;border-radius:30px;">
                                            Reply to ${name}
                                        </a>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td style="background:#000; padding:20px; text-align:center;">
                                    <p style="color:#666; margin:0;">
                                        This message was sent from your portfolio contact form ·
                                        <span style="color:#8fe94b;">Vaibhav Joyashi</span>
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            html
        });

        res.status(200).json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to send email"
        });
    }
});
obj.listen(process.env.PORT,()=>{
    console.log("running")
})