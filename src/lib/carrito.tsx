"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ItemCarrito } from "./whatsapp";

const CLAVE = "horsepower.carrito.v1";

// --- store externo sobre localStorage ---
let memoria: ItemCarrito[] = [];
let hidratado = false;
const oyentes = new Set<() => void>();

function leerStorage(): ItemCarrito[] {
  try {
    const raw = localStorage.getItem(CLAVE);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function escribir(items: ItemCarrito[]) {
  memoria = items;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(items));
  } catch {
    /* almacenamiento no disponible */
  }
  oyentes.forEach((fn) => fn());
}

function suscribir(fn: () => void): () => void {
  if (!hidratado) {
    hidratado = true;
    memoria = leerStorage();
  }
  oyentes.add(fn);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CLAVE) {
      memoria = leerStorage();
      fn();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    oyentes.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

const VACIO: ItemCarrito[] = [];
const getSnapshot = () => memoria;
const getServerSnapshot = (): ItemCarrito[] => VACIO;

// --- API pública ---
interface CarritoCtx {
  items: ItemCarrito[];
  cantidadTotal: number;
  agregar: (item: ItemCarrito) => void;
  quitar: (idx: number) => void;
  cambiarCantidad: (idx: number, cantidad: number) => void;
  vaciar: () => void;
  listo: boolean;
}

const Ctx = createContext<CarritoCtx | null>(null);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(suscribir, getSnapshot, getServerSnapshot);
  const listo = useSyncExternalStore(
    suscribir,
    () => hidratado,
    () => false,
  );

  const agregar = useCallback((item: ItemCarrito) => {
    const prev = memoria;
    const i = prev.findIndex(
      (x) =>
        x.slug === item.slug &&
        x.color === item.color &&
        x.talla === item.talla,
    );
    if (i >= 0) {
      const copia = [...prev];
      copia[i] = { ...copia[i], cantidad: copia[i].cantidad + item.cantidad };
      escribir(copia);
    } else {
      escribir([...prev, item]);
    }
  }, []);

  const quitar = useCallback((idx: number) => {
    escribir(memoria.filter((_, i) => i !== idx));
  }, []);

  const cambiarCantidad = useCallback((idx: number, cantidad: number) => {
    escribir(
      memoria
        .map((x, i) => (i === idx ? { ...x, cantidad } : x))
        .filter((x) => x.cantidad > 0),
    );
  }, []);

  const vaciar = useCallback(() => escribir([]), []);

  const value = useMemo<CarritoCtx>(
    () => ({
      items,
      cantidadTotal: items.reduce((s, x) => s + x.cantidad, 0),
      agregar,
      quitar,
      cambiarCantidad,
      vaciar,
      listo,
    }),
    [items, listo, agregar, quitar, cambiarCantidad, vaciar],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCarrito(): CarritoCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}
