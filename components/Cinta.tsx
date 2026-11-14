const SERVICIOS = ["Páginas web", "Apps Android y iPhone", "Sistemas a medida", "Dominios .pe y .com", "Correo corporativo", "Asistentes con IA"];

/** Cinta inclinada con los servicios en movimiento (la lista va dos veces para que el bucle no tenga cortes). */
export function Cinta() {
  return (
    <div className="tape" aria-hidden="true">
      <div className="tape__in">
        {[...SERVICIOS, ...SERVICIOS].map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  );
}
