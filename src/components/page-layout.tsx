import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { chatConfig, searchConfig } from "./searchConfig";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatModeContextProvider } from "./ChatModeContext";

type Props = {
  _site?: Site;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, children }: Props) => {
  return (
    <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
      <ChatHeadlessProvider config={chatConfig}>
        <ChatModeContextProvider>
          <div className="min-h-screen">
            <Header></Header>
            {children}
          </div>
        </ChatModeContextProvider>
      </ChatHeadlessProvider>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
