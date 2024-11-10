import { useState } from "react";


const UserInput = () => {
  const [file, setFile] = useState(null);


  console.log(file)
  return (
    <section>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Upload a PDF document of your notes</span>
        </div>
        <input onChange={(e) => this.set({selectedFile: e.target.files[0]})}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <div className="label">
          <span className="label-text-alt">PDFs only for now...</span>
        </div>
      </label>
      <button className="btn">
        <h1>Summarize Notes</h1>
      </button>
    </section>
  );
};

export default UserInput;
