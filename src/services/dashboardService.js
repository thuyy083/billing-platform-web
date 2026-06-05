import axiosClient from "../config/axios";

const dashboardService = {
  getOverview(month, year) {
    return axiosClient.get(
      `/dashboard/overview?month=${month}&year=${year}`
    );
  },

  getConsultants(month, year) {
    return axiosClient.get(
      `/dashboard/consultants?month=${month}&year=${year}`
    );
  },

  getDailyStats(date) {
    return axiosClient.get(
      `/dashboard/daily-stats?date=${date}`
    );
  },

  getWarnings(month, year, page = 0, size = 20) {
    return axiosClient.get(
      `/dashboard/warnings?month=${month}&year=${year}&page=${page}&size=${size}`
    );
  },
};

export default dashboardService;