import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  FilterSearch,
  Geolocation,
  OnSelectParams,
  Pagination,
  ResultsCount,
  VerticalResults,
  executeSearch,
} from "@yext/search-ui-react";
import { Fragment, useState } from "react";
import DirectoryRootGrid from "../components/DirectoryRootGrid";
import ManualRegular from "../components/cards/ManualRegular";
import PageLayout from "../components/page-layout";
import "../index.css";
import { useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export const config: TemplateConfig = {
  stream: {
    $id: "root-stream",
    filter: {
      entityTypes: ["ce_root"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_childEntityIds",
    ],
    localization: {
      locales: ["ja"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description:
            "This is a description for the Turtlehead Tacos directory home page.",
        },
      },
    ],
  };
};

const Index: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const { dm_directoryChildren } = document;
  return (
    <>
      <PageLayout>
        <Inner
          dm_directoryChildren={dm_directoryChildren}
          relativePrefixToRoot={relativePrefixToRoot}
        />
      </PageLayout>
    </>
  );
};
//2012年03月～2016年06月
const Inner = ({ dm_directoryChildren, relativePrefixToRoot }: any) => {
  const [showDir, setShowDir] = useState<boolean>(true);
  const searchActions = useSearchActions();
  useSearchState((state) => state.filters);
  const [customModelFacets, setCustomModelFacets] = useState([]);
  const [customYearFacets, setCustomYearFacets] = useState([]);
  const isLoading =
    useSearchState((state) => state.searchStatus.isLoading) || false;
  const [selected, setSelected] = useState(customModelFacets[0]);
  console.log(useSearchState((state) => state.filters.facets));
  useEffect(() => {
    console.log(`anain`);

    searchActions.setVertical("manual");
    searchActions
      .executeVerticalQuery()
      .then((res) =>
        setCustomModelFacets(
          res?.facets
            ?.filter((item) => item.fieldId === "c_carmodel")
            .flatMap((item) => item.options.map((option) => option.displayName))
        )
      );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let _filters: SelectableStaticFilter[] =
        searchActions.state.filters.static!;
      let y = _filters && _filters.some((item) => item.selected === true);
      setShowDir(!y || false);
    }
  }, [searchActions.state.filters.facets]);

  useEffect(() => {
    console.log(`entered`);

    searchActions.setQuery(selected);
    searchActions
      .executeVerticalQuery()
      .then((res) =>
        console.log(useSearchState((state) => state.filters.facets))
      );
  }, [selected]);

  return (
    <div className="!my-4 space-y-2 pb-12 px-10 bg-[#f2f2f2]">
      <>
        <div className="flex justify-between gap-8">
          {/*Filter 1 */}

          {/* {customModelFacets && (
            <div className="fixed top-16 w-72">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {customModelFacets.map((person, personIdx) => {
                        return (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        );
                      })}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )} */}
          <FilterSearch
            placeholder="車種を検索"
            searchOnSelect={true}
            customCssClasses={{
              filterSearchContainer: "w-1/2 h-14 mt-4 rounded-full",
            }}
            searchFields={[
              { entityType: "ce_manual", fieldApiName: "c_carmodel" },
            ]}
          />
          <FilterSearch
            placeholder="製造年を検索"
            customCssClasses={{
              filterSearchContainer: "w-1/2 h-14 mt-4 rounded-full",
            }}
            searchOnSelect={true}
            searchFields={[
              {
                entityType: "ce_manual",
                fieldApiName: "c_production_years",
              },
            ]}
          ></FilterSearch>
        </div>
        {!showDir && (
          <>
            <div className={`w-full `}>
              <div className="hidden md:flex w-full items-baseline justify-between">
                <ResultsCount />
              </div>
              <div>
                <AppliedFilters></AppliedFilters>
              </div>
              <div className="flex flex-col space-y-4 ">
                <VerticalResults
                  CardComponent={ManualRegular}
                  customCssClasses={{
                    verticalResultsContainer: `flex gap-4 flex-col`,
                  }}
                />
                <div>
                  <Pagination />
                  <Geolocation />
                </div>
              </div>
            </div>
          </>
        )}
      </>
      {showDir && (
        <div className="centered-container py-8">
          <DirectoryRootGrid
            name={""}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
