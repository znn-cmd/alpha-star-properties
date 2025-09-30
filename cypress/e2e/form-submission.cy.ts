describe('Lead Form Submission', () => {
  beforeEach(() => {
    cy.visit('/en');
  });

  it('should open lead form modal when clicking CTA', () => {
    cy.contains('Book a Viewing').click();
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('should submit form with valid data', () => {
    // Open form
    cy.contains('Book a Viewing').click();
    
    // Fill form
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="phone"]').type('+971 50 123 4567');
    cy.get('select[name="purpose"]').select('buy');
    cy.get('textarea[name="message"]').type('Interested in properties');
    cy.get('input[type="checkbox"]').check();
    
    // Submit
    cy.contains('Send').click();
    
    // Should show success message
    cy.contains('Thank you!', { timeout: 10000 }).should('be.visible');
  });

  it('should show validation errors for empty required fields', () => {
    cy.contains('Book a Viewing').click();
    cy.contains('Send').click();
    
    // Should show error messages
    cy.contains('Name is required').should('be.visible');
    cy.contains('Valid phone number required').should('be.visible');
  });

  it('should track form submission event', () => {
    cy.window().then((win) => {
      // Spy on dataLayer
      cy.spy(win, 'dataLayer').as('dataLayer');
    });

    cy.contains('Book a Viewing').click();
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="phone"]').type('+971 50 123 4567');
    cy.get('input[type="checkbox"]').check();
    cy.contains('Send').click();

    // Verify analytics event was fired
    cy.get('@dataLayer').should('have.been.called');
  });
});
