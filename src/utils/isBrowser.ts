import { isUndefined } from 'celia';

export const isBrowser
 = !isUndefined(window) && !isUndefined(document) && window.document === document;
