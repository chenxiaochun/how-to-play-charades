import { createTopicPage } from "@/lib/topics/create-topic-page";

const { generateMetadata, default: Page } = createTopicPage("team-building-charades");

export { generateMetadata };
export default Page;
