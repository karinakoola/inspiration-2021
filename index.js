import { api, data } from "@serverless/cloud";

// Create GET route and return courses
api.get("/courses", async (req, res) => {
  const output = await data.get("course:*");
  res.send({
    body: output.items,
  });
});

// Redirect to home endpoint
api.get("/*", (req, res) => {
  res.redirect("/courses");
});

// schedule.every("1 minute", () => {
//   console.log("Beep Boop ~*-*~");
// });