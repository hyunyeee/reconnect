import { z } from "zod";
import { errorMessages as e } from "@/constants/errorMessages";
import { MBTI_LIST } from "@/constants/mbtiList";

export const memberSchema = z
  .object({
    name: z.string().min(2, { message: e.name.min }),
    nickname: z.string().min(2, { message: e.nickname.min }),

    email: z.string().email({ message: e.email.invalid }),

    password: z.string().min(10, { message: e.password.min }),
    passwordConfirm: z.string().min(1, { message: e.password.required }),

    phoneNumber: z.string().regex(/^010\d{8}$/, {
      message: e.phoneNumber.invalid,
    }),

    gender: z.enum(["MALE", "FEMALE"], { message: e.gender.required }),
    mbti: z.enum(MBTI_LIST, { message: e.mbti.required }),

    instagramId: z
      .string()
      .trim()
      .min(1, { message: e.instagramId.required })
      .regex(/^\S+$/, { message: e.instagramId.noSpace })
      .regex(/^[a-zA-Z0-9._]{1,30}$/, { message: e.instagramId.invalid }),

    tiktokId: z
      .string()
      .trim()
      .nullable()
      .refine((v) => !v || (/^\S+$/.test(v) && /^[a-zA-Z0-9._]{1,30}$/.test(v)), {
        message: e.instagramId.invalid,
      }),

    birthYear: z.string(),
    birthMonth: z.string(),
    birthDay: z.string(),
    birthDate: z.string().min(1, { message: e.birth.required }),

    privacyAgree: z.literal(true, { message: e.agreement.required }),
    useAgree: z.literal(true, { message: e.agreement.required }),

    emailAgree: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: e.passwordConfirm.notMatch,
  });

export type MemberSignUpPayload = Omit<z.infer<typeof memberSchema>, "passwordConfirm"> & {
  tiktokId: string | null;
};

/* ===== 로그인 스키마 ===== */
export const loginSchema = z.object({
  email: z.string().email({ message: e.email.invalid }),
  password: z.string().min(1, { message: e.password.required }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
