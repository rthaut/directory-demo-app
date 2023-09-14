import { EnvelopeIcon } from "@heroicons/react/20/solid";
import {
  DescriptionListTerm,
  DescriptionListDescription,
  DescriptionListButtonClasses,
} from "@/components/Layout";

export default function EmailData({ email }: { email?: string }) {
  if ((email ?? "").length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col space-y-1 md:space-y-0">
        <DescriptionListTerm>Email Address</DescriptionListTerm>
        <DescriptionListDescription>{email}</DescriptionListDescription>
      </div>
      <a
        href={`mailto:${email}`}
        className={DescriptionListButtonClasses}
        title={`Email ${email}`}
      >
        <EnvelopeIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
        <span className="sr-only">Email {email}</span>
      </a>
    </div>
  );
}
