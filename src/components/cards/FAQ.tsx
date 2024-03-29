import { CardProps } from "@yext/search-ui-react";
import Faq from "../../types/faqs";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Markdown from "markdown-to-jsx";
const FAQ = ({ result }: CardProps<Faq>) => {
  const { name } = result;
  const { c_answerMarkdown } = result.rawData;

  return (
    <div className="border p-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between px-4 py-2 items-center rounded-lg ">
              <div className="text-lg">{name}</div>
              <ChevronDownIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-8 w-8 text-[#218a3c]`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-800">
              <div className="flex flex-col gap-2">
                {c_answerMarkdown && (
                  <div>
                    <Markdown>{c_answerMarkdown.markdown}</Markdown>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default FAQ;
