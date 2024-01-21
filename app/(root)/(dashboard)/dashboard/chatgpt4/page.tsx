import ChatSection from "./components/chat-section";
import Footer from "./components/footer";

export default function Home() {
	return (
		<main className="">
			<h1 className="font-bold text-4xl">GPT4 Vision Chatbot </h1>
			<ChatSection />
			<Footer />
		</main>
	);
}
