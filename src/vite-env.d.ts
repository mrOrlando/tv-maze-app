/// <reference types="vite/client" />

declare module 'lodash.orderby' {
  const orderBy: <T>(collection: T[], iteratees: string[], orders?: string[]) => T[];
  export default orderBy;
}
