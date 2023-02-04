import React, {ChangeEvent, useState} from 'react';
import {Container} from "@mui/material";
import SpreedDial from "./SpeedDial";
import ModalAuth from "./modalAuth";

function App() {

    const [file, setFile] = useState<File>();
    const [root, setRoot] = useState({})
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    fetch('http://91.193.183.139:7000/drive/folder/root', {
        method: 'GET',
headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`  }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`,
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    return (
        <div className="App">
            <ModalAuth/>
            <Container>
                <input type="file" onChange={handleFileChange}/>

                <div>{file && `${file.name} - ${file.type}`}</div>

                <button onClick={handleUploadClick}>Upload</button>
            </Container>

            <SpreedDial/>

        </div>
    );
}

export default App;
