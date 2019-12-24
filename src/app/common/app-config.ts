
export const AppConfig = {
    angularClientID : 'e185cf70-8c2b-4637-9b4d-12a4d482059c',
    apiClientID:"75679928-db16-495f-ad56-46b678f6eb03",
    tenantID:"e51112a7-bc43-4453-bf7c-f8e6aed76761",
    authority: "https://login.microsoftonline.com/e51112a7-bc43-4453-bf7c-f8e6aed76761",
    validateAuthority: true,
    consentScopes: [ "api://75679928-db16-495f-ad56-46b678f6eb03/user.read", "api://75679928-db16-495f-ad56-46b678f6eb03/.default" ],
    webApiEndpoint: "http://localhost:44351/api",
    webApiScopes: ['api://75679928-db16-495f-ad56-46b678f6eb03/.default'],
    userProfileEndpoint: "https://graph.microsoft.com/v1.0/me",
    userProfileScopes: ["user.read"],
    redirectUri: "http://localhost:4200/",
    cacheLocation : "localStorage",
    postLogoutRedirectUri: "http://localhost:4200/",
    navigateToLoginRequestUrl: true,
    correlationId: 'nuveenangulardemo',
    piiLoggingEnabled: true,
    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    spApiScopes: ["https://dougnuveen.sharepoint.com/.default"],
    sharepointURL:"https://dougnuveen.sharepoint.com/sites/TestExternal/_api/web/lists/getbytitle('Deal List')/items",
    sharepointList:"Deal List"
};
