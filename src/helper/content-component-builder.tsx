import { ContentFormatType, ContentMetadata } from "../__generated__/graphql";
import { ComponentRenderFunc } from "../type";
import StringHelper from "./string-helper";

class ContentComponentBuilder {
  private readonly contentMetaData: ContentMetadata | undefined;
  private htmlComponentFunc: ComponentRenderFunc | undefined;
  private textComponentFunc: ComponentRenderFunc | undefined;
  private readonly content: string | undefined;

  constructor(contentMetadata?: ContentMetadata) {
    this.contentMetaData = contentMetadata;
    if (this.contentMetaData)
      this.content = StringHelper.getInstance().decodeContentMetaData(
        this.contentMetaData
      );
  }

  setHtmlComponentFunc = (htmlComponentFunc: ComponentRenderFunc) => {
    this.htmlComponentFunc = htmlComponentFunc;
    return this;
  };

  setTextComponentFunc = (textComponentFunc: ComponentRenderFunc) => {
    this.textComponentFunc = textComponentFunc;
    return this;
  };

  build = () => {
    switch (this.contentMetaData?.contentFormatType) {
      case ContentFormatType.Html:
        return this.htmlComponentFunc?.(this.content);

      case ContentFormatType.Text:
        return this.textComponentFunc?.(this.content);

      default:
        return <></>;
    }
    return <></>;
  };
}

export default ContentComponentBuilder;
