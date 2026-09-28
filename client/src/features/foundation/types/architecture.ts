export type ArchitectureLayerId = 'app' | 'features' | 'shared';

export type ArchitectureLayer = Readonly<{
  id: ArchitectureLayerId;
  name: string;
  path: string;
  summary: string;
  includes: readonly string[];
  avoids: string;
}>;

export type ArchitectureLayers = readonly [
  ArchitectureLayer,
  ...ArchitectureLayer[],
];

export type RouteExample = Readonly<{
  href: string;
  label: string;
  access: 'Pública' | 'Privada';
  description: string;
}>;
