Cypress.Commands.add('searchTVShow', (tvShowName: string) => {
  cy.get('input[data-test="search-input"]').type(`${tvShowName}{enter}`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      searchTVShow(tvShowName: string): Chainable<void>;
    }
  }
}

export {};
