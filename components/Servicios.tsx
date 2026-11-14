import { Icon } from "./Icons";
import { Tile } from "./Tile";
import { FlutedGlass } from "./FlutedGlass";
import { BubblesMock, ChecklistMock, DashMock, DomainMock, InboxMock, PhoneMock, SearchMock } from "./mocks/Mocks";

export function Servicios() {
  return (
    <section className="sec" id="servicios" aria-labelledby="svc-h">
      <div className="wrap">
        <div className="head rv">
          <h2 id="svc-h">Todo lo que tu negocio necesita en internet</h2>
          <p>Webs, apps, sistemas, dominio y correo corporativo: un solo equipo para todo, con cotización sin costo.</p>
        </div>
        <div className="bento">
          <FlutedGlass as="article" seed={45} className="svc-web c-6 r-2">
            <span className="kicker">Páginas web</span>
            <h3>Páginas web a medida</h3>
            <p>Diseño propio, sin plantillas genéricas. Pensada para que el cliente termine en tu chat.</p>
            <ChecklistMock />
          </FlutedGlass>

          <Tile as="article" className="svc-app c-6 r-2" id="apps">
            <div className="svc-app__top">
              <div>
                <span className="tile__ico"><Icon id="phone" /></span>
                <h3>Apps para Android y iPhone</h3>
                <p>Tu propia app para que tus clientes compren, reserven o sigan sus pedidos desde el celular.</p>
              </div>
              <div className="stores"><span><Icon id="android" />Google Play</span><span><Icon id="apple" />App Store</span></div>
            </div>
            <PhoneMock />
          </Tile>

          <Tile as="article" className="svc-sys c-7" id="sistemas">
            <span className="tile__ico"><Icon id="sys" /></span>
            <h3>Sistemas a medida</h3>
            <p>Ventas, inventario, reservas, fidelización de clientes: lo que tu negocio necesite, en un sistema hecho para ti.</p>
            <DashMock />
          </Tile>

          <Tile as="article" className="svc-dom c-5" id="dominio">
            <span className="tile__ico"><Icon id="globe" /></span>
            <h3>Tu dominio propio</h3>
            <p>Te ayudamos a elegir y registrar tu nombre en internet.</p>
            <DomainMock />
          </Tile>

          <Tile as="article" className="svc-mail c-6" id="correo">
            <span className="tile__ico"><Icon id="mail" /></span>
            <h3>Correo corporativo</h3>
            <p>Deja el Gmail personal. Configuramos tu dominio con 4 correos, listos en tu celular y tu computadora.</p>
            <span className="price-chip">S/ 550 · dominio + 4 correos · primer año</span>
            <InboxMock />
          </Tile>

          <Tile as="article" className="c-3">
            <span className="tile__ico"><Icon id="wa" /></span>
            <h3>Directo a tu WhatsApp</h3>
            <BubblesMock />
          </Tile>

          <Tile as="article" className="c-3">
            <span className="tile__ico"><Icon id="search" /></span>
            <h3>Lista para Google</h3>
            <SearchMock />
          </Tile>
        </div>
      </div>
    </section>
  );
}
