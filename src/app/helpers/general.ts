export const downloadOnClick = (href: string | null | undefined) => {
    if (href) {
        const link = document.createElement('a');

        link.href = href;

        link.click();
    }
};

export const enumToArray = <T extends string>(
    enumObject: Record<T, string>
): Array<{ id: T; name: string }> => {
    return Object.keys(enumObject).map((key) => ({
        id: key as T,
        name: enumObject[key as keyof typeof enumObject]
    }));
};

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
