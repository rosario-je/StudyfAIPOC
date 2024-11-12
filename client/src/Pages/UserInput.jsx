import { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import axios from "axios";
import UserOutput from "./UserOutput";

const UserInput = () => {
  const [file, setFile] = useState(null);
  const [pdfText, setPDFText] = useState(null);
  const [summarizedText, setSummarizedText] = useState(null);

  //step 1 - get the user file
  const handlePDF = (e) => {
    setFile(e.target.files[0]);
  };

  //Step 2 - handle Summarize Notes button
  const handlePDFText = async () => {
    try {
      const text = await pdfToText(file);
      setPDFText(text);
      await handlePDFUpload(text);
    } catch (error) {
      console.error("Failed to extract text from PDF", error);
    }
  };

  //Step 3 - send the text to the server
  const handlePDFUpload = async (text) => {
    try {
      const response = await axios.post("/api/summarize", { pdfContent: text });
      console.log("This is the API call response:", response.data);
      setSummarizedText(response.data);
    } catch (error) {
      console.error("Failed to upload PDF", error);
    }
  };

  useEffect(() => {
    console.log("Summarized Text:", summarizedText);
  }, [summarizedText]);

  return (
    <section>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">
            Upload a PDF document of your notes
          </span>
        </div>
        <input
          onChange={handlePDF}
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
      <h1>Notes Summarized</h1>
      {summarizedText &&
        Object.values(summarizedText).map((topic, index) => (
          <UserOutput key={index} {...topic} />
        ))}
    </section>
  );
};

export default UserInput;
