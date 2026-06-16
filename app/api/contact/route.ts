import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields before sending." },
        { status: 400 }
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json(
        { error: "Contact form is not configured yet." },
        { status: 500 }
      );
    }

    // Call Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        subject: `[AI Regex Studio Contact] ${subject}`,
        message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      }),
    });

    const result = await response.json();

    // Log for debugging in Vercel logs
    console.log("Web3Forms status:", response.status);
    console.log("Web3Forms result:", JSON.stringify(result));

    if (result.success === true) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      {
        error:
          result.message ||
          "Failed to send. Please email directly at faisalagentai@gmail.com",
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Network error. Please email directly at faisalagentai@gmail.com" },
      { status: 500 }
    );
  }
}