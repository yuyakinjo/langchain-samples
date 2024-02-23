import { vectorstore } from "./4_embeddings";

const retriever = vectorstore.asRetriever();

// const retrievalChain = await createRetrievalChain({
//   combineDocsChain: documentChain,
//   retriever,
// });

// const result = await retrievalChain.invoke({
//   input: "what is LangSmith?",
// });

// console.log(result.answer);
