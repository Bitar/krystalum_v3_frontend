export const filterData = (data: any, attribute: string, values: string[]) => {
    return data.filter((datum: any) => !values.includes(datum[attribute]));
}

export const listGroupBy = function (arr: any[], key: any) {
    return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);

        return rv;
    }, {});
};

export const formatNumber = (amount: number) => {
    return amount.toLocaleString(undefined, {maximumFractionDigits: 2});
}