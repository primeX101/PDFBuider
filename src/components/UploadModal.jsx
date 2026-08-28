import React, { useRef, useState } from 'react';
import { CloudUpload, X } from 'lucide-react';

export default function UploadModal({ accept, label, multiple, onClose, onFiles }) {
  const input = useRef();
  const [drag, setDrag] = useState(false);

  return (
    <div className="overlay" onMouseDown={onClose}>
      <section className="upload-modal" onMouseDown={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}><X size={20} /></button>
        <div className="modal-badge"><CloudUpload size={22} /></div>
        <h2>Add {label}</h2>
        <p>They are processed locally and never leave your device.</p>
        <button
          className={'dropzone ' + (drag ? 'dragging' : '')}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); onFiles(e.dataTransfer.files); }}
          onClick={() => input.current.click()}
        >
          <input ref={input} type="file" accept={accept} multiple={multiple} onChange={e => onFiles(e.target.files)} />
          <CloudUpload size={28} />
          <b>Drop files here</b>
          <span>or click to browse your device</span>
        </button>
      </section>
    </div>
  );
}
