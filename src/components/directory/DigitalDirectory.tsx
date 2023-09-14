import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

import { type Household } from "@/lib/directory";

import { useDirectory } from "@/hooks/useDirectory";

import Loader from "@/components/Loader";
import SlideOver from "@/components/SlideOver";
import HouseholdDetails from "@/components/directory/HouseholdDetails";
import { FilterableHouseholdsList } from "@/components/directory/HouseholdsList";
import DirectoryFilterPanel from "@/components/directory/DirectoryFilterPanel";

export const communities = [
  { label: "Everyone", value: "" },
  { label: "Lakeside Only", value: "Lakeside" },
  { label: "Mountain Only", value: "Mountain" },
];

export default function DigitalDirectory() {
  const { households, loading, getHousehold } = useDirectory();

  const [household, setHousehold] = useState<Household>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const householdName = searchParams.get("household");
  const householdHead = searchParams.get("head");

  useEffect(() => {
    if (householdName && householdHead) {
      setHousehold(getHousehold(householdName, householdHead));
    } else {
      setHousehold(undefined);
    }
  }, [householdName, householdHead]);

  const [community, setCommunity] = useState(communities[0]);
  const [search, setSearch] = useState("");
  const [query] = useDebounce(search, 300);

  return (
    <>
      <div className="flex flex-grow flex-col">
        <DirectoryFilterPanel
          setSearch={setSearch}
          community={community}
          setCommunity={setCommunity}
        />
        {loading && <Loader text="Loading Directory Data ..." />}
        {households?.length > 0 && (
          <FilterableHouseholdsList
            households={households}
            query={query}
            community={community.value}
          />
        )}
      </div>
      {household && (
        <>
          <SlideOver onExitComplete={() => router.back()}>
            <HouseholdDetails household={household} />
          </SlideOver>
        </>
      )}
    </>
  );
}
