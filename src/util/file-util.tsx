const getFileExtension = (file: File) => {
  if (file) {
    return file.type.split("/")[1];
  }
};

const asyncReadAsBase64Data = (file: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        const splits = reader.result.toString()?.split(",");
        if (splits.length > 1) {
          resolve(splits[1]);
        }
      }
    };
    reader.onerror = reject;
  });
};

export { asyncReadAsBase64Data, getFileExtension };