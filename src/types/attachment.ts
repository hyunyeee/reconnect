export type AttachmentQuestion = {
  id: number;
  content: string;
  type: "ANXIOUS" | "AVOIDANT";
};

export type AttachmentAnswer = {
  questionId: number;
  score: number; // 1 ~ 5
};

export interface AttachmentResult {
  resultType: string;
  anxiousScore: number;
  avoidantScore: number;
  resultDescription: string;
}
