
export const query = async (q: string): Promise<string> => {
  // Define userData variable - the results of the onboarding form
  const storedData = localStorage.getItem("userData");

  try {
    const res = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: q,
        userData: storedData,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error from serverless API:", errorData);
      throw new Error(errorData.error || "Failed to fetch from API");
    }

    const data = await res.json();
    return data.reply ?? "";
  } catch (error) {
    console.error("Error calling /api/query:", error);
    return "Error: Could not get response from AI.";
  }
};

