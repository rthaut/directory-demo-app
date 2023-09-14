import { type Household, AddressType } from "@/lib/directory";

import { HouseholdAnniversaryData } from "@/components/directory/AnniversaryData";
import HouseholdAddressData from "@/components/directory/HouseholdAddressData";
import PersonListData from "@/components/directory/PersonListData";
import PhoneData from "@/components/directory/PhoneData";

export default function HouseholdListData({
  household,
  showAnniversaryForHousehold,
}: {
  household: Household;
  showAnniversaryForHousehold: boolean;
}) {
  return (
    <>
      <HouseholdAddressData household={household} type={AddressType.Physical} />
      <HouseholdAddressData household={household} type={AddressType.Mailing} />
      {household["Primary Phone Type"] === "Home Phone Number" && (
        <PhoneData
          type={household["Primary Phone Type"]}
          number={household["Primary Phone Number"]}
        />
      )}
      {showAnniversaryForHousehold && (
        <HouseholdAnniversaryData household={household} />
      )}
      {household.People.length === 1 && (
        <PersonListData
          person={household.People[0]}
          showAnniversary={!showAnniversaryForHousehold}
        />
      )}
    </>
  );
}
