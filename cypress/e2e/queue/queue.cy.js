import { SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { changingColor, circle, circleContent, defaultColor } from "../../utils/constants";

const addingValues = (array) => {
  for (let i = 0; i < array.length; i++) {
    cy.get('input').type(array[i]);
    cy.get('input').should('have.value', array[i]);

    cy.get('@btnAdd').should('not.be.disabled').click();
    cy.get('@head').eq(0).should('have.text', 'head');
    cy.get('@tail').eq(i).should('have.text', 'tail');
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

describe('Queue page tests', () => {
  beforeEach(() => {
    cy.visit('queue');
  });

  it('should check whether add btn is disabled when input is empty', () => {
    cy.get('input').should('have.value', '');
    cy.get('button')
      .contains('Добавить')
      .parent()
      .should('be.disabled');
  });

  it('should check if adding new values work', () => {
    const testInputValues = [3, 7, 9, 12, 13];
    cy.get('button').contains('Добавить').parent().as('btnAdd');
    cy.get(`${circleContent} div[class*="text"]:first-of-type`).as('head');
    cy.get(`${circleContent} div[class*="text"]:last-of-type`).as('tail');
    cy.clock();

    addingValues(testInputValues);
  });

  it('should check if an element deletes correctly', () => {
    const testInputValues = [5];
    cy.clock();
    cy.get('button').contains('Добавить').parent().as('btnAdd');
    cy.get('button').contains('Удалить').parent().as('btnDelete');
    cy.get(`${circleContent} div[class*="text"]:first-of-type`).as('head');
    cy.get(`${circleContent} div[class*="text"]:last-of-type`).as('tail');

    addingValues(testInputValues);
    cy.get('@btnDelete').click();
    cy.get(circle).eq(0).should('have.css', 'border-color', changingColor);

    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle)
      .eq(0)
      .should('have.css', 'border-color', defaultColor)
      .should('have.text', '');
    cy.get('@head').eq(0).should('have.text', '');
    cy.get('@tail').eq(0).should('have.text', '');
  });

  it('should check if all elements are deleted when clear button is clicked', () => {
    const testInputValues = [3, 9, 12];
    cy.clock();
    cy.get('button').contains('Добавить').parent().as('btnAdd');
    cy.get('button').contains('Удалить').parent().as('btnDelete');
    cy.get('button').contains('Очистить').parent().as('btnClear');
    cy.get(`${circleContent} div[class*="text"]:first-of-type`).as('head');
    cy.get(`${circleContent} div[class*="text"]:last-of-type`).as('tail');

    addingValues(testInputValues);
    cy.get('@btnClear').click();

    cy.get('@head').eq(0).should('have.text', '');
    cy.get('@tail').eq(testInputValues.length - 1).should('have.text', '');
    cy.get('@btnAdd').should('be.disabled');
    cy.get('@btnDelete').should('be.disabled');
    cy.get('@btnClear').should('be.disabled');
  });
});