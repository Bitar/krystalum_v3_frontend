export const filterData = (data: any, attribute: string, value: string) => {
    return data.filter((datum: any) => datum[attribute] !== value);
}