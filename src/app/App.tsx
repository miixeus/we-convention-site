import { Hero } from "./components/Hero";
import { OurLife } from "./components/OurLife";
import { MessageWall } from "./components/MessageWall";
import { Closing } from "./components/Closing";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <OurLife />
      <MessageWall />
      <Closing />
    </div>
  );
}
