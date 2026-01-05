"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>

      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="bg-main-pink h-2 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
