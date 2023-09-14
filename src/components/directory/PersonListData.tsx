import { type Person } from "@/lib/directory";
import { ListData, ListDataLongText } from "@/components/Layout";
import EmailData from "@/components/directory/EmailData";
import PhoneData from "@/components/directory/PhoneData";
import { PersonAnniversaryData } from "@/components/directory/AnniversaryData";

export default function PersonListData({
  person,
  showAnniversary,
}: {
  person: Person;
  showAnniversary: boolean;
}) {
  const props = [
    "Mobile Phone Number",
    "Work Phone Number",
    "Email Address",
    "Birthday",
    "Anniversary",
    "Notes",
  ];

  if (
    props.every(
      (prop) =>
        person[prop] === undefined ||
        person[prop] === null ||
        person[prop].length === 0
    )
  ) {
    return (
      <p className="text-sm italic text-gray-500">
        No additional information is available for {person["First Name"]}
      </p>
    );
  }

  return (
    <>
      <PhoneData
        type="Mobile Phone Number"
        number={person["Mobile Phone Number"]}
      />
      <PhoneData
        type="Work Phone Number"
        number={person["Work Phone Number"]}
      />
      <EmailData email={person["Email Address"]} />
      <ListData label="Birthday" value={person["Birthday"]} />
      {showAnniversary && <PersonAnniversaryData person={person} />}
      {(person["Notes"] ?? "").length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <ListDataLongText label="Other Notes" value={person["Notes"]} />
        </div>
      )}
    </>
  );
}
