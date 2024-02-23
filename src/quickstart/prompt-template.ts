import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { chatModel } from "@quickstart/openai";

const outputParser = new StringOutputParser();

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a world class technical documentation writer."],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel).pipe(outputParser);

// const whatIsLangSmith = await chain.invoke({
//   input: "what is LangSmith?",
// });

// console.log("🚀 ~ whatIsLangSmith:", whatIsLangSmith);
