import { createTopicPage } from "@/lib/topics/create-topic-page";

const { generateMetadata, default: Page } = createTopicPage("christmas-charades");

export { generateMetadata };
export default Page;
