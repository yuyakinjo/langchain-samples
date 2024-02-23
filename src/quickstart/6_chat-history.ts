import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { chatModel } from "./1_openai";
import { vectorstore } from "./4_embeddings";

const retriever = vectorstore.asRetriever();

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
  [
    "user",
    "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
  ],
]);

const historyAwareRetrieverChain = await createHistoryAwareRetriever({
  llm: chatModel,
  retriever,
  rephrasePrompt: historyAwarePrompt,
});

const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "Answer the user's questions based on the below context:\n\n{context}",
  ],
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
]);

// const historyAwareCombineDocsChain = await createStuffDocumentsChain({
//   llm: chatModel,
//   prompt: historyAwareRetrievalPrompt,
// });

// const conversationalRetrievalChain = await createRetrievalChain({
//   retriever: historyAwareRetrieverChain,
//   combineDocsChain: historyAwareCombineDocsChain,
// });

// const result2 = await conversationalRetrievalChain.invoke({
//   chat_history: [
//     new HumanMessage("Can LangSmith help test my LLM applications?"),
//     new AIMessage("Yes!"),
//   ],
//   input: "tell me how",
// });

// console.log(result2.answer);
