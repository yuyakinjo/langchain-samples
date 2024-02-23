import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import type { ChatPromptTemplate } from "langchain/prompts";
import { AIMessage, HumanMessage } from "langchain/schema";
import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorstore } from "./4_embeddings";

const retriever = vectorstore.asRetriever();

const retrieverTool = await createRetrieverTool(retriever, {
  name: "langsmith_search",
  description:
    "Search for information about LangSmith. For any questions about LangSmith, you must use this tool!",
});

const searchTool = new TavilySearchResults();

const tools = [retrieverTool, searchTool];

// Get the prompt to use - you can modify this!
// If you want to see the prompt in full, you can at:
// https://smith.langchain.com/hub/hwchase17/openai-functions-agent
const agentPrompt = await pull<ChatPromptTemplate>(
  "hwchase17/openai-functions-agent"
);

const agentModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0,
});

const agent = await createOpenAIFunctionsAgent({
  llm: agentModel,
  tools,
  prompt: agentPrompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
  verbose: true,
});

// const agentResult = await agentExecutor.invoke({
//   input: "how can LangSmith help with testing?",
// });

// console.log(agentResult.output);

// const agentResult2 = await agentExecutor.invoke({
//   input: "2024年現在の日本の総理大臣は誰ですか？",
// });

// console.log(agentResult2.output);

const agentResult3 = await agentExecutor.invoke({
  chat_history: [
    new HumanMessage("Can LangSmith help test my LLM applications?"),
    new AIMessage("Yes!"),
  ],
  input: "Tell me how",
});

console.log(agentResult3.output);
