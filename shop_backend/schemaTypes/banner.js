export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'buttonText',
            title: 'ButtonText',
            type: 'string',
        },
        {
            name: 'product',
            title: 'Product',
            type: 'string'
        },
        {
            name: 'smallText',
            title: 'SmallText',
            type: 'string'
        },
        {
            name: 'mediumText',
            title: 'MediumText',
            type: 'string'
        },
        {
            name: 'largeText',
            title: 'LargeText',
            type: 'string'
        },
        {
            name: 'largeText2',
            title: 'LargeText2',
            type: 'string'
        },
        {
            name: 'descr',
            title: 'Descr',
            type: 'string'
        },
        {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string'
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'string'
        }
    ]
}