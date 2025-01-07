import { Suspense } from "react";
import { Results, ResultsSkelton } from "./_components/result";

export default function Home() {
  return (
    <header className="h-full p-8 max-w-screen-2xl mx-auto ">
      <Suspense fallback={<ResultsSkelton/>}>
      <Results/>
      </Suspense>
    </header>
  );
}
