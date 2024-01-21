
import Spaces from "@ably/spaces";
import { SpaceProvider, SpacesProvider } from "@ably/spaces/react";
import AvatarStack from "../../components/AvatarStack";
import { getSpaceNameFromUrl } from "../../utils/helpers";
const spaceName = "";

export default function Home({ spaces }: { spaces: Spaces }) {
	return (  <SpacesProvider client={spaces}>
		<SpaceProvider name={"test"}>
		 
		<main className="">
			<h1 className="font-bold text-4xl">GPT4 Vision Chatbot </h1>
			<AvatarStack />
		
		</main>
    </SpaceProvider>
  </SpacesProvider>
	);
}
