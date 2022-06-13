import * as React from 'react';
import { useState } from "react";
import FileUpload from "react-material-file-upload";

export default function ImagesForm() {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <div className="App">
            <FileUpload value={files} onChange={setFiles} />
        </div>

    );
}