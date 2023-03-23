export const downloadOnClick = (href: string|null|undefined) => {
    if(href) {
        const link = document.createElement('a');

        link.href = href;

        link.click();
    }
};