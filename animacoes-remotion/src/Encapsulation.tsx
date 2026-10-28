import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors, clamp } from "./Design";
export const Encapsulation = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const stage = t < 5 ? 0 : t < 10 ? 1 : t < 15 ? 2 : t < 20 ? 3 : 4;
  const layers = [
    { name: "Aplicação", unit: "Dados", color: colors.green },
    { name: "Transporte", unit: "Segmento TCP", color: colors.cyan },
    { name: "Internet", unit: "Pacote IP", color: colors.amber },
    { name: "Enlace", unit: "Quadro Ethernet", color: "#c5a1ff" },
    { name: "Física", unit: "Sinais no meio", color: "#f5a5b7" },
  ];
  return (
    <Frame
      number="03"
      title="Uma mensagem, várias responsabilidades"
      subtitle="Encapsulamento: exemplo com TCP, IP e Ethernet."
    >
      <div style={{ position: "absolute", left: 0, top: 0, width: 440 }}>
        {layers.map((l, i) => (
          <div
            key={l.name}
            style={{
              display: "flex",
              alignItems: "center",
              height: 82,
              marginBottom: 15,
              padding: "0 28px",
              borderRadius: 16,
              background: stage === i ? l.color : colors.panel,
              color: stage === i ? colors.bg : colors.muted,
              fontSize: 31,
              fontWeight: 700,
              opacity: interpolate(
                f,
                [i * 5 * fps, (i * 5 + 0.7) * fps],
                [0.35, 1],
                clamp,
              ),
            }}
          >
            {String(i + 1).padStart(2, "0")} / {l.name}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 530, right: 0, top: 55 }}>
        <div
          style={{
            color: layers[stage].color,
            fontSize: 25,
            letterSpacing: 3,
            marginBottom: 30,
          }}
        >
          UNIDADE NESTA ETAPA
        </div>
        <h2 style={{ fontSize: 49, margin: "0 0 48px" }}>
          {layers[stage].unit}
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            height: 140,
            gap: 7,
          }}
        >
          {stage >= 3 && (
            <div
              style={{
                padding: "22px 16px",
                background: "#c5a1ff",
                color: colors.bg,
                fontSize: 25,
                borderRadius: 12,
              }}
            >
              Cabeçalho
              <br />
              Ethernet
            </div>
          )}
          {stage >= 2 && (
            <div
              style={{
                padding: "22px",
                background: colors.amber,
                color: colors.bg,
                fontSize: 25,
                borderRadius: 12,
              }}
            >
              Cabeçalho
              <br />
              IP
            </div>
          )}
          {stage >= 1 && (
            <div
              style={{
                padding: "22px",
                background: colors.cyan,
                color: colors.bg,
                fontSize: 25,
                borderRadius: 12,
              }}
            >
              Cabeçalho
              <br />
              TCP
            </div>
          )}
          <div
            style={{
              padding: 30,
              background: colors.green,
              color: colors.bg,
              fontSize: 32,
              borderRadius: 12,
              flex: 1,
              textAlign: "center",
            }}
          >
            DADOS
          </div>
          {stage >= 3 && (
            <div
              style={{
                padding: "22px 12px",
                background: "#c5a1ff",
                color: colors.bg,
                fontSize: 25,
                borderRadius: 12,
              }}
            >
              FCS
            </div>
          )}
        </div>
        <p
          style={{
            color: colors.muted,
            fontSize: 28,
            lineHeight: 1.5,
            marginTop: 35,
          }}
        >
          {stage === 4
            ? "01001000  01101001 → codificação → sinal físico"
            : stage === 3
              ? "O quadro transporta o pacote no enlace local."
              : stage === 2
                ? "IP identifica origem e destino entre redes."
                : stage === 1
                  ? "TCP adiciona informações de transporte."
                  : "A aplicação produz a mensagem que será enviada."}
        </p>
      </div>
      <Caption>
        {stage === 4
          ? "No destino, ocorre o processo inverso: as camadas interpretam e removem os respectivos cabeçalhos."
          : "Cada camada acrescenta suas informações de controle e preserva os dados recebidos da camada superior."}
      </Caption>
    </Frame>
  );
};
