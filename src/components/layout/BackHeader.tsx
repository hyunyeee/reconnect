import { BackButton } from "./BackButton";

interface PageHeaderProps {
  title?: string;
  backHref?: string;
  rightSlot?: React.ReactNode;
}

export function BackHeader({ title, backHref, rightSlot }: PageHeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-2">
        <BackButton href={backHref} />
        {title && <h1 className="text-lg font-medium">{title}</h1>}
      </div>

      {rightSlot}
    </header>
  );
}
