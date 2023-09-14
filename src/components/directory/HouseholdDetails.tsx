import { type Household, CombinePeopleFirstNames } from "@/lib/directory";

import HouseholdListData from "@/components/directory/HouseholdListData";
import PersonListData from "@/components/directory/PersonListData";
import DownloadPersonVCardButton from "./DownloadPersonVCardButton";

export default function HouseholdDetails({
  household,
}: {
  household?: Household;
}) {
  if (!household) {
    return null;
  }

  // show the anniversary at the household level if:
  // - 2 people are listed with an anniversary (this makes the assumption that it is the same anniversary)
  // - OR if the household only has 1 total person (who has an anniversary)
  // otherwise show the anniversary at the person level if:
  // - the household has multiple people but only 1 person has an anniversary
  const showAnniversaryForHousehold =
    household.People.length > 1 &&
    household.People.filter(
      (person) => (person["Anniversary"] ?? "").length > 0,
    ).length === 2;

  return (
    <>
      <div className="mt-4 px-2 pb-1 sm:px-4 sm:pb-6">
        <div className="flex flex-col items-start justify-start space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h3 className="text-2xl font-bold leading-9 text-gray-900">
              {CombinePeopleFirstNames(household.People)} {household.Name}
            </h3>
            <h4 className="mt-1 text-lg font-semibold text-cyan-700">
              {household.Community} Community
            </h4>
          </div>
          {household.People.length === 1 && (
            <DownloadPersonVCardButton person={household.People[0]} />
          )}
        </div>
      </div>
      <div className="px-2 py-4 sm:px-4 sm:pt-0">
        <dl className="space-y-4">
          <HouseholdListData
            household={household}
            showAnniversaryForHousehold={showAnniversaryForHousehold}
          />
        </dl>
      </div>
      {household.People.length > 1 && (
        <ul className="divide-y divide-gray-300 border-y border-gray-300">
          {household.People.map((person) => (
            <li key={person["First Name"]} className="py-6 px-2 sm:px-4">
              <div className="-mt-2 mb-4 flex flex-col items-start justify-start space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <h3 className="text-xl font-bold leading-9 text-gray-900">
                  {person["First Name"]}
                  {person["Last Name"] !== household.Name &&
                    ` (${person["Last Name"]})`}
                </h3>
                <DownloadPersonVCardButton person={person} />
              </div>
              <dl className="space-y-4">
                <PersonListData
                  person={person}
                  showAnniversary={!showAnniversaryForHousehold}
                />
              </dl>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
