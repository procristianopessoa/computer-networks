import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Frame, Caption, colors, clamp } from "./Design";
export const Diagnosis = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const stage = Math.min(2, Math.floor(t / 20));
  const labels =
    stage === 0
      ? ["Quem é afetado?", "Qual serviço?", "Desde quando?", "O que mudou?"]
      : stage === 1
        ? ["Enlace e VLAN", "IP e gateway", "DNS e caminho", "TCP e aplicação"]
        : ["Uma mudança", "Repetir o teste", "Conferir serviço", "Documentar"];
  return (
    <Frame
      number="12"
      title={
        stage === 0
          ? "Transformar sintoma em escopo"
          : stage === 1
            ? "Coletar evidências que distinguem causas"
            : "Corrigir, validar e registrar"
      }
      subtitle="Um teste por vez. Uma conclusão proporcional ao que foi observado."
    >
      <div style={{ display: "flex", gap: 30, marginTop: 70 }}>
        {labels.map((label, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              height: 260,
              background: colors.panel,
              border: `2px solid ${i === 2 ? colors.cyan : colors.green}`,
              borderRadius: 25,
              padding: 30,
              opacity: interpolate(
                f,
                [(stage * 20 + i * 2) * fps, (stage * 20 + i * 2 + 1) * fps],
                [0.15, 1],
                clamp,
              ),
            }}
          >
            <span style={{ fontSize: 60, color: colors.green }}>0{i + 1}</span>
            <h2 style={{ fontSize: 36, lineHeight: 1.3 }}>{label}</h2>
          </div>
        ))}
      </div>
      <p
        style={{
          position: "absolute",
          left: 30,
          right: 30,
          top: 395,
          fontSize: 31,
          color: colors.muted,
        }}
      >
        {stage === 0
          ? "“Um usuário não acessa HTTPS por nome” é mais útil que “a rede caiu”."
          : stage === 1
            ? "Ping pode ser filtrado. DNS resolvido não garante aplicação. TCP aberto não garante login."
            : "Repita o teste que falhou e confirme o serviço esperado, sem alterar várias variáveis ao mesmo tempo."}
      </p>
      <Caption>
        {stage === 0
          ? "Registre usuário, horário, destino, mensagem e alcance do problema. Compare com uma referência funcional."
          : stage === 1
            ? "Observe interface → configuração → caminho/retorno → nomes → serviço. Adapte a ordem às evidências."
            : "Registre causa, ação, validação e reversão. Nunca inclua senhas no relatório do incidente."}
      </Caption>
    </Frame>
  );
};
