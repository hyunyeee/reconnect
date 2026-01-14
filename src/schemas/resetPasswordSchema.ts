import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(10, "휴대폰 번호를 입력해주세요.")
      .regex(/^01[0-9]{8,9}$/, "올바른 휴대폰 번호 형식이 아닙니다."),
    newPassword: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: [],
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
