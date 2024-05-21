'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type Props = {
  type?: 'profile';
  value?: string;
  onChange: (base64: string) => void;
  disabled: boolean;
};

export const ImageUpload = ({ type, value, onChange, disabled }: Props) => {
  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        onChange(e.target.result);
      };

      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    disabled,
  });

  return (
    <div
      {...getRootProps({
        className:
          'cursor-pointer w-full p-4 flex items-center justify-center border-2 border-dotted border-neutral-700 rounded-md',
      })}
    >
      <input {...getInputProps()} />
      {value ? (
        type === 'profile' ? (
          <div className='relative w-24 h-24'>
            <Image
              src={value}
              alt='profile'
              className='object-cover rounded-full'
              fill
            />
          </div>
        ) : (
          <div className='relative w-full h-60'>
            <Image
              src={value}
              alt='image'
              className='object-cover rounded-sm'
              fill
            />
          </div>
        )
      ) : (
        <p>Please upload an image file!</p>
      )}
    </div>
  );
};
