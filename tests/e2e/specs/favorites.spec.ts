const friendsShow = {
  id: 431,
  name: 'Friends',
};

describe('Favorites', () => {
  it('shows empty state when there are no favorites', () => {
    cy.visit('/favorites');
    cy.get('[data-test="favorites-page"]').should('be.visible');
    cy.contains('No favorite shows yet');
    cy.contains('No favorite actors yet');
  });

  it('adds a show from the show page and lists it under Shows', () => {
    cy.visit('/');
    cy.searchTVShow(friendsShow.name);
    cy.get('.card').contains('[data-test="card-title"]', friendsShow.name).click();
    cy.location('pathname').should('eq', `/shows/${friendsShow.id}`);

    cy.get('[data-test="favorite-toggle"]').should('contain', 'Add to favorites');
    cy.get('[data-test="favorite-toggle"]').click();
    cy.get('[data-test="favorite-toggle"]').should('contain', 'In favorites');

    cy.get('[data-test="nav-favorites"]').click();
    cy.location('pathname').should('eq', '/favorites');
    cy.contains('h2', 'Shows');
    cy.get('[data-test="card-title"]').should('contain', friendsShow.name);
  });

  it('removes a show from favorites via toggle on the show page', () => {
    cy.visit('/');
    cy.searchTVShow(friendsShow.name);
    cy.get('.card').contains('[data-test="card-title"]', friendsShow.name).click();
    cy.get('[data-test="favorite-toggle"]').click();
    cy.get('[data-test="nav-favorites"]').click();
    cy.get('[data-test="card-title"]').should('contain', friendsShow.name);

    cy.get('[data-test="nav-home"]').click();
    cy.searchTVShow(friendsShow.name);
    cy.get('.card').contains('[data-test="card-title"]', friendsShow.name).click();
    cy.get('[data-test="favorite-toggle"]').click();
    cy.get('[data-test="favorite-toggle"]').should('contain', 'Add to favorites');

    cy.get('[data-test="nav-favorites"]').click();
    cy.contains('No favorite shows yet');
  });

  it('adds an actor from the actor page and lists them under Actors', () => {
    cy.visit('/');
    cy.searchTVShow(friendsShow.name);
    cy.get('.card').contains('[data-test="card-title"]', friendsShow.name).click();

    cy.get('.cast-flip-card', { timeout: 20000 }).should('have.length.at.least', 1);
    cy.get('.cast-flip-card').first().click();
    cy.location('pathname').should('match', /^\/actors\/\d+$/);

    cy.get('[data-test="favorite-actor-toggle"]').scrollIntoView();
    cy.get('[data-test="favorite-actor-toggle"]').should('be.visible');
    cy.get('.actor__title')
      .invoke('text')
      .then(actorName => {
        const trimmed = actorName.trim();
        expect(trimmed.length).to.be.greaterThan(0);

        cy.get('[data-test="favorite-actor-toggle"]').scrollIntoView().click();
        cy.get('[data-test="favorite-actor-toggle"]').should('contain', 'In favorites');

        cy.get('[data-test="nav-favorites"]').click();
        cy.contains('h2', 'Actors');
        cy.get('[data-test="person-card-title"]').should('contain', trimmed);
      });
  });

  it('removes an actor from favorites via the actor page', () => {
    cy.visit('/');
    cy.searchTVShow(friendsShow.name);
    cy.get('.card').contains('[data-test="card-title"]', friendsShow.name).click();
    cy.get('.cast-flip-card', { timeout: 20000 }).first().click();

    cy.get('[data-test="favorite-actor-toggle"]').scrollIntoView().click();
    cy.get('[data-test="nav-favorites"]').click();
    cy.get('[data-test="person-card-title"]').should('exist');

    cy.get('.person-card').first().click();
    cy.location('pathname').should('match', /^\/actors\/\d+$/);
    cy.get('[data-test="favorite-actor-toggle"]').scrollIntoView().click();
    cy.get('[data-test="favorite-actor-toggle"]').should('contain', 'Add to favorites');

    cy.get('[data-test="nav-favorites"]').click();
    cy.contains('No favorite actors yet');
  });
});
