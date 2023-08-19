import { changingColor, defaultColor, modifiedColor } from "../../utils/constants";
import { DELAY_IN_MS } from '../../../src/constants/delays';

describe('String algorithm tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="recursion"]').click();
  });

  it('should check whether button is inactive when input is empty', () => {
    cy.get('input').should('have.value', '');
    cy.get('button')
      .contains('Развернуть')
      .parent()
      .should('be.disabled');
  });

  it('shoud test if the string is reversed correctly', () => {
    cy.get('input[type="text"]').as('input');
    cy.get('button').contains('Развернуть').parent().as('btn');
    cy.clock();

    cy.get('@input').type('hello');
    cy.get('@input').should('have.value', 'hello');
    cy.get('@btn').should('not.be.disabled').click();
    
    cy.tick(1100);
    cy.get('div[class*="circle_circle"]').as('circle').should('have.length', 5);
    
    cy.get('@circle').eq(0).should('have.css', 'border-color', changingColor);
    cy.get('@circle').eq(1).should('have.css', 'border-color', defaultColor);
    cy.get('@circle').eq(2).should('have.css', 'border-color', defaultColor);
    cy.get('@circle').eq(3).should('have.css', 'border-color', defaultColor);
    cy.get('@circle').eq(4).should('have.css', 'border-color', changingColor);

    cy.tick(DELAY_IN_MS);
    cy.get('@circle')
      .eq(0)
      .should('have.css', 'border-color', modifiedColor)
      .should('have.text', 'o');
    cy.get('@circle').eq(1).should('have.css', 'border-color', changingColor);
    cy.get('@circle').eq(2).should('have.css', 'border-color', defaultColor);
    cy.get('@circle').eq(3).should('have.css', 'border-color', changingColor);
    cy.get('@circle')
      .eq(4)
      .should('have.css', 'border-color', modifiedColor)
      .should('have.text', 'h');

    cy.tick(DELAY_IN_MS);
    cy.get('@circle')
      .eq(1)
      .should('have.css', 'border-color', modifiedColor)
      .should('have.text', 'l');
    cy.get('@circle').eq(2).should('have.css', 'border-color', changingColor);
    cy.get('@circle')
      .eq(3)
      .should('have.css', 'border-color', modifiedColor)
      .should('have.text', 'e');

    cy.tick(DELAY_IN_MS);
    cy.get('@circle')
      .eq(2)
      .should('have.css', 'border-color', modifiedColor)
      .should('have.text', 'l');
  });
});