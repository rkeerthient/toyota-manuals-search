import { CardProps } from "@yext/search-ui-react";
import Ce_manual from "../../types/manual";
import { FaFileAlt } from "react-icons/fa";

const ManualLexical = ({ result }: CardProps<Ce_manual>) => {
  const { description, c_primaryCTA, c_secondaryCTA, s_snippet } =
    result.rawData;
  const { name: _name, segment } = result;
  const { c_manual_file, photoGallery } = result.rawData;
  const { url, name, size, mimeType } = c_manual_file;
  console.log(JSON.stringify(result));

  return (
    <div className="border rounded-md  font-semibold p-4 leading-6 text-gray-900 group-hover:text-gray-600 flex flex-col gap-4">
      <div>{_name}</div>
      <div className="text-sm text-gray-500">{s_snippet}</div>
      <div className="flex text-sm items-center gap-1">
        <FaFileAlt />
        <a href={url} className="underline text-[#8bb0cd]">
          {name}
        </a>
        ({size}kb)
      </div>
    </div>
  );
};

export default ManualLexical;
