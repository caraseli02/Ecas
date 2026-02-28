export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as {
    country?: string;
    region?: string;
    city?: string;
    postcode?: string;
    name1?: string;
  };

  const hasRequiredFields = Boolean(body?.country && body?.region && body?.city && body?.postcode && body?.name1);

  return {
    status: 'success',
    data: {
      valid: hasRequiredFields,
    },
  };
});
