import { CrossFader } from "./lib/components/CrossFader.js";
import { useState, useCallback } from "react";
import { useSporeData } from "./lib/hooks/useSporeData.js";
import logo from "./logo.svg";
import "./App.css";
import { SporeEmbed } from "./lib/components/SporeEmbed.js";
import styles from "./styles.module.css";
import bootstrap from "bootstrap";

// A list of songs: grabbed directly from catalog, but could use Zora API here.
let songs = [
  "https://ipfs.io/ipfs/bafybeicghj6slqw7nqpzumn6hg42e37aqp2lfay3yohs3z2ldjyymmyh6m", // YBL 2.0
  "https://ipfs.io/ipfs/bafybeigsxoei5wsienmafmkkw6hamocjdt4e5zjljm3wxzvwgvxmvtjegq", // Purr 2.0
  "https://catalog.mypinata.cloud/ipfs/QmWWwDepZfDKqypi5DXzYzGk7tVCdpDaTPLFSysA3PBRrm", // Dutchyyy
];

let skin =
  "https://zora-dev.mypinata.cloud/ipfs/bafybeia5gfyxfpes2d6h3h34evecrhq4b6itqfxsjm64tllazt47j2vqam?id=15";

let juiceSamples = [
  "https://ipfs.io/ipfs/bafybeida46ln4hrypxyt4igvjmbsakn5hysstepjbfv3qhcrs6ofvi7qai", // Melody 1 🍄 Nate Fox X SPORES 🍄 ETHglobal STEMs 🍄
  "https://ipfs.io/ipfs/bafybeiai6i25mroyjugpof22qxyxlusrpgkdcd3ow6ypagkn2kuvhxo3ty", // Melody 2 🍄 Nate Fox X SPORES 🍄 ETHglobal STEMs 🍄
  "https://ipfs.io/ipfs/bafybeida46ln4hrypxyt4igvjmbsakn5hysstepjbfv3qhcrs6ofvi7qai", // Melody 1 🍄 Nate Fox X SPORES 🍄 ETHglobal STEMs 🍄
];

function App() {
  // mix 2 different songs together:
  // using the main song's bpm (alternate song gets timestretched to match
  // the BPM of main song)

  let [main, setMain] = useState(songs[0]);
  let [alternate, setAlternate] = useState(songs[1]);
  let [crossFadeUI, setCrossFadeUI] = useState(0);

  let {
    isStuttering,
    stutterRate,
    currentStep,
    bpm,
    playing,
    currentBeat,
    progress,
    crossFade,
  } = useSporeData();

  return (
    <div className={styles["test-container"]}>
      <div>BPM: {bpm}</div>
      <div>Current Step: {currentStep}</div>
      <div>Current Beat: {currentBeat}</div>
      <div>Song Progress: {Math.round(progress)}%</div>
      <div>Cross Fade: {crossFade}</div>
      {isStuttering ? <div>Stuttering at 1/{stutterRate} rate</div> : ""}

      <div class="spore">
        <SporeEmbed
          main={main} // url to main track (can be switched w/o interrupting)
          alternate={alternate} // url to alternate track (can be switched w/o interrupting)
          juiceSamples={juiceSamples} // list of URLs to samples
          backgroundColor="black" // background color of Spore itselft
          color="blue" // color of waveform below
          skin={skin} // URL to image to be morphed on skin
          crossFade={crossFadeUI} // set this to override the cross fade between main / alternate (w/o using the Spore)
        />
      </div>
    </div>
  );
}

export default App;

