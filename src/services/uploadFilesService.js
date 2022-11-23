import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("tumor", file.tumor);

    return http.post("/tumors/add/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
