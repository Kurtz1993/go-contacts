import { ReactElement } from "react";

type DetailItemProps = {
  icon: ReactElement;
  text: string;
};

export default function DetailItem({ icon, text }: DetailItemProps) {
  return (
    <div className="text-gray-500 flex items-center mt-3">
      <div className="w-6 mr-2">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
