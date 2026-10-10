Deno.test("Check PR demo file", async () => {
  const content = await Deno.readTextFile("pr-demo.md");

  if (!content.includes("Pull Request")) {
    throw new Error("PR demo content not found");
  }
});