import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get("x-sanity-webhook-secret");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: "Invalid webhook secret" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { _type, slug } = body;

    // Revalidate based on document type
    switch (_type) {
      case "project":
        revalidatePath("/work");
        revalidatePath("/");
        if (slug?.current) {
          revalidatePath(`/work/${slug.current}`);
        }
        break;
      case "siteSettings":
      case "aboutSection":
      case "processSection":
      case "contactSection":
        revalidatePath("/");
        break;
      default:
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
