import clsx from "clsx";

import Header from "./Header";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-full flex-grow flex-col">
      <div className="flex min-h-full flex-grow flex-col lg:min-w-0 lg:flex-1">
        <div className="sticky top-0 z-30">
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
}

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx("mx-auto flex w-full max-w-7xl px-2 sm:px-4", className)}
    >
      {children}
    </div>
  );
}

export const DescriptionListButtonClasses =
  "flex items-center justify-center rounded-md border border-transparent p-2 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500";

export function DescriptionListTerm({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <dt className="text-sm font-normal uppercase tracking-wide text-cyan-900">
      {children}
    </dt>
  );
}

export function DescriptionListDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <dd className="text-lg font-semibold text-gray-800">{children}</dd>;
}

export function DescriptionListLongText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <dd className="text-lg font-medium italic text-gray-600">{children}</dd>
  );
}

export function ListData({ label, value }: { label?: string; value?: string }) {
  if ((label ?? "").length === 0 || (value ?? "").length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-1 md:space-y-0">
      <DescriptionListTerm>{label}</DescriptionListTerm>
      <DescriptionListDescription>{value}</DescriptionListDescription>
    </div>
  );
}

export function ListDataLongText({
  label,
  value,
}: {
  label?: string;
  value?: string;
}) {
  if ((label ?? "").length === 0 || (value ?? "").length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-1 md:space-y-0">
      <DescriptionListTerm>{label}</DescriptionListTerm>
      <DescriptionListLongText>{value}</DescriptionListLongText>
    </div>
  );
}
