import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/blocks/nav";
import Slider from "@/components/blocks/slider";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Slider />
      <div className="flex flex-col items-center justify-center h-screen">
        <Button>heelo</Button>
      </div>
    </main>
  );
}
