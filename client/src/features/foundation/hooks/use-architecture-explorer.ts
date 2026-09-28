'use client';

import { useState } from 'react';

import { getLayerById } from '../lib/get-layer-guidance';
import type {
  ArchitectureLayerId,
  ArchitectureLayers,
} from '../types/architecture';

export function useArchitectureExplorer(layers: ArchitectureLayers) {
  const [activeId, setActiveId] = useState<ArchitectureLayerId>(layers[0].id);

  return {
    activeId,
    activeLayer: getLayerById(layers, activeId),
    selectLayer: setActiveId,
  };
}
