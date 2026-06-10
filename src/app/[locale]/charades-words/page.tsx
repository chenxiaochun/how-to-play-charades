import { createTopicPage } from "@/lib/topics/create-topic-page";

const { generateMetadata, default: Page } = createTopicPage("charades-words");

export { generateMetadata };
export default Page;
