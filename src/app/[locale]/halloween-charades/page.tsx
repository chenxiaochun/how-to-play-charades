import { createTopicPage } from "@/lib/topics/create-topic-page";

const { generateMetadata, default: Page } = createTopicPage("halloween-charades");

export { generateMetadata };
export default Page;
