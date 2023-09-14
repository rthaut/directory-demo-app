import { PhoneArrowUpRightIcon } from "@heroicons/react/20/solid";
import {
  DescriptionListTerm,
  DescriptionListDescription,
  DescriptionListButtonClasses,
} from "@/components/Layout";

export default function PhoneData({
  type,
  number,
}: {
  type?: string;
  number?: string;
}) {
  if ((type ?? "").length === 0 || (number ?? "").length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col space-y-1 md:space-y-0">
        <DescriptionListTerm>{type}</DescriptionListTerm>
        <DescriptionListDescription>{number}</DescriptionListDescription>
      </div>
      <a
        href={`tel:${number?.replaceAll(/\D/g, "")}`}
        className={DescriptionListButtonClasses}
        title={`Call ${number}`}
      >
        <PhoneArrowUpRightIcon
          className="h-6 w-6 flex-shrink-0"
          aria-hidden="true"
        />
        <span className="sr-only">Call ${number}</span>
      </a>
    </div>
  );
}
