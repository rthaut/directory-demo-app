import { Person } from "@/lib/directory";
import { UserPlusIcon, DocumentArrowDownIcon } from "@heroicons/react/20/solid";

export default function DownloadPersonVCardButton({
  person,
}: {
  person: Person;
}) {
  const requiredProps = [
    "Home Phone Number",
    "Mobile Phone Number",
    "Work Phone Number",
    "Email Address",
  ];

  if (
    requiredProps.every(
      (prop) =>
        person[prop] === undefined ||
        person[prop] === null ||
        person[prop].length === 0,
    )
  ) {
    return null;
  }

  const downloadVCard = () => {
    alert("Not in the demo, sorry :-(");
  };

  return (
    <button
      className="group inline-flex justify-center gap-x-1.5 rounded-md bg-white py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={() => downloadVCard()}
    >
      <UserPlusIcon
        className="-ml-0.5 h-5 w-5 text-gray-400 group-hover:text-cyan-700 md:hidden"
        aria-hidden="true"
      />
      <DocumentArrowDownIcon
        className="-ml-0.5 hidden h-5 w-5 text-gray-400 group-hover:text-cyan-700 md:inline"
        aria-hidden="true"
      />
      <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">
        <span className="md:hidden">Save to Contacts</span>
        <span className="hidden md:inline">Download VCard</span>
      </span>
    </button>
  );
}
