import React from 'react';
import { FileText, CloudUpload, Plus, X } from 'lucide-react';
import * as engine from '../pdfEngine';

export default function FilePicker({ docs, chosen, setChosen, remove, openPicker, required }) {
  return (
    <section className="file-picker">
      <div className="picker-top">
        <div>
          <b>{required === 2 ? 'Choose two documents' : 'Choose a document'}</b>
          <span>{docs.length ? 'Select files from this workspace or add more.' : 'Add a file to begin.'}</span>
        </div>
        <button onClick={openPicker}><Plus size={15} /> Add files</button>
      </div>
      {docs.length === 0 ? (
        <button className="empty-drop" onClick={openPicker}>
          <CloudUpload size={26} />
          <b>Drop a file here or browse</b>
          <span>Files are never sent to a server</span>
        </button>
      ) : (
        <div className="doc-list">
          {docs.map(doc => (
            <label className={chosen.includes(doc.id) ? 'picked' : ''} key={doc.id}>
              <input
                type={required === 2 ? 'checkbox' : 'radio'}
                name="selected-doc"
                checked={chosen.includes(doc.id)}
                onChange={() => setChosen(c =>
                  required === 2
                    ? (c.includes(doc.id) ? c.filter(x => x !== doc.id) : [...c, doc.id].slice(-2))
                    : [doc.id]
                )}
              />
              <FileText size={18} />
              <span>
                <b>{doc.name}</b>
                <small>{engine.formatBytes(doc.size)}{doc.pages ? ` · ${doc.pages} pages` : ''}</small>
              </span>
              <button onClick={e => { e.preventDefault(); remove(doc.id); }} aria-label={`Remove ${doc.name}`}>
                <X size={15} />
              </button>
            </label>
          ))}
        </div>
      )}
    </section>
  );
}
