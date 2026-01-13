export interface MemberProfileResponse {
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  instagramId: string;
  mbti: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  emailAgree: boolean;
}

export interface MemberProfileUpdateForm {
  nickname: string;
  instagramId?: string;
  mbti?: string;
  emailAgree: boolean;
}
