import sortBy from "lodash.sortby";

import { listWords } from "@/lib/array";
import { coalesceProperties } from "@/lib/object";
import { caseInsensitiveEqual } from "@/lib/string";

export interface Household {
  [index: string]: any;
  Community: string;
  Name: string;
  Head: string;
  "Physical Address"?: string;
  "Physical City"?: string;
  "Physical State"?: string;
  "Physical Zip"?: string;
  "Mailing Address"?: string;
  "Mailing City"?: string;
  "Mailing State"?: string;
  "Mailing Zip"?: string;
  "Primary Phone Number"?: string;
  "Primary Phone Type"?: string;
  People: Person[];
}

export interface Person {
  [index: string]: any;
  Community: string;
  "Last Name": string;
  "First Name": string;
  "Head of Household": string;
  Status?: string;
  Sequence: string;
  "Physical Address"?: string;
  "Physical City"?: string;
  "Physical State"?: string;
  "Physical Zip"?: string;
  "Mailing Address"?: string;
  "Mailing City"?: string;
  "Mailing State"?: string;
  "Mailing Zip"?: string;
  "Email Address"?: string;
  "Work Phone Number"?: string;
  "Home Phone Number"?: string;
  "Mobile Phone Number"?: string;
  Position?: string;
  Birthday?: string;
  Anniversary?: string;
  Notes?: string;
}

export interface Official extends Person {
  Position: string;
}

export enum AddressType {
  Physical = "Physical",
  Mailing = "Mailing",
}

export const GroupPeopleIntoHouseholds = (
  people: Person[] | undefined
): Household[] => {
  if (!people || !people.length) {
    return [];
  }

  const households: Household[] = [];
  people.forEach((person) => {
    // household match criteria:
    // 1.) household's Head matches person's Head of Household
    // 2a.) household's Physical Address is set and matches person's Physical Address
    // 2b.) household's Name is set and matches person's Last Name
    let householdIdx = households.findIndex(
      (h) =>
        h["Head"] !== null &&
        h["Head"] === person["Head of Household"] &&
        ((h["Physical Address"] !== null &&
          h["Physical Address"] === person["Physical Address"]) ||
          (h["Name"] !== null && h["Name"] === person["Last Name"]))
    );

    let household: Household;
    if (householdIdx !== -1) {
      const spliced = households.splice(householdIdx, 1);
      household = spliced[0];
    } else {
      // TODO: this basically just takes the first person's phone info for the household, which isn't what we want...
      // instead, it should see if multiple people have the same number and use that instead
      const { name: phoneType, value: phoneNumber } = coalesceProperties(
        person,
        ["Home Phone Number", "Mobile Phone Number", "Work Phone Number"]
      );

      household = {
        Community: person["Community"],
        Name: person["Last Name"],
        Head: person["Head of Household"] || person["First Name"],
        "Physical Address": person["Physical Address"],
        "Physical City": person["Physical City"],
        "Physical State": person["Physical State"],
        "Physical Zip": person["Physical Zip"],
        "Mailing Address": person["Mailing Address"],
        "Mailing City": person["Mailing City"],
        "Mailing State": person["Mailing State"],
        "Mailing Zip": person["Mailing Zip"],
        "Primary Phone Number": phoneNumber,
        "Primary Phone Type": phoneType,
        People: [],
      };
    }

    household["People"].push(person);

    households.push(household);
  });

  // sort the people of each household by their defined sequence
  households.map(
    (household) =>
      (household["People"] = sortBy(household["People"], ["Sequence"]))
  );

  // sort the households alphabetically by household Name and then by household Head's Name
  return sortBy(households, ["Name", "Head"]);
};

export const CombinePeopleFirstNames = (
  people: Person[],
  householdName: string = "",
  emphasize: string = "",
  emphasis = "*"
): string => {
  let names = [];

  names = people.map((person) => {
    let name = person["First Name"];

    // include their last name if it is different than the household's name
    if (
      householdName !== "" &&
      person["Last Name"] &&
      !caseInsensitiveEqual(person["Last Name"], householdName)
    ) {
      name += " " + person["Last Name"];
    }

    // append the emphasis indicator when the person meets the emphasis criteria
    if (
      emphasize !== "" &&
      Object.keys(person).includes(emphasize) &&
      person[emphasize] !== undefined &&
      person[emphasize] !== null &&
      person[emphasize].length > 0
    ) {
      name += emphasis;
    }

    return name;
  });

  return listWords(names);
};

export const HouseholdHasAddress = (
  household: Household,
  type: AddressType
): boolean => {
  return [
    `${type} Address`,
    `${type} City`,
    `${type} State`,
    `${type} Zip`,
  ].every((property) => !!household[property]);
};

export const GetHouseholdAddressStrings = (
  household: Household,
  type: AddressType
): string[] => {
  const valid = HouseholdHasAddress(household, type);

  if (!valid) {
    return [];
  }

  return [
    `${household[`${type} Address`]}`,
    `${household[`${type} City`]}, ${household[`${type} State`]} ${
      household[`${type} Zip`]
    }`,
  ];
};

export const GetHouseholdAddressString = (
  household: Household,
  type: AddressType,
  separator: string | undefined = ", "
): string => {
  return GetHouseholdAddressStrings(household, type).join(separator);
};

export const GetChurchOfficials = (people: Person[], sort = true): Person[] => {
  const officials = people.filter(
    (person) =>
      person["Position"] !== undefined &&
      person["Position"] !== null &&
      person["Position"].length > 0 &&
      person["Position"] !== "Pastor"
  ) as Official[];

  if (sort) {
    officials.sort((a, b) => a["Position"].localeCompare(b["Position"]));
  }

  return officials;
};
