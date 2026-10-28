import { Series, useVideoConfig } from "remotion";
import { Mainframes } from "./history/Mainframes";
import { Arpanet } from "./history/Arpanet";
import { Unix } from "./history/Unix";
import { Ncp } from "./history/Ncp";
import { Tcp } from "./history/Tcp";
import { Migration } from "./history/Migration";
import { Osi } from "./history/Osi";
import { Downsizing } from "./history/Downsizing";
import { Web } from "./history/Web";
export const History = () => {
  const { fps } = useVideoConfig();
  return (
    <Series>
      <Series.Sequence
        name="01 · Mainframes e terminais"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Mainframes />
      </Series.Sequence>
      <Series.Sequence
        name="02 · ARPANET"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Arpanet />
      </Series.Sequence>
      <Series.Sequence
        name="03 · Unix"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Unix />
      </Series.Sequence>
      <Series.Sequence
        name="04 · NCP"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Ncp />
      </Series.Sequence>
      <Series.Sequence
        name="05 · TCP e IP"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Tcp />
      </Series.Sequence>
      <Series.Sequence
        name="06 · Migração de 1983"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Migration />
      </Series.Sequence>
      <Series.Sequence
        name="07 · ISO e modelo OSI"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Osi />
      </Series.Sequence>
      <Series.Sequence
        name="08 · PCs e downsizing"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Downsizing />
      </Series.Sequence>
      <Series.Sequence
        name="09 · Internet e Web"
        durationInFrames={18 * fps}
        premountFor={fps}
      >
        <Web />
      </Series.Sequence>
    </Series>
  );
};
