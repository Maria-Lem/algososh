import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { defaultColor } from "../../utils/constants";

describe('Fibonacci sequence algorithm test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="fibonacci"]').click();
  });

  it('should check whether button is inactive when input is empty', () => {
    cy.get('input[type="number"]').should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('should check if the algorithm works correctly', () => {
    const value = 5;
    cy.get('input[type="number"]').as('input');
    cy.get('button').contains('Рассчитать').as('btn');
    cy.clock();

    cy.get('@input').type(value);
    cy.get('@input').should('have.value', value);
    cy.get('@btn').should('not.be.disabled').click();
    
    cy.tick(550);
    cy.get('div[class*="circle_circle"]').as('circle');

    cy.get('@circle')
      .eq(0)
      .should('have.text', 1)
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);
    
    cy.get('@circle')
      .eq(1)
      .should('have.text', 1)
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circle')
      .eq(2)
      .should('have.text', 2)
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circle')
      .eq(3)
      .should('have.text', 3)
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circle')
      .eq(4)
      .should('have.text', 5)
      .should('have.css', 'border-color', defaultColor);
    cy.tick(SHORT_DELAY_IN_MS);

    cy.get('@circle')
      .eq(5)
      .should('have.text', 8)
      .should('have.css', 'border-color', defaultColor);
  });
});