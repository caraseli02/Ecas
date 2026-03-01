import { getQuery } from 'h3';
import { getDemoTransactions } from '~/server/utils/mockDashboardDemo';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = Math.max(1, Number(query.page || 1));
  const perPage = Math.max(1, Number(query.perPage || 10));

  const allTransactions = getDemoTransactions();
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const items = allTransactions.slice(start, end);

  return {
    status: 'success',
    data: {
      total_items: allTransactions.length,
      page_count: Math.max(1, Math.ceil(allTransactions.length / perPage)),
      page,
      items,
    },
  };
});
