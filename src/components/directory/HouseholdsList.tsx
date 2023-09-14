import { type Dispatch, type SetStateAction } from "react";

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

import { type Household } from "@/lib/directory";

import { Container } from "@/components/Layout";
import HouseholdListing from "@/components/directory/HouseholdListing";

export function FilterableHouseholdsList({
  households,
  query,
  community,
}: {
  households: Household[];
  query: string;
  community: string;
}) {
  if (["Lakeside", "Mountain"].includes(community)) {
    households = households.filter(
      (household) => household.Community === community,
    );
  }

  if (query.trim().length > 0) {
    // check first or last name against any person of household
    // if multiple terms (separated by a space), then every term must have a partial match
    households = households.filter((household) =>
      query
        .split(" ")
        .every((searchString) =>
          household.People.some(
            (person) =>
              person["First Name"]
                .toLowerCase()
                .includes(searchString.toLowerCase()) ||
              person["Last Name"]
                .toLowerCase()
                .includes(searchString.toLowerCase()),
          ),
        ),
    );
  }

  return <FilteredHouseholdsList households={households} />;
}

export function FilteredHouseholdsList({
  households,
}: {
  households: Household[];
}) {
  if (households.length < 1) {
    return (
      <Container className="mt-2 flex-grow items-start sm:mt-4">
        <div className="w-auto grow rounded-md border border-orange-400 bg-orange-100 py-2 px-4">
          <div className="flex justify-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-7 w-7 text-orange-600 sm:h-8 sm:w-8"
                aria-hidden="true"
              />
            </div>
            <div className="ml-1 sm:ml-3">
              <p className="text-orange-700 sm:text-lg">
                No households match search criteria
              </p>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  const groups = Array.from(
    new Set(households.map((household: Household) => household.Name[0])),
  );

  return (
    <div className="border-b border-gray-200">
      {groups.map((letter) => {
        let groupHouseholds = households.filter((household) =>
          household.Name.startsWith(letter),
        );
        return (
          <div className="relative" key={letter}>
            <div className="sticky top-32 z-10 border-y border-gray-200 bg-gray-50 py-1 text-gray-500">
              <Container className="flex-row items-center space-x-1">
                <span className="font-semibold">{letter}</span>
                <span className="text-sm">
                  ({groupHouseholds.length}{" "}
                  {groupHouseholds.length === 1 ? "Household" : "Households"})
                </span>
              </Container>
            </div>
            <ul
              role="list"
              className="relative z-0 w-full divide-y divide-gray-200"
            >
              {groupHouseholds.map((household) => (
                <li
                  key={`${household.Name}-${household.Head}`}
                  className="group relative z-0 w-full focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500 hover:bg-gray-50"
                >
                  <HouseholdListing household={household} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
