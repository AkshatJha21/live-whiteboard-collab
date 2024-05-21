import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_pW0vVZcCk5xz15nSrtiY2Ia7Ya_bDCp8T98B-kGCXW_sigOigdsqWA6Ygs4s-JBV",
});

export async function POST(request: Request) {
    const authorization = await auth();
    const user = await currentUser();

    if(!authorization || !user) {
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();
    const lab = await convex.query(api.lab.get, { id: room });

    if(lab?.orgId !== authorization.orgId) {
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName || "Guest",
        picture: user.imageUrl!
    };

    const session = liveblocks.prepareSession(
        user.id,
        { userInfo: userInfo }
    );

    if(room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new Response(body, { status });
}