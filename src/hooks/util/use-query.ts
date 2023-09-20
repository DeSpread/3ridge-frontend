import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery as useQueryOrigin,
} from "@apollo/client";

export const useQuery = <Data = any, Variables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<Data, Variables>,
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => {
  const shouldSkip = () => {
    const { variables } = options ?? {};

    if (options?.skip) return true;
    if (!variables) return options?.skip;

    const [_values, _keys] = [Object.values(variables), Object.keys(variables)];

    const definedValues = _values.filter((value) => value !== undefined);
    return definedValues.length !== _keys.length;
  };

  const isSkip = shouldSkip();

  return useQueryOrigin(query, { ...options, skip: isSkip });
};
