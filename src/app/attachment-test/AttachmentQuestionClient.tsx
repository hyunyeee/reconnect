"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAttachmentQuestions, useAttachmentSubmit } from "@/hooks/query/useAttachment";
import { ProgressBar } from "@/components/ProgressBar";
import { BackHeader } from "@/components/layout/BackHeader";

type AnswerMap = Record<number, number>;

const SCORE_LABELS = ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"];

export default function AttachmentQuestionClient() {
  const { data, isLoading, isError } = useAttachmentQuestions();
  const { mutate: submit, isPending } = useAttachmentSubmit();

  const [answers, setAnswers] = useState<AnswerMap>({});
  const answeredCount = Object.keys(answers).length;

  if (isLoading) return <p className="text-center">질문 불러오는 중...</p>;
  if (isError || !data) return <p className="text-center">문제가 발생했습니다.</p>;

  const questions = data.data;

  const onSelect = (questionId: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  const allAnswered = questions.length === Object.keys(answers).length;

  const onSubmit = () => {
    submit({
      answers: Object.entries(answers).map(([questionId, score]) => ({
        questionId: Number(questionId),
        score,
      })),
    });
  };

  return (
    <div className="mx-auto max-w-md space-y-10 px-4 py-8">
      <BackHeader backHref="/" />

      <h1 className="text-center text-2xl font-bold">애착 유형 검사</h1>

      <ProgressBar current={answeredCount} total={questions.length} />

      {questions.map((q, idx) => {
        const selected = answers[q.id];

        return (
          <div key={q.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="mb-4 text-sm font-medium text-gray-800">
              {idx + 1}. {q.content}
            </p>

            <div className="grid grid-cols-5 gap-2">
              {SCORE_LABELS.map((label, i) => {
                const score = i + 1;
                const active = selected === score;

                return (
                  <button
                    key={score}
                    type="button"
                    onClick={() => onSelect(q.id, score)}
                    className={[
                      "flex flex-col items-center justify-center rounded-lg border py-2 text-xs transition",
                      active
                        ? "border-main-pink bg-main-pink/10 text-main-pink"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <span className="text-sm font-semibold">{score}</span>
                    <span className="mt-1">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="pt-4">
        <Button
          disabled={!allAnswered || isPending}
          onClick={onSubmit}
          className="bg-main-pink w-full py-3 text-white hover:bg-[#A41847]"
        >
          {isPending ? "결과 분석 중..." : allAnswered ? "결과 확인하기" : "모든 문항에 답해주세요"}
        </Button>
      </div>
    </div>
  );
}
