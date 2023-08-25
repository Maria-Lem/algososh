import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../../src/constants/delays";
import { changing, changingColor, circle, circleContent, defaultColor, modifiedColor } from "../../utils/constants";

describe('Linked list tests', () => {
  beforeEach(() => {
    cy.visit('list');
  });

  it('should check whether buttons are disabled when inputs are empty', () => {
    cy.get('button').contains('Добавить в head').parent().should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().should('be.disabled');
    cy.get('button').contains('Добавить по индексу').parent().should('be.disabled');
    cy.get('button').contains('Удалить по индексу').parent().should('be.disabled');
  });

  it('should check if the default array is rendered', () => {
    cy.get(circle).should('have.length', 4);

    for (let i = 0; i < 4; i++) {
      cy.get(circle)
        .eq(i)
        .should('have.css', 'border-color', defaultColor)
        .invoke('text')
        .should('not.be.empty');
    }

    cy.get(`${circleContent} div[class*="text"]:first-of-type`).eq(0).should('have.text', 'head');
    cy.get(`${circleContent} div[class*="text"]:last-of-type`).eq(3).should('have.text', 'tail');
  });

  it('should check if adding element to the head works', () => {
    cy.clock();
    cy.get('button').contains('Добавить в head').parent().as('btnAddToHead');
    cy.get('input[placeholder*="Введите значение"]').as('inputValue');
    
    cy.get('@inputValue').type(7);
    cy.get('@btnAddToHead').should('not.be.disabled').click();

    cy.get(circle).first().should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).first().should('have.css', 'border-color', modifiedColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).first().should('have.css', 'border-color', defaultColor);

    cy.get('@inputValue').should('have.value', '');
    cy.get('@btnAddToHead').should('be.disabled');
  });
  
  it('should check if adding element to the tail works', () => {
    cy.clock();
    cy.get('button').contains('Добавить в tail').parent().as('btnAddToTail');
    cy.get('input[placeholder*="Введите значение"]').as('inputValue');

    cy.get('@inputValue').type(7);
    cy.get('@btnAddToTail').should('not.be.disabled').click();
    
    cy.get(circle).eq(3).should('have.css', 'border-color', changingColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).last().should('have.css', 'border-color', modifiedColor);
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).last().should('have.css', 'border-color', defaultColor);

    cy.get('@inputValue').should('have.value', '');
    cy.get('@btnAddToTail').should('be.disabled');
  });

  it('should correctly add an element at an index', () => {
    cy.clock();
    cy.get('input[placeholder*="Введите значение"]').as('inputValue');
    cy.get('input[placeholder*="Введите индекс"]').as('inputIndex');
    cy.get('button').contains('Добавить по индексу').parent().as('btnAddAtIndex');

    cy.get('@inputValue').type(7);
    cy.get('@inputIndex').type(3);
    cy.get('@btnAddAtIndex').should('not.be.disabled').click();
    
    for (let i = 0; i <= 3; i++) {
      cy.get(circleContent).eq(i).contains(7).parent().should('have.css', 'border-color', changingColor);
      cy.tick(DELAY_IN_MS);
      if (i !== 0 && i !== 3) {
        cy.get(circle).eq(i - 1).should('have.css', 'border-color', changingColor);
      }
    }

    for (let i = 0; i < 3; i++) {
      cy.get(circle).eq(i).should('have.css', 'border-color', defaultColor);
    }

    cy.get(circle).eq(3).should('have.css', 'border-color', modifiedColor);
    cy.tick(DELAY_IN_MS);
    cy.get(circle).eq(3).should('have.css', 'border-color', defaultColor);
    cy.get('@inputValue').should('have.value', '');
    cy.get('@inputIndex').should('have.value', '');
    cy.get('@btnAddAtIndex').should('be.disabled');
  });

  it('should delete an element from the head', () => {
    cy.clock();
    cy.get('button').contains('Удалить из head').parent().as('btnDeleteFromHead');

    cy.get('@btnDeleteFromHead').click();
    cy.get(circle).first().should('have.value', '');
    cy.get(changing).eq(0).should('have.css', 'border-color', changingColor).invoke('text').should('not.be.empty');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).should('have.length', 3);
  });

  it('should delete an element from the tail', () => {
    cy.clock();
    cy.get('button').contains('Удалить из tail').parent().as('btnDeleteFromTail');

    cy.get('@btnDeleteFromTail').click();
    cy.get(circle).last().should('have.value', '');
    cy.get(changing).last().should('have.css', 'border-color', changingColor).invoke('text').should('not.be.empty');
    cy.tick(SHORT_DELAY_IN_MS);
    cy.get(circle).should('have.length', 3);
  });

  it('should delete an element at an entered index', () => {
    cy.clock();
    cy.get('input[placeholder*="Введите индекс"]').as('inputIndex');
    cy.get('button').contains('Удалить по индексу').parent().as('btnDeleteAtIndex');

    cy.get('@inputIndex').type(3);
    cy.get('@btnDeleteAtIndex').should('not.be.disabled').click();

    for (let i = 0; i <= 3; i++) {
      cy.get(circle).eq(i).should('have.css', 'border-color', changingColor);
      cy.tick(DELAY_IN_MS);
    }
    cy.get(circle)
      .eq(3)
      .should('have.css', 'border-color', defaultColor)
      .should('have.text', '');
    cy.get(changing)
      .last()
      .should('have.css', 'border-color', changingColor)
      .invoke('text')
      .should('not.be.empty');
    cy.tick(DELAY_IN_MS);

    for (let i = 0; i < 3; i++) {
      cy.get(circle).eq(i).should('have.css', 'border-color', defaultColor);
    }

    cy.get(circle).should('have.length', 3);
    cy.get('@inputIndex').should('have.value', '');
  });
});