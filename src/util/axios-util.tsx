import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosUtil {
  public static asyncDownloadFile = async (config?: AxiosRequestConfig) => {
    const response = await axios({
      ...config,
    });
    const blob = new Blob([response.data]);
    const fileObjectUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = fileObjectUrl;
    link.style.display = "none";

    const extractDownloadFilename = (_response: AxiosResponse) => {
      const disposition = _response.headers["content-disposition"];
      const fileName = decodeURI(
        // @ts-ignore
        disposition
          ?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
          ?.replace(/['"]/g, "")
      );
      return fileName;
    };
    link.download = extractDownloadFilename(response);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(fileObjectUrl);
  };
}

export default AxiosUtil;
