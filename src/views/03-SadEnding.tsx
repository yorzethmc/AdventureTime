import { sfxClick } from '../utils/audio';

interface Props {
  onRetry: () => void;
}

const SadEnding = ({ onRetry }: Props) => {
  return (
    <div className="rpg-panel fade-in flex-column flex-center text-center">
      <div style={{ fontSize: '4rem', filter: 'grayscale(100%)', marginBottom: '20px' }}>
        🌧️
      </div>
      
      <h2 style={{ color: '#868e96' }}>SAD ENDING desbloqueado</h2>
      
      <p className="text-pixel mb-3" style={{ color: '#adb5bd', lineHeight: '1.8' }}>
        La misión no fue aceptada esta vez...<br/>
        pero el mapa queda guardado por si algún día querés intentarlo de nuevo.
      </p>

      <div className="flex-column gap-3 mt-3 w-100">
        <button className="btn-retro" onClick={() => { sfxClick(); onRetry(); }}>
          Volver a intentarlo
        </button>
        <button className="btn-retro evasive" onClick={() => window.close()}>
          Cerrar aventura
        </button>
      </div>
    </div>
  );
};

export default SadEnding;
