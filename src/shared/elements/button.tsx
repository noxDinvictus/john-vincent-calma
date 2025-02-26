import { MouseEventHandler } from 'react';

interface IButton {
  readonly onClick: MouseEventHandler;
  readonly title: string;
}

export default function Button({ onClick, title }: IButton) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      {title}
    </button>
  );
}
