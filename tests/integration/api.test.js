import { api } from "@serverless/cloud";

test("should return courses", async () => {
  const { body } = await api.get("/courses").invoke();

  expect(body).toHaveProperty("courses");
  expect(body.users.length).toBeGreaterThan(0);
});
