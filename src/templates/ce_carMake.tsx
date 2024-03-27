/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Pages system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import "../index.css";
import DirectoryCityGrid from "../components/DirectoryCityGrid";
import Breadcrumbs from "../components/Breadcrumbs";
import PageLayout from "../components/page-layout";

export const config: TemplateConfig = {
  stream: {
    $id: "carmake-stream",
    filter: {
      entityTypes: ["ce_carManual"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "photoGallery",
      "dm_directoryParents_toyota_manual_final.name",
      "dm_directoryParents_toyota_manual_final.slug",
      "dm_directoryParents_toyota_manual_final.meta",
      "dm_directoryParents_toyota_manual_final.photoGallery",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.photoGallery",
    ],
    localization: {
      locales: ["ja"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`alias/${document.locale}/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
        },
      },
    ],
  };
};

export const transformProps: TransformProps<any> = async (data) => {
  const { dm_directoryParents_toyota_manual_final, name } = data.document;

  (dm_directoryParents_toyota_manual_final || []).push({
    name: name,
    slug: "",
  });

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents_toyota_manual_final:
        dm_directoryParents_toyota_manual_final,
    },
  };
};

const CarMake: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    description,
    siteDomain,
    dm_directoryParents_toyota_manual_final,
    dm_directoryChildren,
    photoGallery,
  } = document;
  console.log(JSON.stringify(photoGallery));

  return (
    <>
      <PageLayout>
        <div className="centered-container">
          <Breadcrumbs
            breadcrumbs={dm_directoryParents_toyota_manual_final}
            baseUrl={relativePrefixToRoot}
          />
          {dm_directoryChildren.name}
          <DirectoryCityGrid
            name={name}
            description={description}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={relativePrefixToRoot}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default CarMake;
