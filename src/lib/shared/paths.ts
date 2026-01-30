// public
export const HOME = "/?more";
export const CONTACT = "/contact";
export const FAQ = "/faq";
export const PORTFOLIO = "/portfolio";
export const PORTFOLIO_$TAG = (tag: string) => `${PORTFOLIO}/${tag}`;
export const LOGIN = "/login";
export const LOGIN_VERIFY = `${LOGIN}/verify`;
export const REGISTER = "/register";
const SERVICES = "/services";
export const SERVICES_WEDDING = `${SERVICES}/wedding`;

// private
export const U = "/u";
export const U_ACCOUNT = `${U}/account`;
export const U_PREFERENCES = `${U}/preferences`;
export const A = "/a";
export const A_CLI = `${A}/cli`;
export const A_USERS = `${A}/users`;
export const A_ASSETS = `${A}/assets`;
const A_PORTFOLIO = `${A}/portfolio`;
export const A_PORTFOLIO_CATEGORIES = `${A_PORTFOLIO}/categories`;
export const A_PORTFOLIO_CATEGORIES_$ID = (id: string) => `${A_PORTFOLIO_CATEGORIES}/${id}`;
export const A_PORTFOLIO_GROUPS = `${A_PORTFOLIO}/groups`;
export const A_PORTFOLIO_GROUPS_$ID = (id: string) => `${A_PORTFOLIO_GROUPS}/${id}`;
export const A_PORTFOLIO_MEDIA = `${A_PORTFOLIO}/media`;
export const A_REGISTRIES = `${A}/registries`;

// api

// assets
export const PLACEHOLDER = "/placeholder.jpg"
