import type {
  ArchitectureLayer,
  ArchitectureLayerId,
  ArchitectureLayers,
} from '../types/architecture';

export function getLayerById(
  layers: ArchitectureLayers,
  id: ArchitectureLayerId,
): ArchitectureLayer {
  return layers.find((layer) => layer.id === id) ?? layers[0];
}

export function getLayerGuidance(layer: ArchitectureLayer): string {
  const contents = new Intl.ListFormat('es', {
    style: 'long',
    type: 'conjunction',
  }).format(layer.includes);

  return `${layer.path} contiene ${contents}. Evitá ${layer.avoids}.`;
}
