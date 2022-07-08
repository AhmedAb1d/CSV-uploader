import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Banner from './Banner.js'
import logo from './dnd.png'

function  FileUpload () {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData);
      } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    
      <div>
      <Banner />
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div>
          <div><img src={logo} alt='drag and drop' className='logo' /></div>
          <input type='file' id='fileupload' Style='display:none' onChange={onChange}/>
          <label htmlFor='fileupload' className='field' >
            {filename}
          </label>
        </div>
        <button type='submit' className='btn'>
          Upload
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default FileUpload;
