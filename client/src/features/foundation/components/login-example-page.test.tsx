import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LoginExamplePage } from './login-example-page';

describe('LoginExamplePage', () => {
  it('labels the example fields and links submission to dashboard', () => {
    render(<LoginExamplePage />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Contraseña')).toHaveAttribute(
      'type',
      'password',
    );
    const submitButton = screen.getByRole('button', { name: 'Ingresar' });
    expect(submitButton).toBeEnabled();
    expect(submitButton.closest('form')).toHaveAttribute(
      'action',
      '/dashboard',
    );
  });
});
