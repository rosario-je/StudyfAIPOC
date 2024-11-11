import { useState } from "react";
import pdfToText from 'react-pdftotext'

const UserInput = () => {
  const [file, setFile] = useState(null);
  const [pdfText, setPDFText] = useState(null);

  const handlePDF = (e) => {
    setFile(e.target.files[0]);
  }

  const handlePDFText = () => {
    pdfToText(file)
      .then(text => setPDFText(text))
      .catch(error => console.error("Failed to extract text from PDF", error))
  }

  

  console.log(file)
  return (
    <section>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Upload a PDF document of your notes</span>
        </div>
        <input onChange={handlePDF}
          type="file"
          accept="application/pdf"
          className="file-input file-input-bordered w-full max-w-xs"
          name="pdfFile"
        />
        <div className="label">
          <span className="label-text-alt">PDFs only for now...</span>
        </div>
      </label>
      <button className="btn" onClick={handlePDFText}>
        <h1>Summarize Notes</h1>
      </button>
    </section>
  );
};

export default UserInput;
