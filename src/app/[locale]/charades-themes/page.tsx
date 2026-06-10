import { createTopicPage } from "@/lib/topics/create-topic-page";

const { generateMetadata, default: Page } = createTopicPage("charades-themes");

export { generateMetadata };
export default Page;
