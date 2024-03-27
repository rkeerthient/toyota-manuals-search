import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";
import {
  Matcher,
  UniversalLimit,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  DirectAnswer,
  Facets,
  Geolocation,
  Pagination,
  ResultsCount,
  SearchBar,
  StandardCard,
  UniversalResults,
  VerticalResults,
  onSearchFunc,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { useSearchTermContext } from "../common/searchTermContext";
import Loader from "../components/Loader";
import FAQ from "../components/cards/FAQ";
import ManualLexical from "../components/cards/ManualLexical";
import ManualRegular from "../components/cards/ManualRegular";
import PageLayout from "../components/page-layout";
import "../index.css";

export const config: TemplateConfig = {
  name: "search",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `search.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: "Toyota | Search",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot,
        },
      },
    ],
  };
};

const verticals = [
  { name: "All", verticalKey: "", cardType: StandardCard, classes: "" },

  { name: "FAQs", verticalKey: "faqs", cardType: FAQ, classes: "" },
  {
    name: "Manuals(Classic)",
    verticalKey: "manual",
    cardType: ManualRegular,
    classes: "grid grid-cols-3 gap-4",
  },
  {
    name: "Manuals(Lexical)",
    verticalKey: "manual_lexical",
    cardType: ManualLexical,
    classes: "",
  },
];
const SearchWrapper: Template<
  TemplateRenderProps
> = ({}: TemplateRenderProps) => {
  return (
    <PageLayout>
      <div className="w-full min-h-screen">
        <SearchPane></SearchPane>
      </div>
    </PageLayout>
  );
};
export default SearchWrapper;

const verticalLimit: UniversalLimit = {
  files: 4,
};

export const SearchPane = () => {
  const [currentVertical, setCurrentVertical] = useState<string>("");
  const searchActions = useSearchActions();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vectorResults, setVectorResults] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { filterCar, filterYear } = useSearchTermContext();
  useEffect(() => {
    if (filterCar) {
      searchActions.setStaticFilters([
        {
          selected: true,
          filter: {
            kind: "fieldValue",
            fieldId: "c_production_years",
            value: filterCar,
            matcher: Matcher.Equals,
          },
        },
      ]);
    }
    if (filterYear) {
      searchActions.setStaticFilters([
        {
          selected: true,
          filter: {
            kind: "fieldValue",
            fieldId: "c_production_years",
            value: filterYear,
            matcher: Matcher.Equals,
          },
        },
      ]);
    }
  }, [filterCar, filterYear]);

  useEffect(() => {
    setIsLoading(true);
    searchTerm && searchActions.setQuery(searchTerm);
    const queryParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      queryParams.set("query", searchTerm);
    } else {
      queryParams.delete("query");
    }
    if (currentVertical) {
      queryParams.set("verticalKey", currentVertical);
    } else {
      queryParams.delete("verticalKey");
    }
    history.pushState(null, "", "?" + queryParams.toString());
    currentVertical
      ? (searchActions.setVertical(currentVertical),
        searchActions.executeVerticalQuery().then(() => setIsLoading(false)))
      : (searchActions.setUniversal(),
        searchActions.setUniversalLimit(verticalLimit),
        searchActions.executeUniversalQuery().then((res) => {
          setVectorResults(
            res!.verticalResults.find(
              (item) => item.source === "DOCUMENT_VERTICAL"
            )?.results || []
          );
          setIsLoading(false);
        }));
  }, [currentVertical, searchTerm]);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    query && setSearchTerm(query);
  };
  const FlexSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="flex flex-col gap-4 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="flex  w-full centered-container">
      <div className="flex w-full flex-col px-4">
        <div className="flex flex-col gap-4 p-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Ask questions about your policies or account"
          ></SearchBar>
          <div className="border-b-2">
            <div className="w-full px-8 flex justify-between  items-center text-lg font-semibold">
              {verticals.map((item, index) => (
                <div
                  key={index}
                  className={`hover:cursor-pointer hover:border-b-4 hover:border-blue-400 border-b-4  ${currentVertical === item.verticalKey ? `border-blue-400` : ` border-transparent`}`}
                  onClick={() => {
                    setIsLoading(true);
                    setCurrentVertical(item.verticalKey);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <>
          {isLoading ? (
            <div className="flex h-[85vh] justify-center items-center w-full">
              <Loader />
            </div>
          ) : (
            <div
              className={`flex mt-4 ${currentVertical ? `flex-row` : `flex-col`}`}
            >
              {currentVertical ? (
                <>
                  <div className="w-72 mr-5 hidden md:block">
                    <Facets
                      customCssClasses={{ facetsContainer: "mr-10" }}
                    ></Facets>
                  </div>
                  <div className={`w-full `}>
                    <div className="hidden md:flex w-full items-baseline justify-between">
                      <ResultsCount />
                    </div>
                    <div className="flex justify-between mb-4">
                      <AppliedFilters />
                    </div>
                    <div className="flex flex-col space-y-4 ">
                      <VerticalResults
                        CardComponent={
                          verticals.filter(
                            (item) => item.verticalKey === currentVertical
                          )[0].cardType
                        }
                        customCssClasses={{
                          verticalResultsContainer:
                            `${
                              verticals.filter(
                                (item) => item.verticalKey === currentVertical
                              )[0].classes
                            }` || `flex gap-4 flex-col`,
                        }}
                      />
                      <div>
                        <Pagination />
                        <Geolocation />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mx-8">
                  <DirectAnswer
                    customCssClasses={{ answerContainer: "my-4" }}
                  />
                  <ResultsCount />
                  <AppliedFilters
                    customCssClasses={{
                      appliedFiltersContainer: `!flex flex-row`,
                    }}
                  ></AppliedFilters>

                  <UniversalResults
                    showAppliedFilters={true}
                    customCssClasses={{
                      universalResultsContainer: "w-full my-6 ",
                      sectionHeaderIconContainer: "hidden",
                      sectionHeaderLabel: "-mb-4",
                    }}
                    verticalConfigMap={{
                      faqs: {
                        SectionComponent: FlexSection,
                        CardComponent: FAQ,
                        label: "FAQs",
                        viewAllButton: true,
                      },
                      manual: {
                        SectionComponent: FlexSection,
                        CardComponent: ManualRegular,
                        label: "Manual (Regular)",
                        viewAllButton: true,
                      },
                      manual_lexical: {
                        SectionComponent: FlexSection,
                        CardComponent: ManualLexical,
                        label: "Manual (Lexical)",
                        viewAllButton: true,
                      },
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
};