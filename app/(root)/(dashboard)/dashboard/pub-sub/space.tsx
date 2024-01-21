
import Spaces from "@ably/spaces";
import { SpaceProvider, SpacesProvider } from "@ably/spaces/react";
import AvatarStack from "@/components/AvatarStack";
import ChatSection from "./components/chat-section";

const spaceName = "";

export default function Home({ spaces }: { spaces: Spaces }) {
	return (  <SpacesProvider client={spaces}>
		<SpaceProvider name={"test"}>
		 
		<main className="flex min-h-screen flex-col items-center gap-10 p-24 bg-gradient-to-bl from-slate-300 to-blue-50">
			<h1 className="font-bold text-4xl">GPT4 Vision Chatbot </h1>
			<AvatarStack />
			<ChatSection />

		</main>
    </SpaceProvider>
  </SpacesProvider>
	);
}
