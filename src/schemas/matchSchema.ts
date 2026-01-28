import { z } from "zod";

const baseSchema = {
  targetName: z.string().min(1, "이름을 입력해주세요."),
  targetPhone: z.string().regex(/^010\d{8}$/, "올바른 전화번호 형식을 입력해주세요."),
  requesterDesire: z.number().min(0).max(100, "0~100 사이로 선택해주세요."),
};

const instaSchema = z.object({
  channel: z.literal("insta"),
  ...baseSchema,
  targetInsta: z
    .string()
    .min(1, "인스타그램 ID를 입력해주세요.")
    .refine((v) => /^[a-zA-Z0-9._]{1,30}$/.test(v), "올바른 인스타그램 ID 형식이 아닙니다."),
});

const tiktokSchema = z.object({
  channel: z.literal("tiktok"),
  ...baseSchema,
  targetTiktok: z
    .string()
    .min(1, "틱톡 ID를 입력해주세요.")
    .refine((v) => /^[a-zA-Z0-9._]{1,24}$/.test(v), "올바른 틱톡 ID 형식이 아닙니다."),
});

export const matchSchema = z.discriminatedUnion("channel", [instaSchema, tiktokSchema]);

export type MatchFormData = z.infer<typeof matchSchema>;
