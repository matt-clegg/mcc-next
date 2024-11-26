import type { News } from "~~/server/database/schema/news";

declare module "nitropack" {
  interface NitroRuntimeHooks {
    "news:update": (oldNews: News, newNews: News) => void;
  }
}
