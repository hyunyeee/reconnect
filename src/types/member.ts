export interface MemberProfileResponse {
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  instagramId: string;
  tiktokId: string | null;
  mbti: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  emailAgree: boolean;
}

export interface MemberProfileUpdatePayload {
  nickname: string;
  instagramId: string;
  tiktokId: string | null;
  mbti?: string;
  emailAgree: boolean;
}
