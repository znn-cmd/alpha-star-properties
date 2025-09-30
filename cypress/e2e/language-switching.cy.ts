describe('Language Switching', () => {
  it('should switch to Arabic and apply RTL', () => {
    cy.visit('/en');
    cy.contains('AR').click();
    
    // Check URL changed
    cy.url().should('include', '/ar');
    
    // Check RTL direction
    cy.get('html').should('have.attr', 'dir', 'rtl');
    
    // Check Arabic content
    cy.contains('عقارات فاخرة في دبي').should('be.visible');
  });

  it('should switch to Russian', () => {
    cy.visit('/en');
    cy.contains('RU').click();
    
    cy.url().should('include', '/ru');
    cy.contains('Элитная недвижимость в Дубае').should('be.visible');
  });

  it('should persist language selection', () => {
    cy.visit('/en');
    cy.contains('AR').click();
    cy.wait(500);
    
    // Reload page
    cy.reload();
    
    // Should still be in Arabic
    cy.get('html').should('have.attr', 'lang', 'ar');
  });
});
