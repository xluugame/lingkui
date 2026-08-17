import { createRouter, publicQuery } from "./middleware";
import { bingoRouter } from "./bingoRouter";
import { playerRouter } from "./playerRouter";
import { adminRouter } from "./adminRouter";
import { contentRouter } from "./contentRouter";
import { funRouter } from "./funRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  bingo: bingoRouter,
  player: playerRouter,
  admin: adminRouter,
  content: contentRouter,
  fun: funRouter,
});

export type AppRouter = typeof appRouter;
