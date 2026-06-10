import { createTopicPage } from "@/lib/topics/create-topic-page";

const { generateMetadata, default: Page } = createTopicPage("charades-for-adults");

export { generateMetadata };
export default Page;
