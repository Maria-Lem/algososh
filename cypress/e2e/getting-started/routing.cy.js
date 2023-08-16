describe('service is available', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open recursion algorithm', () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains('Строка');
  });

  it('should open fibonacci algorithm', () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
  });

  it('should open sorting algorithm', () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка массива');
  });

  it('shoud open stack algorithm', () => {
    cy.get('a[href*="stack"]').click();
    cy.contains('Стек');
  });

  it('should open queue algorithm', () => {
    cy.get('a[href*="queue"]').click();
    cy.contains('Очередь');
  });

  it('should open linked list algorithm', () => {
    cy.get('a[href*="list"]').click();
    cy.contains('Связный список');
  });
})