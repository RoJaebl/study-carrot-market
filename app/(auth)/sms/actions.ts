"use server";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  );
const tokenSchema = z.coerce.number().min(100000).max(999999);

export interface ActionState {
  token: boolean;
}

export async function smsLogIn(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    console.log(result.error?.flatten());
    return {
      token: result.success,
      ...(!result.success && { error: result.error.flatten() }),
    };
  } else {
    const result = tokenSchema.safeParse(token);
    return !result.success
      ? { token: true, error: result.error.flatten() }
      : redirect("/");
  }
}
