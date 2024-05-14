import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error('Unauthorized');
        }

        if (args.favourites) {
            const favouriteLabs = await ctx.db.query("userFavourites")
                .withIndex("by_user_org", (q) => 
                    q
                    .eq("userId", identity.subject)
                    .eq("orgId", args.orgId)
                )
                .order("desc")
                .collect();

            const ids = favouriteLabs.map((lab) => lab.labId);

            const labs = await getAllOrThrow(ctx.db, ids);

            return labs.map((lab) => ({
                ...lab,
                isFavourite: true
            }));
        }

        const title = args.search as string;
        let labs = [];

        if (title) {

            labs = await ctx.db.query("labs")
                .withSearchIndex("search_title", (q) => 
                    q.search("title", title)
                    .eq("orgId", args.orgId)
                ).collect();

        } else {

            labs = await ctx.db.query("labs")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect();
        
        }

        const labsWithFavRelations = labs.map((lab) => {
            return ctx.db
                .query("userFavourites")
                .withIndex("by_user_lab", (q) => 
                    q
                    .eq("userId", identity.subject)
                    .eq("labId", lab._id)
                ).unique()
                .then((fav) => {
                    return {
                        ...lab,
                        isFavourite: !!fav,
                    };
                });
        });

        const labsWithFavBoolean = Promise.all(labsWithFavRelations);

        return labsWithFavBoolean;
    },
});