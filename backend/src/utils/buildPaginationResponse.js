export const buildPaginationResponse = (
    data,
    total,
    page,
    limit
) => ({
    ok: true,
    data,
    pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    },
});