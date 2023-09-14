import {
  CombinePeopleFirstNames,
  type Household,
  type Person,
} from "@/lib/directory";
import { formatAnniversary } from "@/lib/dateTime";
import { ListData } from "@/components/Layout";

export function HouseholdAnniversaryData({
  household,
}: {
  household: Household;
}) {
  const spouses = household.People.filter(
    (person) => (person["Anniversary"] ?? "").length > 0
  );

  if (spouses.length !== 2) {
    return null;
  }

  const names =
    spouses.length === 2
      ? CombinePeopleFirstNames(spouses)
      : spouses[0]["First Name"];

  return (
    <AnniversaryData names={names} anniversary={spouses[0]["Anniversary"]} />
  );
}

export function PersonAnniversaryData({ person }: { person: Person }) {
  return (
    <AnniversaryData
      names={person["First Name"]}
      anniversary={person["Anniversary"]}
    />
  );
}

export default function AnniversaryData({
  names = "",
  anniversary = "",
}: {
  names?: string;
  anniversary?: string;
}) {
  if (!(names ?? "").length || !(anniversary ?? "").length) {
    return null;
  }

  return (
    <ListData
      label={names + "'s Anniversary"}
      value={formatAnniversary(anniversary)}
    />
  );
}
