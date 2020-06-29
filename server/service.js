const client = require('./client');

const sanitizeResponse = (response) => {
    if(response.error){
        throw response;
    }
};

exports.getItemsList = (query) => {
    return client.search(query).then((response => {
        const author = {
            name: 'Alan',
            lastname: 'Graef'
        };
        const categories = response.filters.length && response.filters[0].values ?
            response.filters[0].values[0].path_from_root.map((elem) => elem.name) : [];
        const items = response.results.map((item) => {
            const [amount, decimals] = item.price.toString().split('.');
            console.log(item)
            return {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: parseInt(amount),
                    decimals: parseInt(decimals)
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                state: item.address.state_name
            }
        });
        return {
            author,
            categories,
            items
        }
    }))
};

exports.getItemDetail = (query) => {
    return client.getItemData(query)
        .then(responses => {
            responses.forEach(resp => sanitizeResponse(resp));
            return responses;
        })
        .then(responses => {
            const [item, description] = responses;
            const [amount, decimals] = item.price.toString().split('.');
            return {
                author: {
                    name: 'Alan',
                    lastname: 'Graef'
                },
                item: {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                        amount: parseInt(amount),
                        decimals: parseInt(decimals)
                    },
                    picture: item.pictures[0].secure_url,
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping,
                    sold_quantity: item.sold_quantity,
                    description: description.plain_text,
                }
            }
        })
};