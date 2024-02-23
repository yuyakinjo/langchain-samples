import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { chatModel } from "./1_openai";
import { splitDocs } from "./3_search-chain";

const embeddings = new OpenAIEmbeddings();

export const vectorstore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

const prompt =
  ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}`);

export const documentChain = await createStuffDocumentsChain({
  llm: chatModel,
  prompt,
});

// const whatIsLangSmith = await documentChain.invoke({
//   input: "what is LangSmith?",
//   context: [
//     new Document({
//       pageContent:
//         "LangSmith is a platform for building production-grade LLM applications.",
//     }),
//   ],
// });

// console.log("🚀 ~ whatIsLangSmith:", whatIsLangSmith);
