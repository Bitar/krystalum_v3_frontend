export class RoutePermissionMapper {
    regexMap: Map<RegExp, string>;

    constructor() {
        this.regexMap = new Map<RegExp, string>();

        this.fillMap();
    }

    fillMap() {
        // Iam Module
        this.regexMap.set(/^\/iam\/[a-z-]+\/?$/, 'view-iam');

        this.regexMap.set(/^\/iam\/[a-z-]+\/create\/?$/, 'manage-iam');

        this.regexMap.set(/^\/iam\/[a-z-]+\/\d+\/edit\/?$/, 'manage-iam');

        // Misc Module
        this.regexMap.set(/^\/misc\/[a-z-]+\/?$/, 'view-misc');

        this.regexMap.set(/^\/misc\/[a-z-]+\/create\/?$/, 'manage-misc');

        this.regexMap.set(/^\/misc\/[a-z-]+\/\d+\/edit\/?$/, 'manage-misc');

    }
}