import { Button } from "@/components/ui/button";
import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>tutor.me</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </>
  );
}

export default Home;
