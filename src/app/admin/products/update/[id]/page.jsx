import React from 'react';
import { getCategories } from "@/lib/actions/Products";

import UpdateProduct from '../UpdateProduct';
import { serverFetch } from '@/lib/core/server';

const AdminProductUpdate = async ({ params }) => {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    const [productRes, categoriesRes] = await Promise.all([
        serverFetch(`/api/products/${productId}`).catch(() => null),
        getCategories().catch(() => []),
    ]);

    const initialData = productRes?.product || productRes || {};
    const getCats = categoriesRes?.categories || categoriesRes || [];

    return (
        <div>
            <UpdateProduct 
                productId={productId}
                initialData={initialData}
                getCats={getCats}
            />
        </div>
    );
};

export default AdminProductUpdate;