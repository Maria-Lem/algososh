import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { changingColor, circle, defaultColor } from "../../utils/constants";

const addingCircles = (array) => {
  for (let i = 0; i < array.length; i++) {
    cy.get('input').type(array[i]);
    cy.get('input').should('have.value', array[i]);
    cy.get('@btnAdd').should('not.be.disabled').click();

    cy.get(circle)
      .eq(i)
      .should('have.text', array[i])
      .should('have.css', 'border-color', changingColor);

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle)
      .eq(i)
      .should('have.text', array[i])
      .should('have.css', 'border-color', defaultColor);
    
    cy.get('input').should('have.value', '');
    cy.get('@btnAdd').should('be.disabled');
  }
};

describe('Stack page tests', () => {
  beforeEach(() => {
    cy.visit('stack');
  });

  it('shoud check whether add btn is disabled when input is empty', () => {
    cy.get('input').should('have.value', '');
    cy.get('button')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
  });

  it('should check if adding new values work', () => {
    const testInputValues = [3, 7, 9, 12, 13];
    cy.get('button').contains('Добавить').parent().as('btnAdd');
    cy.clock();
    addingCircles(testInputValues);
  });

  it('should check if an element deletes correctly', () => {
    const testInputValues = [5];
    cy.clock();
    cy.get('button').contains('Добавить').parent().as('btnAdd');
    cy.get('button').contains('Удалить').parent().as('btnDelete');
    
    addingCircles(testInputValues);
    
    cy.get('@btnDelete').click();
    cy.get(circle).eq(0).should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).should('have.length', 0);
  });

  it('should check if all elements are deleted when clear button is clicked', () => {
    const testInputValues = [3, 7, 9, 12, 13];
    cy.clock();
    cy.get('button').contains('Добавить').parent().as('btnAdd');
    cy.get('button').contains('Удалить').parent().as('btnDelete');
    cy.get('button').contains('Очистить').parent().as('btnClear');

    addingCircles(testInputValues);
    cy.get('@btnClear').click();
    cy.get(circle).should('have.length', 0);

    cy.get('@btnAdd').should('be.disabled');
    cy.get('@btnDelete').should('be.disabled');
    cy.get('@btnClear').should('be.disabled');
  });
});