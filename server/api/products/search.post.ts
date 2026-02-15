import { mockProducts } from '~/server/utils/mockProducts';

export default defineEventHandler(async (event) => {
    const body = (await readBody(event)) as {
        keyword?: string;
        category?: string;
        page?: number;
        perPage?: number;
    };

    let filteredProducts = mockProducts;

    if (body.keyword) {
        const keyword = body.keyword.toLowerCase();
        filteredProducts = mockProducts.filter(
            (p: any) =>
                p.name.toLowerCase().includes(keyword) ||
                p.description?.toLowerCase().includes(keyword) ||
                p.manufacturer?.toLowerCase().includes(keyword) ||
                p.code?.toLowerCase().includes(keyword)
        );
    }

    if (body.category) {
        filteredProducts = filteredProducts.filter((p: any) => p.category?.toLowerCase() === body.category?.toLowerCase());
    }

    return {
        status: 'success',
        data: {
            products: filteredProducts,
            page: body.page || 1,
            perPage: body.perPage || 10,
            total: filteredProducts.length,
        },
    };
});
