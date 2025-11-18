import DailyThought from "./components/DailyThought";

export default function Home() {
  return (
    
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center  bg-white dark:bg-black sm:items-start">
      <h1 className = "text-3xl font-bold mb-3 text-[#ff0000]"> Welcome to My Journal App</h1>
      <DailyThought />
    </main>
    
  );
}
