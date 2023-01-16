import axios from "axios";
export const checkFile = (file) => {
  let err = "";
  if (!file) return (err = "file doesn't exist");
  if (file.size > 1024 * 1024)
    err = "The largest image size is 1mb!!!";

  return err;
};

export const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "uploads");
  const uploadRes = await axios.post(
    "https://api.cloudinary.com/v1_1/dparjcr9c/image/upload",
    formData
  );
  return uploadRes;
};
