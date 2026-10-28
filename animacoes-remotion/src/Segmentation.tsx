import { useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors } from "./Design";
export const Segmentation = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const stage = Math.min(2, Math.floor(t / 20));
  const p = (t % 4) / 4;
  return (
    <Frame
      number="08"
      title={
        stage === 0
          ? "Broadcast fica no seu domínio"
          : stage === 1
            ? "Prefixos definem blocos de endereços"
            : "VLSM ajusta os blocos à demanda"
      }
      subtitle={
        stage === 0
          ? "VLAN 10 e VLAN 20 precisam de encaminhamento L3 para comunicação entre redes."
          : stage === 1
            ? "CIDR descreve o tamanho do prefixo; não cria VLAN automaticamente."
            : "O plano IP e as políticas de segmentação precisam concordar."
      }
    >
      {stage === 0 ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 20,
              top: 50,
              width: 650,
              height: 320,
              border: `3px solid ${colors.green}`,
              borderRadius: 25,
              padding: 30,
            }}
          >
            <h2 style={{ fontSize: 40, color: colors.green }}>VLAN 10</h2>
            <p style={{ fontSize: 30 }}>Origem → broadcast local</p>
            <div
              style={{
                position: "absolute",
                left: 100 + p * 400,
                top: 230,
                width: 30,
                height: 30,
                borderRadius: 20,
                background: colors.green,
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 760,
              top: 150,
              fontSize: 42,
              color: colors.amber,
              textAlign: "center",
            }}
          >
            L3
            <br />
            <span style={{ fontSize: 25 }}>Rotas + políticas</span>
          </div>
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 50,
              width: 650,
              height: 320,
              border: `3px solid ${colors.cyan}`,
              borderRadius: 25,
              padding: 30,
            }}
          >
            <h2 style={{ fontSize: 40, color: colors.cyan }}>VLAN 20</h2>
            <p style={{ fontSize: 30 }}>Outro domínio de broadcast</p>
          </div>
        </>
      ) : stage === 1 ? (
        <div style={{ padding: "40px 60px" }}>
          <h2 style={{ fontSize: 55 }}>192.168.10.0/24</h2>
          <div style={{ display: "flex", gap: 8, marginTop: 45 }}>
            <div
              style={{
                background: colors.green,
                color: colors.bg,
                padding: 35,
                width: 1150,
                fontSize: 38,
                borderRadius: 15,
              }}
            >
              24 bits de prefixo
            </div>
            <div
              style={{
                background: colors.cyan,
                color: colors.bg,
                padding: 35,
                flex: 1,
                fontSize: 38,
                borderRadius: 15,
              }}
            >
              8 bits
            </div>
          </div>
          <p style={{ fontSize: 32 }}>
            2⁸ = 256 endereços totais · 254 utilizáveis na LAN convencional
          </p>
        </div>
      ) : (
        <div style={{ padding: 50 }}>
          <h2 style={{ fontSize: 43 }}>192.168.20.0/24</h2>
          <div style={{ display: "flex", marginTop: 50, gap: 8 }}>
            {[
              { name: "/25", text: "100 interfaces", w: 760, c: colors.green },
              { name: "/26", text: "50 interfaces", w: 380, c: colors.cyan },
              { name: "/27", text: "20 interfaces", w: 245, c: colors.amber },
              { name: "/27", text: "reserva", w: 245, c: "#c5a1ff" },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  width: b.w,
                  height: 175,
                  padding: 25,
                  background: b.c,
                  color: colors.bg,
                  borderRadius: 15,
                }}
              >
                <strong style={{ fontSize: 48 }}>{b.name}</strong>
                <p style={{ fontSize: 25 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Caption>
        {stage === 0
          ? "Um switch full duplex separa enlaces e evita colisões normais; VLANs delimitam os domínios de broadcast."
          : stage === 1
            ? "O prefixo permite calcular rede, intervalo e broadcast. /31 ponto a ponto e /32 exigem interpretação específica."
            : "Demandas incluem gateways. Os blocos são alinhados e não se sobrepõem; uma VLAN sozinha não é firewall."}
      </Caption>
    </Frame>
  );
};
