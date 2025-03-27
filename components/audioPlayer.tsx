import { useAudioPlayerContext } from "../context/audio-player-context";
import { Audio } from 'expo-av';

const AudioPlayer= () => {

  // We should avoid placing all state data in a global context because every component that consumes the context data will update and re-render unnecessarily.
  // const { currentTrack, setCurrentTrack } = useAudioPlayerContext();
  const { currentTrack } = useAudioPlayerContext(); // currentTrack is Track Object
  // const [openDrawer,setOpenDrawer] = useState(false);
};

