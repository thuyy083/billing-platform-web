import axiosClient from "../config/axios";

const paidCustomerImportService = {

  importReconciliation(
    periodId,
    file
  ) {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    return axiosClient.post(
      `/records/import-reconciliation?periodId=${periodId}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

  },

  downloadTemplate() {

    return axiosClient.get(
      "/records/import-reconciliation/template",
      {
        responseType: "blob"
      }
    );

  }

};

export default paidCustomerImportService;