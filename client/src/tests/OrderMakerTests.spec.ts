import { render, fireEvent, screen } from '@testing-library/react';
import { OrderMaker } from '../features/orders/orderMaker/OrderMaker';

test('renders price and quantity', () => {
    const createOrder = jest.fn();

  const { getByText } = render(<OrderMaker createOrder={createOrder}/>);

  expect(getByText(/price/i)).toBeInTheDocument();
  expect(getByText(/quantity/i)).toBeInTheDocument();
});

test('submit button fires createOrder props', () => {
    const createOrder = jest.fn();

    render(<OrderMaker createOrder={createOrder}/>);

    fireEvent.click(screen.getByText(/submit/i));
    expect(createOrder).toHaveBeenCalled();
    expect(createOrder).toHaveBeenCalledTimes(1);
});

test('price value from slider renders in text at bottom', () => {
    const createOrder = jest.fn();
    render(<OrderMaker createOrder={createOrder}/>);

    const sliders = screen.getAllByRole('slider');
    const price = parseInt(sliders[0].getAttribute('aria-valuenow') as string).toFixed(2);
    const quantity = sliders[1].getAttribute('aria-valuenow');
    const orderSummarySnippet = `${quantity} EDC at ${price}`;

    expect(screen.getByTestId('summary')).toHaveTextContent(orderSummarySnippet);
})