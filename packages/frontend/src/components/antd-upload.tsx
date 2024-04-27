/** @format */

import React, { useState, useEffect } from "react";
import { PlusOutlined, UploadOutlined} from "@ant-design/icons";
import type {
  GetProp,
  UploadFile,
  UploadProps,
  Image,
} from "antd";

import { Button, Space, Upload } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AntDUpload: React.FC = ({
  images,
  selectImageFn,
}: {
  images: string[];
  selectImageFn: (images: any) => void;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const previousImages: UploadFile[] = images.map(
    (item: string, index: number) => ({
      uid: (index + 1).toString(),
      name: `image-${index + 1}`,
      status: "done",
      url: item,
    })
  );

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    const imgPromises = newFileList.map(async (item) => {
      if (
        item.originFileObj instanceof Blob ||
        item.originFileObj instanceof File
      ) {
        const base64 = await getBase64(item.originFileObj as FileType);
        return base64;
      } else {
        return item.url;
      }
    });
    const img = await Promise.all(imgPromises);
    selectImageFn(img.filter((base64) => base64 !== null));
  };


  useEffect(() => {
    setFileList(previousImages);
  }, [images]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}>
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

const AntDUploadSingle: React.FC = ({
  selectImageFn
}: {
  selectImageFn: any;
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    const imgPromises = newFileList.map(async (item) => {
      if (
        item.originFileObj instanceof Blob ||
        item.originFileObj instanceof File
      ) {
        const base64 = await getBase64(item.originFileObj as FileType);
        return base64;
      } else {
        return item.url;
      }
    });
    const img = await Promise.all(imgPromises);
    const images = img.filter((base64) => base64 !== null);
    selectImageFn(images)
  };
  return (
    <Space direction='vertical' style={{ width: "100%" }} size='large'>
      <Upload
        defaultFileList={fileList}
        listType='picture'
        onChange={handleChange}
        maxCount={1}>
        <Button icon={<UploadOutlined />}>Select Image (Max: 1)</Button>
      </Upload>
    </Space>
  );
};

export { AntDUpload, AntDUploadSingle };
