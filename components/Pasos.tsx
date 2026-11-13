import { Tile } from "./Tile";
import { PublishMock, TogglesMock, WireMock } from "./mocks/Mocks";

export function Pasos() {
  return (
    <section className="sec" id="pasos" aria-labelledby="pasos-h">
      <div className="wrap">
        <div className="head rv">
          <h2 id="pasos-h">Tu proyecto en 3 pasos</h2>
          <p>Tú nos cuentas de tu negocio; nosotros nos encargamos de todo lo técnico.</p>
        </div>
        <div className="bento">
          <Tile as="article" className="step c-4">
            <div className="step__n">Paso <b>1</b></div>
            <h3>Diseñamos tu proyecto</h3>
            <p>Web, app o sistema: ves el diseño y lo apruebas antes de programar.</p>
            <WireMock />
          </Tile>
          <Tile as="article" className="step c-4">
            <div className="step__n">Paso <b>2</b></div>
            <h3>Lo programamos para todo</h3>
            <p>Funciona en Android, iPhone y computadora, que es donde están tus clientes.</p>
            <TogglesMock />
          </Tile>
          <Tile as="article" className="step c-4">
            <div className="step__n">Paso <b>3</b></div>
            <h3>Lo publicamos</h3>
            <p>Con tu propio dominio, como tuempresa.com, o en Google Play y App Store. Y conectado a tu WhatsApp.</p>
            <PublishMock />
          </Tile>
        </div>
      </div>
    </section>
  );
}
