'use client';

import { classNames } from '@/shared/lib/class-names';

import { useArchitectureExplorer } from '../hooks/use-architecture-explorer';
import { getLayerGuidance } from '../lib/get-layer-guidance';
import type { ArchitectureLayers } from '../types/architecture';

type ArchitectureExplorerProps = Readonly<{
  layers: ArchitectureLayers;
}>;

export function ArchitectureExplorer({ layers }: ArchitectureExplorerProps) {
  const { activeId, activeLayer, selectLayer } =
    useArchitectureExplorer(layers);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div
        className="border-b border-slate-200 p-2 sm:flex"
        role="group"
        aria-label="Capas de la arquitectura"
      >
        {layers.map((layer) => {
          const isActive = layer.id === activeId;

          return (
            <button
              aria-controls="layer-detail"
              aria-pressed={isActive}
              className={classNames(
                'w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition sm:text-center',
                isActive
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
              )}
              key={layer.id}
              onClick={() => selectLayer(layer.id)}
              type="button"
            >
              {layer.name}
            </button>
          );
        })}
      </div>
      <div
        className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-start sm:p-8"
        id="layer-detail"
      >
        <div>
          <p className="font-mono text-sm font-semibold text-violet-700">
            {activeLayer.path}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            {activeLayer.summary}
          </h3>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            {getLayerGuidance(activeLayer)}
          </p>
        </div>
        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
          Ejemplo interactivo
        </span>
      </div>
    </div>
  );
}
