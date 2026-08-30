import {
  CATEGORIAS,
  nombreCategoria,
  textoVisible,
  type Producto,
} from "./tipos";

export const CAMPOS_FILTRO = [
  "categoria",
  "subcategoria",
  "genero",
  "color",
  "talla",
] as const;

export type CampoFiltro = (typeof CAMPOS_FILTRO)[number];
export type CampoActivo = CampoFiltro | "q";

export interface FiltrosCatalogo {
  q: string;
  categoria: string[];
  subcategoria: string[];
  genero: string[];
  color: string[];
  talla: string[];
}

export interface OpcionFiltro {
  valor: string;
  etiqueta: string;
  total: number;
}

export interface FiltroActivo {
  campo: CampoActivo;
  valor: string;
  etiqueta: string;
}

type SearchParamsLike = Pick<URLSearchParams, "get" | "getAll">;

export function filtrosVacios(): FiltrosCatalogo {
  return {
    q: "",
    categoria: [],
    subcategoria: [],
    genero: [],
    color: [],
    talla: [],
  };
}

export function normalizarTexto(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function valoresUnicos(valores: string[]): string[] {
  const vistos = new Set<string>();
  const resultado: string[] = [];

  for (const valor of valores) {
    const limpio = valor.trim();
    const clave = normalizarTexto(limpio);
    if (!clave || vistos.has(clave)) continue;
    vistos.add(clave);
    resultado.push(limpio);
  }

  return resultado;
}

function valoresDesdeParams(
  searchParams: SearchParamsLike,
  nombre: CampoFiltro,
): string[] {
  return valoresUnicos(searchParams.getAll(nombre));
}

export function leerFiltros(searchParams: SearchParamsLike): FiltrosCatalogo {
  return {
    q: searchParams.get("q")?.trim() ?? "",
    categoria: valoresDesdeParams(searchParams, "categoria"),
    subcategoria: valoresDesdeParams(searchParams, "subcategoria"),
    genero: valoresDesdeParams(searchParams, "genero"),
    color: valoresDesdeParams(searchParams, "color"),
    talla: valoresDesdeParams(searchParams, "talla"),
  };
}

export function serializarFiltros(
  filtros: FiltrosCatalogo,
  incluirCategoria = true,
): string {
  const params = new URLSearchParams();
  const q = filtros.q.trim();

  if (q) params.set("q", q);

  for (const campo of CAMPOS_FILTRO) {
    if (campo === "categoria" && !incluirCategoria) continue;
    for (const valor of valoresUnicos(filtros[campo])) {
      params.append(campo, valor);
    }
  }

  return params.toString();
}

function valoresProducto(producto: Producto, campo: CampoFiltro): string[] {
  switch (campo) {
    case "categoria":
      return [producto.categoria];
    case "subcategoria":
      return [producto.subcategoria];
    case "genero":
      return [producto.genero];
    case "color":
      return producto.colores;
    case "talla":
      return producto.tallas;
  }
}

function coincideSeleccion(
  producto: Producto,
  campo: CampoFiltro,
  seleccion: string[],
): boolean {
  if (seleccion.length === 0) return true;

  const valores = valoresProducto(producto, campo).map(normalizarTexto);
  return seleccion.some((valor) => valores.includes(normalizarTexto(valor)));
}

function textoBuscable(producto: Producto): string {
  return normalizarTexto(
    [
      producto.nombre,
      producto.nombreInterno,
      producto.categoria,
      nombreCategoria(producto.categoria),
      producto.subcategoria,
      producto.genero,
      ...producto.colores,
      ...producto.tallas,
    ].join(" "),
  );
}

export function filtrarProductos(
  productos: Producto[],
  filtros: FiltrosCatalogo,
  opciones: { incluirCategoria?: boolean } = {},
): Producto[] {
  const incluirCategoria = opciones.incluirCategoria ?? true;
  const q = normalizarTexto(filtros.q);

  return productos.filter((producto) => {
    if (q && !textoBuscable(producto).includes(q)) return false;

    for (const campo of CAMPOS_FILTRO) {
      if (campo === "categoria" && !incluirCategoria) continue;
      if (!coincideSeleccion(producto, campo, filtros[campo])) return false;
    }

    return true;
  });
}

export function etiquetaCampo(campo: CampoActivo): string {
  switch (campo) {
    case "q":
      return "Búsqueda";
    case "categoria":
      return "Categoría";
    case "subcategoria":
      return "Tipo de producto";
    case "genero":
      return "Género";
    case "color":
      return "Color";
    case "talla":
      return "Talla";
  }
}

function etiquetaValor(campo: CampoActivo, valor: string): string {
  if (campo === "q") return valor;
  if (campo === "categoria") {
    const etiqueta = nombreCategoria(valor);
    return etiqueta === "Catálogo"
      ? textoVisible(valor.replace(/-/g, " "))
      : etiqueta;
  }
  return textoVisible(valor);
}

export function filtrosActivos(
  filtros: FiltrosCatalogo,
  incluirCategoria = true,
): FiltroActivo[] {
  const resultado: FiltroActivo[] = [];

  if (filtros.q.trim()) {
    resultado.push({
      campo: "q",
      valor: filtros.q.trim(),
      etiqueta: `${etiquetaCampo("q")}: ${filtros.q.trim()}`,
    });
  }

  for (const campo of CAMPOS_FILTRO) {
    if (campo === "categoria" && !incluirCategoria) continue;
    for (const valor of filtros[campo]) {
      resultado.push({
        campo,
        valor,
        etiqueta: `${etiquetaCampo(campo)}: ${etiquetaValor(campo, valor)}`,
      });
    }
  }

  return resultado;
}

export function cantidadFiltrosActivos(
  filtros: FiltrosCatalogo,
  incluirCategoria = true,
): number {
  return filtrosActivos(filtros, incluirCategoria).length;
}

export function quitarFiltro(
  filtros: FiltrosCatalogo,
  activo: FiltroActivo,
): FiltrosCatalogo {
  if (activo.campo === "q") return { ...filtros, q: "" };

  return {
    ...filtros,
    [activo.campo]: filtros[activo.campo].filter(
      (valor) => normalizarTexto(valor) !== normalizarTexto(activo.valor),
    ),
  };
}

export function obtenerOpcionesFiltro(
  productos: Producto[],
  filtros: FiltrosCatalogo,
  campo: CampoFiltro,
  incluirCategoria = true,
): OpcionFiltro[] {
  const filtrosSinCampo: FiltrosCatalogo = {
    ...filtros,
    [campo]: [],
  };
  const base = filtrarProductos(productos, filtrosSinCampo, {
    incluirCategoria,
  });
  const valores = new Map<string, string>();

  for (const producto of base) {
    for (const valor of valoresProducto(producto, campo)) {
      const limpio = valor.trim();
      const clave = normalizarTexto(limpio);
      if (clave && !valores.has(clave)) valores.set(clave, limpio);
    }
  }

  for (const valor of filtros[campo]) {
    const limpio = valor.trim();
    const clave = normalizarTexto(limpio);
    if (clave && !valores.has(clave)) valores.set(clave, limpio);
  }

  const opciones = [...valores.values()].map((valor) => ({
    valor,
    etiqueta: etiquetaValor(campo, valor),
    total: base.filter((producto) =>
      valoresProducto(producto, campo).some(
        (item) => normalizarTexto(item) === normalizarTexto(valor),
      ),
    ).length,
  }));

  const ordenCategorias = new Map<string, number>(
    CATEGORIAS.map((categoria, index) => [categoria.slug, index]),
  );

  return opciones.sort((a, b) => {
    if (campo === "categoria") {
      return (
        (ordenCategorias.get(a.valor) ?? Number.MAX_SAFE_INTEGER) -
          (ordenCategorias.get(b.valor) ?? Number.MAX_SAFE_INTEGER) ||
        a.etiqueta.localeCompare(b.etiqueta, "es")
      );
    }
    return a.etiqueta.localeCompare(b.etiqueta, "es");
  });
}
