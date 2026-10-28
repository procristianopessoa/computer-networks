import { useCurrentFrame, useVideoConfig } from "remotion";
import { Frame, Caption, colors } from "./Design";
export const Subnetting = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stage = Math.min(2, Math.floor(f / fps / 20));
  return (
    <Frame
      number="09"
      title={
        stage === 0
          ? "Um /24 pode formar quatro /26"
          : stage === 1
            ? "Onde está 192.168.10.77/26?"
            : "Rede, hosts e broadcast"
      }
      subtitle="192.168.10.0/24 · cálculo do intervalo pelo prefixo."
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 50,
          display: "flex",
          gap: 20,
        }}
      >
        {[0, 64, 128, 192].map((start, i) => (
          <div
            key={start}
            style={{
              flex: 1,
              padding: 30,
              height: 250,
              border: `3px solid ${stage > 0 && i === 1 ? colors.green : colors.line}`,
              borderRadius: 25,
              background: stage > 0 && i === 1 ? "#15503b" : colors.panel,
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 700 }}>.{start}/26</div>
            <p style={{ fontSize: 29 }}>
              Intervalo
              <br />.{start} – .{start + 63}
            </p>
            <div style={{ fontSize: 28, color: colors.cyan }}>64 endereços</div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 30,
          right: 30,
          fontSize: 36,
        }}
      >
        {stage === 0
          ? "2 bits adicionais → 4 blocos iguais · máscara 255.255.255.192"
          : stage === 1
            ? "77 pertence ao intervalo 64–127 → rede 192.168.10.64/26"
            : "Rede .64 · hosts .65–.126 · broadcast .127 → 62 utilizáveis"}
      </div>
      <Caption>
        {stage === 0
          ? "O número total de endereços permanece 256. A divisão muda os limites de cada bloco."
          : stage === 1
            ? "IP AND máscara calcula a rede; completar os bits de host com 1 calcula o broadcast."
            : "Exemplo de LAN convencional. O gateway ocupa um endereço utilizável; /31 e /32 têm usos específicos."}
      </Caption>
    </Frame>
  );
};
export const Vlsm = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stage = Math.min(2, Math.floor(f / fps / 20));
  const groups = [
    { start: 0, last: 127, prefix: 25, need: 100, w: 810, c: colors.green },
    { start: 128, last: 191, prefix: 26, need: 50, w: 405, c: colors.cyan },
    { start: 192, last: 223, prefix: 27, need: 20, w: 240, c: colors.amber },
    { start: 224, last: 255, prefix: 27, need: 0, w: 240, c: "#c5a1ff" },
  ];
  return (
    <Frame
      number="10"
      title={
        stage === 0
          ? "Primeiro, dimensionar a demanda"
          : stage === 1
            ? "Depois, alocar blocos alinhados"
            : "Por fim, conferir e reservar"
      }
      subtitle="Base: 192.168.20.0/24 · demandas de interfaces já incluem os gateways."
    >
      <div style={{ display: "flex", gap: 10, marginTop: 65 }}>
        {groups.map((g, i) => (
          <div
            key={g.start}
            style={{
              width: g.w,
              padding: 25,
              height: 290,
              background: g.c,
              color: colors.bg,
              borderRadius: 20,
              opacity: stage === 0 && i === 3 ? 0.25 : 1,
            }}
          >
            <strong style={{ fontSize: 48 }}>/{g.prefix}</strong>
            <p style={{ fontSize: 27, lineHeight: 1.5 }}>
              {g.need ? g.need + " interfaces" : "Reserva"}
              <br />.{g.start}–.{g.last}
            </p>
            <div style={{ fontSize: 25 }}>
              {g.last - g.start - 1} utilizáveis
            </div>
          </div>
        ))}
      </div>
      <Caption>
        {stage === 0
          ? "Escolha o menor bloco que atende 2ʰ − 2 ≥ demanda. Um /27 atende 30 interfaces, não 32."
          : stage === 1
            ? "Maior primeiro facilita o plano. Cada bloco começa em um limite válido e permanece dentro da base."
            : "Alocados: 224 endereços. Reserva: 32 endereços (.224/27). Os intervalos não se sobrepõem."}
      </Caption>
    </Frame>
  );
};
