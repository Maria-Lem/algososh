import renderer from 'react-test-renderer';
import { Circle } from "./circle";
import { ElementStates } from '../../../types/element-states';

describe('Testing circle functionality', () => {
  it('Circle should render correctly without a letter', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should be rendered correctly with letters in it', () => {
    const circle = renderer.create(<Circle letter='1213' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render a head element with a letter in it', () => {
    const circle = renderer.create(<Circle head='A' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render a head element with an element in it', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render a tail element with a letter in it', () => {
    const circle = renderer.create(<Circle tail='Z' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render a tail element with an element in it', () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render index', () => {
    const circle = renderer.create(<Circle index={3} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render with props isSmall = true', () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render default state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render changing state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Circle should correctly render modified state', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});