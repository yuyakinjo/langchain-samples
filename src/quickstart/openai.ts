import { ChatOpenAI } from "@langchain/openai";

export const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// const whatIsLangSmith = await chatModel.invoke("LangSmith とは？");
// console.log("🚀 ~ whatIsLangSmith:", whatIsLangSmith.content);
