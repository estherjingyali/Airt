import { useState } from 'react';
import './Submit.css';

const Submit = ({ addImage }) => {
    const [uploadStatus, setUploadStatus] = useState(null);
    const [imageName, setImageName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileSelect = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setSelectedFile(selectedFile);

        setUploadStatus('Uploading...');
        setTimeout(() => {
            setUploadStatus(`File "${selectedFile.name}" uploaded successfully!`);
            addImage(selectedFile, imageName);
            setTimeout(() => {
                setUploadStatus(null);
            }, 2000); 
        }, 1000);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        addImage(selectedFile, imageName);
        setTimeout(() =>{
            setUploadStatus(`Your project submitted successfully!`);
        }, 2000);

        //clean status
        setImageName('');
        setSelectedFile(null);
    };

    return (
        <div className="submit-container">
            <form onSubmit={handleFormSubmit}>
                <label>
                    Project Name: 
                    <input
                        type="text"
                        value={imageName}
                        onChange={(e) => setImageName(e.target.value)}
                    />
                </label>
                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                <button type="button" onClick={handleFileSelect} className="submit-button">Select File</button>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default Submit;
