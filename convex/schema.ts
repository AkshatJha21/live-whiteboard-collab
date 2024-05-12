import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    labs: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string()
    })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["orgId"]
    }),
    userFavourites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        labId: v.id("labs")
    })
    .index("by_lab", ["labId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_lab", ["userId", "labId"])
    .index("by_user_lab_org", ["userId", "labId", "orgId"])
});