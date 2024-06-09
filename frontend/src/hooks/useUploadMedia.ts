import { useState } from "react";
import { useLazyGetS3SignedUrlQuery } from "../api/api.service";

const useUploadMedia = () => {
    const [getSignedUrl] = useLazyGetS3SignedUrlQuery();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const uploadMedia = async (file: File) => {
        const fileType = encodeURIComponent(file.type);
        const { data } = await getSignedUrl(fileType);
        if (data && file) {
            await uploadFileToS3(data.url, file).catch((error) => {
                console.error("Error in uploadFileToS3:", error);
            });
            return data.objectKey;
        }

        return null;
    };

    const uploadFileToS3 = (url: string, file: File) => {
        setIsUploading(true);
        return new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", file.type);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    setUploadProgress(progress);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    setIsUploading(false);
                    resolve();
                } else {
                    console.error("Failed to upload file:", xhr.statusText);
                    reject(new Error(`Failed to upload file: ${xhr.statusText}`));
                }
            };

            xhr.onerror = () => {
                console.error("Error uploading file:", xhr.statusText);
                reject(new Error(`Error uploading file: ${xhr.statusText}`));
            };

            xhr.send(file);
        });
    };

    return { uploadMedia, uploadProgress, isUploading };
};

export default useUploadMedia;
