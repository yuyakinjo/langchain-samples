import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitter = new RecursiveCharacterTextSplitter();

const loader = new CheerioWebBaseLoader(
  "https://docs.smith.langchain.com/user_guide"
);

const docs = await loader.load();

// console.log(docs.length);
// console.log(docs[0].pageContent.length);

const splitDocs = await splitter.splitDocuments(docs);

export { splitDocs };

// console.log(splitDocs.length);
// console.log(splitDocs[0].pageContent.length);
// console.log(splitDocs);
