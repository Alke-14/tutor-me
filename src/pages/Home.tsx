import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh] typewriter">
        <h1 className="text-6xl md:text-9xl ">tutor.me</h1>
        <p className="text-2xl md:text-4xl mt-4">
          Your personalized learning assistant!
        </p>
        <Button asChild className="text-xl mt-5 classyBtn">
          <Link to="/onboarding">Get Started</Link>
        </Button>
      </div>
    </>
  );
}

export default Home;
