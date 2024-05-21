import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg"
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const lab = await ctx.db.insert("labs", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage
        });

        return lab;
    }
});

export const remove = mutation({
    args: { id: v.id("labs") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_lab", (q) => 
                q
                .eq("userId", userId)
                .eq("labId", args.id)
            ).unique();

        if (existingFavourite) {
            await ctx.db.delete(existingFavourite._id);
        }

        await ctx.db.delete(args.id);
    }
});

export const update = mutation({
    args: { id: v.id("labs"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if(!title) {
            throw new Error("Title is required");
        }

        if(title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters")
        }

        const lab = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return lab;
    }
})

export const favourite = mutation({
    args: { id: v.id("labs"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const lab = await ctx.db.get(args.id);

        if (!lab) {
            throw new Error("Lab not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_lab", (q) => 
                q
                .eq("userId", userId)
                .eq("labId", lab._id)
            ).unique();
        
        if (existingFavourite) {
            throw new Error("Lab is already in favourites");
        }

        await ctx.db.insert("userFavourites", {
            userId,
            labId: lab._id,
            orgId: args.orgId
        });

        return lab;
    },
})

export const removeFavourite = mutation({
    args: { id: v.id("labs") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const lab = await ctx.db.get(args.id);

        if (!lab) {
            throw new Error("Lab not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_lab", (q) => 
                q
                .eq("userId", userId)
                .eq("labId", lab._id)
            ).unique();
        
        if (!existingFavourite) {
            throw new Error("Lab not in favourites");
        }

        await ctx.db.delete(existingFavourite._id);

        return lab;
    },
});

export const get = query({
    args: { id: v.id("labs") },
    handler: async (ctx, args) => {
        const lab = await ctx.db.get(args.id);

        return lab;
    }
})