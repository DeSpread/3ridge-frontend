import { marked, Marked } from "marked";

const defaultOptions: marked.MarkedOptions = {
  breaks: true,
};

const _marked = new Marked(defaultOptions);

export const mdParser = (
  content: string,
  extraOptions?: marked.MarkedOptions,
) => {
  return _marked.parse(content, extraOptions);
};
