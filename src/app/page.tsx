import Image from "next/image";
import PlayerCard from "@/components/PlayerCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Welcome to Dplus Fania</h1>
      <PlayerCard
        player={{
          name: "showmaker",
          position: "Forward",
          image: "/images/messi.jpg",
        }}
      />
    </main>
  );
}
