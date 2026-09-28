import { describe, expect, it } from 'vitest';

import type { ArchitectureLayers } from '../types/architecture';
import { getLayerById, getLayerGuidance } from './get-layer-guidance';

const layers: ArchitectureLayers = [
  {
    id: 'app',
    name: 'App',
    path: 'src/app',
    summary: 'Routing',
    includes: ['rutas', 'layouts'],
    avoids: 'lógica de negocio',
  },
];

describe('architecture guidance', () => {
  it('builds guidance from a layer definition', () => {
    expect(getLayerGuidance(layers[0])).toBe(
      'src/app contiene rutas y layouts. Evitá lógica de negocio.',
    );
  });

  it('falls back to the first layer for an unknown runtime value', () => {
    expect(getLayerById(layers, 'shared')).toEqual(layers[0]);
  });
});
