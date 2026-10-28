import { Mainframes } from "./history/Mainframes";
import { Arpanet } from "./history/Arpanet";
import { Unix } from "./history/Unix";
import { Ncp } from "./history/Ncp";
import { Tcp } from "./history/Tcp";
import { Migration } from "./history/Migration";
import { Osi } from "./history/Osi";
import { Downsizing } from "./history/Downsizing";
import { Web } from "./history/Web";
import { Composition, Folder } from "remotion";
import { History } from "./History";
import { Networks } from "./Networks";
import { Encapsulation } from "./Encapsulation";
import { Signals } from "./Signals";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Aula01-Historia"
        component={History}
        durationInFrames={4860}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Aula02-Redes"
        component={Networks}
        durationInFrames={840}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Aula03-Encapsulamento"
        component={Encapsulation}
        durationInFrames={840}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Aula04-Sinais"
        component={Signals}
        durationInFrames={840}
        fps={30}
        width={1920}
        height={1080}
      />
      <Folder name="Aula01-Cenas">
        <Composition
          id="Historia01-Mainframes"
          component={Mainframes}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia02-Arpanet"
          component={Arpanet}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia03-Unix"
          component={Unix}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia04-Ncp"
          component={Ncp}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia05-Tcp"
          component={Tcp}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia06-Migration"
          component={Migration}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia07-Osi"
          component={Osi}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia08-Downsizing"
          component={Downsizing}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Historia09-Web"
          component={Web}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
