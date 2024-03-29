import { Environment } from "@yext/search-headless-react";
import { ChatConfig } from "@yext/chat-headless-react";
export const searchConfig = {
  apiKey: import.meta.env.YEXT_PUBLIC_API_KEY,
  experienceKey: import.meta.env.YEXT_PUBLIC_EXP_KEY,
  locale: "ja",
  environment: Environment.SANDBOX,
};

export const chatConfig: ChatConfig = {
  botId: import.meta.env.YEXT_PUBLIC_CHAT_BOT_ID,
  apiKey: import.meta.env.YEXT_PUBLIC_CHAT_API_KEY,
  env: "SANDBOX",
};
