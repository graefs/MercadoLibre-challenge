const addSeparators = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatPrice = (price) => {
    return `$ ${addSeparators(price.amount)}`
};