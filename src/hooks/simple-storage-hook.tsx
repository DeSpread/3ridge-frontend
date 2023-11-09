import { useMutation } from "react-query";

const useSimpleStorage = () => {
  const mutation = useMutation({
    mutationFn: (data: { name: string; data: string }) => {
      const headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      const URL =
        "https://qh30bcm9e0.execute-api.ap-northeast-2.amazonaws.com/Prod";
      return fetch(URL, {
        method: "POST",
        headers: headersList,
        body: JSON.stringify(data),
      });
    },
  });

  const asyncUploadImage = async (
    imageName: string,
    base64Data: string,
    contentType?: string,
  ) => {
    const data = {
      name: imageName,
      data: base64Data,
      content_type: contentType,
    };
    return await mutation.mutateAsync(data);
  };

  return { asyncUploadImage };
};

export default useSimpleStorage;
