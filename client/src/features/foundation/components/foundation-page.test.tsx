import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FoundationPage } from './foundation-page';

describe('FoundationPage', () => {
  it('explains the starter and links to every example route', () => {
    render(<FoundationPage />);

    expect(
      screen.getByRole('heading', {
        name: /un starter que explica dónde va cada cosa/i,
      }),
    ).toBeInTheDocument();

    const routeLinks = screen.getAllByRole('link', { name: 'Abrir ejemplo' });
    expect(routeLinks).toHaveLength(3);
    expect(routeLinks.map((link) => link.getAttribute('href'))).toEqual([
      '/login',
      '/dashboard',
      '/profile',
    ]);
  });
});
