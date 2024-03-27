import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";
import { SearchTermProvider } from "../common/searchTermContext";

type Props = {
  _site?: Site;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <SearchTermProvider>
      <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
        <div className="min-h-screen">
          <Header></Header>
          {children}
        </div>
      </SearchHeadlessProvider>
    </SearchTermProvider>
  );
};

export default PageLayout;
