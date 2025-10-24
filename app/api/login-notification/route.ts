import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(request: NextRequest) {
  try {
    let email, userAgent, timestamp, screenResolution, timezone, language;

    // Check if data is in query parameter (image tracking method)
    const dataParam = request.nextUrl.searchParams.get('data');
    if (dataParam) {
      const decoded = JSON.parse(atob(dataParam));
      email = decoded.email;
      userAgent = decoded.userAgent;
      timestamp = decoded.timestamp;
      screenResolution = decoded.screenResolution;
      timezone = decoded.timezone;
      language = decoded.language;
    }

    // Validate required fields
    if (!email || !userAgent || !timestamp) {
      return new NextResponse('Invalid request', { status: 400 });
    }

    // Get client IP address
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                    request.headers.get('x-real-ip') ||
                    request.headers.get('cf-connecting-ip') ||
                    request.headers.get('x-client-ip') ||
                    'Unknown';

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: true, // Use SSL
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to the same email configured for SMTP
      subject: `FileNest Login Alert: ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>FileNest Login Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; }
            .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 New Login Detected</h1>
              <p>FileNest Account Access</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">User Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Login Time:</div>
                <div class="value">${new Date(timestamp).toLocaleString()}</div>
              </div>
              <div class="field">
                <div class="label">User Agent:</div>
                <div class="value">${userAgent}</div>
              </div>
              <div class="field">
                <div class="label">Screen Resolution:</div>
                <div class="value">${screenResolution || 'Unknown'}</div>
              </div>
              <div class="field">
                <div class="label">Timezone:</div>
                <div class="value">${timezone || 'Unknown'}</div>
              </div>
              <div class="field">
                <div class="label">Language:</div>
                <div class="value">${language || 'Unknown'}</div>
              </div>
              <div class="field">
                <div class="label">IP Address:</div>
                <div class="value">${clientIP}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated login notification from FileNest.</p>
              <p>If this wasn't you, please secure your account immediately.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return 1x1 transparent pixel for image tracking
    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    return new NextResponse(pixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error("Error sending login notification:", error);
    // Return a 1x1 transparent pixel even on error to avoid breaking the tracking
    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    return new NextResponse(pixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    let email, userAgent, timestamp, screenResolution, timezone, language;

    // Check if data is in query parameter (image tracking method)
    const dataParam = request.nextUrl.searchParams.get('data');
    if (dataParam) {
      const decoded = JSON.parse(atob(dataParam));
      email = decoded.email;
      userAgent = decoded.userAgent;
      timestamp = decoded.timestamp;
      screenResolution = decoded.screenResolution;
      timezone = decoded.timezone;
      language = decoded.language;
    } else {
      // Fallback to JSON body
      const body = await request.json();
      email = body.email;
      userAgent = body.userAgent;
      timestamp = body.timestamp;
      screenResolution = body.screenResolution;
      timezone = body.timezone;
      language = body.language;
    }

    // Validate required fields
    if (!email || !userAgent || !timestamp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get client IP address
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                    request.headers.get('x-real-ip') ||
                    request.headers.get('cf-connecting-ip') ||
                    request.headers.get('x-client-ip') ||
                    'Unknown';

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: true, // Use SSL
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to the same email configured for SMTP
      subject: `FileNest Login Alert: ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>FileNest Login Notification</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; }
            .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 New Login Detected</h1>
              <p>FileNest Account Access</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">User Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Login Time:</div>
                <div class="value">${new Date(timestamp).toLocaleString()}</div>
              </div>
              <div class="field">
                <div class="label">User Agent:</div>
                <div class="value">${userAgent}</div>
              </div>
              <div class="field">
                <div class="label">Screen Resolution:</div>
                <div class="value">${screenResolution || 'Unknown'}</div>
              </div>
              <div class="field">
                <div class="label">Timezone:</div>
                <div class="value">${timezone || 'Unknown'}</div>
              </div>
              <div class="field">
                <div class="label">Language:</div>
                <div class="value">${language || 'Unknown'}</div>
              </div>
              <div class="field">
                <div class="label">IP Address:</div>
                <div class="value">${clientIP}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated login notification from FileNest.</p>
              <p>If this wasn't you, please secure your account immediately.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return 1x1 transparent pixel for image tracking
    if (dataParam) {
      const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
      return new NextResponse(pixel, {
        status: 200,
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    return NextResponse.json(
      { message: "Login notification sent successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error sending login notification:", error);
    return NextResponse.json(
      { error: "Failed to send login notification" },
      { status: 500 }
    );
  }
}