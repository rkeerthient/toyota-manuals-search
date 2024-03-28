import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";

type Props = {
  _site?: Site;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
      <div className="min-h-screen">
        <Header></Header>
        {children}
      </div>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
