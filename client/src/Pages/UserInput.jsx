import { useState } from "react";
import pdfToText from 'react-pdftotext'
import axios from 'axios'

const UserInput = () => {
  const [file, setFile] = useState(null);
  const [pdfText, setPDFText] = useState(null);

  //step 1 - get the user file
  const handlePDF = (e) => {
    setFile(e.target.files[0]);
  }

  //Step 2 - handle Summarize Notes button
  const handlePDFText = async () => {
    try {
      const text = await pdfToText(file); 
      console.log(text); 
      setPDFText(text);
      await handlePDFUpload(text); 
    } catch (error) {
      console.error("Failed to extract text from PDF", error);
    }
  };
  
  //Step 3 - send the text to the server
  const handlePDFUpload = async (text) => {
    try {
      const response = await axios.post('/api/pdfUpload', { pdfContent: text });
      console.log(response.data);
    } catch (error) {
      console.error("Failed to upload PDF", error);
    }
  };

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
