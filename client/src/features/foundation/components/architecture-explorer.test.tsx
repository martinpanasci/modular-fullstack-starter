import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { ArchitectureLayers } from '../types/architecture';
import { ArchitectureExplorer } from './architecture-explorer';

const layers: ArchitectureLayers = [
  {
    id: 'app',
    name: 'App',
    path: 'src/app',
    summary: 'Routing y composición',
    includes: ['rutas'],
    avoids: 'lógica de negocio',
  },
  {
    id: 'features',
    name: 'Features',
    path: 'src/features',
    summary: 'Dominios encapsulados',
    includes: ['componentes'],
    avoids: 'imports internos',
  },
];

describe('ArchitectureExplorer', () => {
  it('lets the user inspect another layer', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer layers={layers} />);

    expect(screen.getByText('Routing y composición')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Features' }));

    expect(screen.getByText('Dominios encapsulados')).toBeInTheDocument();
    expect(
      screen.getByText(/src\/features contiene componentes/i),
    ).toBeInTheDocument();
  });
});
