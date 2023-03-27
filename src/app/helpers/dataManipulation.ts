export const filterData = (data: any, attribute: string, values: string[]) => {
    return data.filter((datum: any) => !values.includes(datum[attribute]));
}