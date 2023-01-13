import React, { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Button, Input } from '../components';
import images from '../assets';

const CreateNFT = () => {
  const { theme } = useTheme();
  const [fileUrl, setfileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ price: '', name: '', description: '' });

  // upload file to IPFS(blockchain)
  const onDrop = useCallback((acceptedFiles) => {

  }, []);

  /* after get the file, call this onDrop function, regardless accepted or rejected */
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () => (
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? ' border-file-active ' : ''} 
       ${isDragAccept ? ' border-file-accept ' : ''} 
       ${isDragReject ? ' border-file-reject ' : ''}`),
    [isDragActive, isDragReject, isDragAccept],
  );

  return (
    <div className="flex justify-center p-12 sm:px-4 border-file">
      <div className="w-3/5 md:w-full">
        <h1 className="ml-4 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl xs:ml-0">Create new NFT</h1>
        <div className="mt-16">
          <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">UploadFile</p>
          <div className="mt-4">
            {/* take each param from the objet, inject as parameter to the tag */}
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flex-col text-center flexCenter">
                <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">PNG, GIT, SVG, WEBM, Max 100mb</p>
                <div className="flex justify-center w-full my-12">
                  <Image src={images.upload} width={100} height={100} objectfit="contain" alt="file upload" className={theme === 'light' && 'filter invert'} />
                </div>
                <p className="text-sm font-semibold font-poppins dark:text-white text-nft-black-1">Drag and Drop File</p>
                <p className="mt-2 text-sm font-semibold font-poppins dark:text-white text-nft-black-1">or Browse media on your device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <Image src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          placeholder="Asset Name"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />

        <Input
          inputType="textarea"
          title="Description"
          placeholder="Asset Description"
          handleClick={(e) => setFormInput({ ...formInput, description: e.target.value })}
        />
        when key pressed
        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />

        <div className="flex justify-end w-full mt-7">
          <Button
            btnName="Create Item"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
