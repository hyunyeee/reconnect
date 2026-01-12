"use client";

import { useOverlay } from "@/hooks/useOverlay";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionModal({ onEdit, onDelete }: Props) {
  const { closeOverlay } = useOverlay();

  const handleEdit = () => {
    closeOverlay();
    onEdit?.();
  };

  const handleDelete = () => {
    closeOverlay();
    onDelete?.();
  };

  return (
    <div className="flex w-full flex-col space-y-3">
      {/* 수정 */}
      <button
        onClick={handleEdit}
        className="h-11 w-full rounded-md text-sm text-gray-900 hover:bg-gray-200"
      >
        수정
      </button>

      {/* 삭제 */}
      <button
        onClick={handleDelete}
        className="h-11 w-full rounded-md text-sm text-red-500 hover:bg-gray-200"
      >
        삭제
      </button>

      {/* 취소 */}
      <button
        onClick={closeOverlay}
        className="h-11 w-full rounded-md text-sm text-gray-500 hover:bg-gray-100"
      >
        취소
      </button>
    </div>
  );
}
