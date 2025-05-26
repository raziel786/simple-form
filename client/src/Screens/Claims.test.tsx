/* eslint-disable testing-library/no-wait-for-multiple-assertions, 
                  testing-library/no-render-in-setup, 
                  testing-library/no-node-access */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { postClaim } from '../Api/Calls';
import { useClaims } from '../Hooks/useClaims';
import { IncidentType } from '../Types';
import Claims from './Claims';

jest.mock('../Hooks/useClaims');
jest.mock('../Api/Calls', () => ({
  postClaim: jest.fn(),
}));

describe('When the Claims component renders', () => {
  const mockSetClaims = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useClaims as jest.Mock).mockReturnValue({
      claims: [],
      setClaims: mockSetClaims,
      loading: false,
    });
  });

  describe('And it is loading', () => {
    it('Then it shows a loading indicator', () => {
      (useClaims as jest.Mock).mockReturnValueOnce({
        claims: [],
        setClaims: mockSetClaims,
        loading: true,
      });

      render(<Claims />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });


  describe('When the user fills out a valid claim form', () => {
    beforeEach(() => {
      render(<Claims />);

      const calendarInput = screen.getByTestId('calendar-picker').querySelector('input');
      fireEvent.change(calendarInput!, { target: { value: '01/01/2023' } });

      const categorySelect = within(screen.getByTestId('category-picker')).getByRole('combobox');
      fireEvent.change(categorySelect, { target: { value: IncidentType.Theft } });

      const descriptionInput = within(screen.getByTestId('description-field')).getByRole('textbox');
      fireEvent.change(descriptionInput, { target: { value: 'Bike stolen' } });
    });

    it('Then the submit button becomes enabled', () => {
      expect(screen.getByText('Submit')).not.toBeDisabled();
    });

    describe('And the form is submitted successfully', () => {
      beforeEach(() => {
        (postClaim as jest.Mock).mockResolvedValueOnce([
          {
            id: '1',
            date: new Date().toISOString(),
            type: IncidentType.Theft,
            description: 'Bike stolen',
          }
        ]);
        window.alert = jest.fn();
      });

      it('Then the claim is submitted and a success message is shown', async () => {
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
          expect(postClaim).toHaveBeenCalledTimes(1);
          expect(mockSetClaims).toHaveBeenCalled();
          expect(window.alert).toHaveBeenCalledWith('Claim submitted!');
        });
      });
    });
  });
});
