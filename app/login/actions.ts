"use server";
export async function handleForm(prevState: unknown, formData: FormData) {
  console.log(prevState);
  await new Promise((res) => setTimeout(res, 3000));
  console.log("logged in!");
  return {
    error: ["wrong password", "password too short"],
  };
}
