'use client';
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from '@/lib/config';
// import ImageKit from 'imagekit';
// import { set } from 'zod';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const { env : {imagekit : {publicKey, urlEndpoint}} } = config;



const authenticator = async() => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status} : ${errorText}`);
    }
    const data = await response.json();
    const {signature, expire, token} = data;
    return {signature, expire, token};
  } catch (error:any) {
    throw new Error(`Auth failed : ${error.message}`)
  }
};


interface Props { 
  type: 'image' | 'video';
  accept : string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  value?:string;
  onFileChange :(filePath: string) => void;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  value,
  onFileChange,
}: Props ) => {

  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{filePath:string | null}>({filePath: value ?? null});

  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === 'dark' ? 'bg-dark-300 text-white' : 'bg-light-100 text-black border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  }

  const onError = (error: any) => {
    console.log(error);
    toast({
      title:  `${type} upload failed`,
      description: `Your ${type} could not be uploaded`,
      variant: 'destructive',
    })
  };
  
  const onSuccess = (res:any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} upload successful`,
      description: `${res.filePath} uploaded successfully`,
    })
  };

  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 1024 * 1024 * 20) {
        toast({
          title: 'File size too large',
          description: 'File size should be less than 20MB',
          variant: 'destructive',
        })
        return false;
        } 
      } else if (type === 'video') {
        if (file.size > 1024 * 1024 * 50) {
          toast({
            title: 'File size too large',
            description: 'File size should be less than 50MB',
            variant: 'destructive',
          })
          return false;
        }
    }
    return true;
  }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload 
      ref={ikUploadRef}
      onSuccess={onSuccess}
      onError={onError}
      useUniqueFileName={true}
      validateFile={onValidate}
      onUploadStart={() => {setProgress(0)}}
      onUploadProgress={({loaded, total}) => {
        const percent= Math.round((loaded / total) * 100);
        setProgress(percent);
      }}
      folder={folder}
      accept={accept}
      className='hidden' 
       />

       <button className={cn('upload-btn', styles.button)} onClick={(e)=> {
        e.preventDefault();
        if(ikUploadRef.current) {
          //@ts-ignore
          ikUploadRef.current?.click();
        }
       }}>
        <Image src='/icons/upload.svg' className='object-contain' alt='upload' width={20} height={20} />
        <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn('upload-filename', styles.text)}>{file.filePath}</p>
        )}
       </button>

        {progress > 0 && ( progress < 100 ) && (
          <div className='w-full rounded-full bg-green-200'>
            <div className='progress' style={{width: `${progress}%`}}>
              {progress}%
            </div>
          </div>
        )}
        {file && 
          (type === 'image' ? (
            <IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />
          ) : type === 'video' ? (
            <IKVideo
              path={file.filePath}
              controls={true}
              className='h-96 w-full rounded-xl'
              />
          ) : null)}

    </ImageKitProvider>
  );
};

export default FileUpload;