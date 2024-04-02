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
import { useState } from "react";
import DirectoryRootGrid from "../components/DirectoryRootGrid";
import ManualRegular from "../components/cards/ManualRegular";
import PageLayout from "../components/page-layout";
import "../index.css";
import { useEffect } from "react";

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

  const isLoading =
    useSearchState((state) => state.searchStatus.isLoading) || false;
  useEffect(() => {
    searchActions.setVertical("manual");
  }, []);

  useEffect(() => {
    if (!isLoading) {
      let _filters: SelectableStaticFilter[] =
        searchActions.state.filters.static!;
      let y = _filters && _filters.some((item) => item.selected === true);
      setShowDir(!y || false);
    }
  }, [searchActions.state.filters.facets]);

  return (
    <div className="!my-4 space-y-2 pb-12 px-10 bg-[#f2f2f2]">
      <>
        <div className="flex justify-between gap-8">
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
