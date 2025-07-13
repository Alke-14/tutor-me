import { query } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";

function Home() {
  const [response, setResponse] = useState<string | undefined>("");

  const handleClick = async () => {
    try {
      const data = await query("Help me solve 2 + 2");
      setResponse(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>Click</Button>
      {response}

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
