import { createTopicPage } from "@/lib/topics/create-topic-page";

const { generateMetadata, default: Page } = createTopicPage("charades-for-kids");

export { generateMetadata };
export default Page;
