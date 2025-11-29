import { z } from "zod";
import { errorMessages as e } from "@/constants/errorMessages";
import { MBTI_LIST } from "@/constants/mbtiList";

export const loginSchema = z.object({
  email: z.email({ message: e.email.invalid }),
  password: z.string().min(10, { message: e.password.min }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const memberSchema = loginSchema.extend({
  name: z.string().min(2, { message: e.name.min }),
  nickname: z.string().min(2, { message: e.nickname.min }),

  phoneNumber: z.string().regex(/^010\d{8}$/, { message: e.phoneNumber.invalid }),

  gender: z.enum(["MALE", "FEMALE"], { message: e.gender.required }),

  mbti: z.enum(MBTI_LIST, { message: e.mbti.required }),

  instagramId: z
    .string()
    .min(1, { message: e.instagramId.required })
    .regex(/^\S+$/, { message: e.instagramId.noSpace })
    .regex(/^[a-zA-Z0-9._]{1,30}$/, { message: e.instagramId.invalid })
    .refine(
      (v) => !v.startsWith(".") && !v.startsWith("_") && !v.endsWith(".") && !v.endsWith("_"),
      { message: e.instagramId.edgeDotUnderscore },
    ),

  birthYear: z
    .string()
    .nonempty({ message: e.birth.yearRequired })
    .regex(/^\d{4}$/, { message: e.birth.yearFormat }),

  birthDay: z
    .string()
    .nonempty({ message: e.birth.dayRequired })
    .regex(/^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/, { message: e.birth.dayFormat }),

  privacyAgree: z.boolean().refine((v) => v === true, { message: e.agreement.required }),
  useAgree: z.boolean().refine((v) => v === true, { message: e.agreement.required }),
  emailAgree: z.boolean().optional(),
});

export type MemberFormData = z.infer<typeof memberSchema>;
