import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './button';

describe('Testing button functionality', () => {
  it('Button is rendered with text', () => {
    const button = renderer.create(<Button text='Button text' />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button is rendered without text', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button is disabled correctly', () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Button is using loading ion correctly', () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Clicking on button returns callback function', () => {
    const onClickEvent = jest.fn();
    render(<Button text='Button text' onClick={onClickEvent} />);
    fireEvent.click(screen.getByText('Button text'));
    expect(onClickEvent).toHaveBeenCalled();
  });
});
