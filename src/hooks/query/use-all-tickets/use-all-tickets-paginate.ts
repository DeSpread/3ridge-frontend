import { AllTicketsQueryProps, useAllTicketsQuery } from ".";

interface AllTicketsPaginateQueryProps extends AllTicketsQueryProps {
  initialSize?: number;
  fetchMoreSize?: number;
}

export const useAllTicketsPaginateQuery = ({
  filterType,
  sort,
  initialSize = 10,
}: AllTicketsPaginateQueryProps) => {
  const { data, loading, fetchMore } = useAllTicketsQuery({
    filterType,
    sort,
    limit: initialSize,
  });

  const _fetchMore = (size = 5) => {
    if (loading || !data || !data.length) return;

    fetchMore({
      variables: {
        filterType,
        sort,
        skip: data.length,
        limit: data.length + size,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          tickets: [...prev.tickets, ...fetchMoreResult.tickets],
        };
      },
    });
  };

  return {
    data,
    loading,
    paginate: _fetchMore,
  };
};
