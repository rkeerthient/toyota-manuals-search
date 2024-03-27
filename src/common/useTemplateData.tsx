import { TemplateRenderProps } from "@yext/pages/*";
import { createCtx } from "./createCtx";
type TemplateDataProviderProps = TemplateRenderProps<any>;

/**
 * A context provider that allows you to access all the TemplateRenderProps on the BaseProfile
 * from a child component without needing passthrough props.
 */
const [useTemplateData, TemplateDataProvider] =
  createCtx<TemplateDataProviderProps>(
    "Attempted to call useTemplateData outside of TemplateDataProvider"
  );

export { useTemplateData, TemplateDataProvider };
