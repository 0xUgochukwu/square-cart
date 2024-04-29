/** @format */

import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile } from "filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Upload = ({
  form,
  updateFunction,
}: {
  form: any;
  updateFunction: (value: any) => void;
}) => {
  const [files, setFiles] = useState<string[]>([]);

  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    const base64Files: any = fileItems.map((fileItem) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileItem.file);
      return new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
      });
    });

    Promise.all(base64Files).then((base64Array) => {
      setFiles(base64Array);
    });
  };

  useEffect(() => {
    updateFunction({
      ...form,
      images: files,
    });
  }, [files]);

  return (
    <div className='App'>
      <FilePond
        onupdatefiles={handleUpdateFiles}
        allowMultiple={true}
        maxFiles={3}
        name='files'
        required
        instantUpload={false}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};

export default Upload;
