import request from '../common/request';

const routes = {
    getAllTransactions: async (startDate?: string, endDate?: string) => {
        const from = startDate ? `?from=${startDate}` : '';
        const to = endDate ? `&to=${endDate}` : '';
        return request.get(`/transaction${from}${to}`);
    },
    createManyTransactions: async (transactions: any) => {
        return request.post(`/transaction/create-many`, { transactions });
    },
    getAllCategories: async () => {
        return request.get(`/category`);
    },
    getAllCategoriesWithMatchers: async () => {
        return request.get(`/category?includeMatchers=true`);
    },
    // createCategory: async (category: Partial<Category>) => {
    //     return await request.post(`/category`, category)
    // },
    // updateCategory: async (category: Partial<Category>) => {
    //     return await request.put(`/category/${category.id}`, category)
    // },
    // deleteSingleCategory: async (categoryId: Category['id']) => {
    //     return await request.delete(`/category/${categoryId}`)
    // },
    // addSingleMatcher: async (matcher: Partial<Matcher>, categoryId: Category['id']) => {
    //     return await request.post(`/matcher/`, { ...matcher, categoryId })
    // },
    deleteSingleMatcher: async (id: number | string) => {
        return request.delete(`/matcher/${id}`);
    },
};

export default routes;
