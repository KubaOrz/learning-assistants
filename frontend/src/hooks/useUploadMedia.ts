import { useEffect, useState } from "react";
import { useLazyGetS3SignedUrlQuery } from "../api/api.service";

const useUploadMedia = () => {
    const [objectKey, setObjectKey] = useState<string | null>(null);
    const [getSignedUrl, { data: presignedUrl }] = useLazyGetS3SignedUrlQuery();
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const uploadMedia = (file: File) => {
        const fileType = encodeURIComponent(file.type);
        setFile(file);
        getSignedUrl(fileType);
    };

    const uploadFileToS3 = (url: string, file: File) => {
        setIsUploading(true);
        return new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader("Content-Type", file.type);

            xhr.upload.onprogress = (event) => {
                console.log('mamy progress');
                if (event.lengthComputable) {
                    console.log(event);
                    const progress = (event.loaded / event.total) * 100;
                    setUploadProgress(progress);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    setIsUploading(false);
                    if (presignedUrl) {
                        setObjectKey(presignedUrl.objectKey);
                    }
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

    useEffect(() => {
        if (presignedUrl && file) {
            uploadFileToS3(presignedUrl.url, file).catch((error) => {
                console.error("Error in uploadFileToS3:", error);
            });
        }
    }, [presignedUrl]);

    return { uploadMedia, objectKey, uploadProgress, isUploading };
};

export default useUploadMedia;
