import axiosClient from "./axiosConfig";

export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post<string>(
    "/Upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

export const multipleUpload = async (fileList: File[]) => {
  const formData = new FormData();
  fileList.forEach((file: File) => {
    formData.append("fileList", file);
  });
  const res = await axiosClient.post<string[]>(
    "/multipleUpload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};

export const deletePhoto = async (filePath: string) => {
  const res = await axiosClient.delete<string>(
    `/Upload/${encodeUrl(filePath)}`
  );
  return res.data;
};
function encodeUrl(url: string): string {
  const encodedUrl = url
    .replace(/:/g, "%3a")
    .replace(/\//g, "%2f");
  return encodedUrl;
}
