// https://docs.cypress.io/api/introduction/api.html

const show = {
  id: 431,
  url: 'http://www.tvmaze.com/shows/431/friends',
  name: 'Friends',
};

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.searchTVShow(show.name);
    cy.get('.card').contains('[data-test="card-title"]', show.name);
  });

  it('Opens a TV-show page', () => {
    cy.visit('/');
    cy.searchTVShow(show.name);

    cy.get('.card')
      .contains('[data-test="card-title"]', show.name)
      .click();

    cy.location('pathname').should('eq', `/shows/${show.id}`);
  });
});
