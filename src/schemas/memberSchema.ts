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

    phoneNumber: z.string().regex(/^010\d{8}$/, { message: e.phoneNumber.invalid }),

    // 인증 상태는 필수 아님 → optional boolean
    isPhoneVerified: z.boolean().optional(),

    gender: z.enum(["MALE", "FEMALE"], { message: e.gender.required }),

    mbti: z.enum(MBTI_LIST as [string, ...string[]], {
      message: e.mbti.required,
    }),

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

    birthYear: z.string().regex(/^\d{4}$/, { message: "생년은 4자리 숫자여야 합니다" }),
    birthMonth: z.string().regex(/^(0?[1-9]|1[0-2])$/, { message: "생월은 1~12 사이여야 합니다" }),
    birthDay: z
      .string()
      .regex(/^(0?[1-9]|[12]\d|3[01])$/, { message: "생일은 1~31 사이여야 합니다" }),

    birthDate: z.string().min(1, { message: e.birth.required }),

    privacyAgree: z.literal(true, { message: e.agreement.required }),
    useAgree: z.literal(true, { message: e.agreement.required }),

    emailAgree: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: e.passwordConfirm.notMatch,
  });

export type MemberSignUpPayload = Omit<
  z.infer<typeof memberSchema>,
  "passwordConfirm" | "birthDate"
> & {
  tiktokId: string | null;
};

/* ===== 로그인 스키마 ===== */
export const loginSchema = z.object({
  email: z.string().email({ message: e.email.invalid }),
  password: z.string().min(1, { message: e.password.required }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/* ===== 프로필 수정 스키마 ===== */
export const memberProfileUpdateSchema = z.object({
  nickname: z.string().min(2, { message: e.nickname.min }),

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

  mbti: z.enum(MBTI_LIST as [string, ...string[]]).optional(),

  emailAgree: z.boolean().optional(),
});

export type MemberProfileUpdateForm = z.infer<typeof memberProfileUpdateSchema>;
