import axiosClient from "../config/axios";

export const getCollectionProgress = async ({
  page = 0,
  size = 20,
  periodId = "",
  search = "",
  assignedUserId = "",
  collectionStatus = "",
  debtStatus = "",
}) => {

  const params = {
    page,
    size,
  };

  if (periodId) params.periodId = periodId;
  if (search) params.search = search;
  if (assignedUserId) params.assignedUserId = assignedUserId;
  if (collectionStatus) params.collectionStatus = collectionStatus;
  if (debtStatus) params.debtStatus = debtStatus;

  const response = await axiosClient.get(
    "/records",
    { params }
  );

  return response.data.data;
};
export const printBill = async (
  recordId,
  collectedAmount
) => {

  const response =
    await axiosClient.patch(
      `/records/${recordId}/print-bill`,
      {
        collectedAmount
      }
    );

  return response.data;
};

export const markDebt = async (
  recordId
) => {

  const response =
    await axiosClient.patch(
      `/records/${recordId}/mark-debt`
    );

  return response.data;
};