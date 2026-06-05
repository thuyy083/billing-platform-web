import {useEffect} from "react";

import { useDispatch} from "react-redux";

import styles  from "./PaidCustomerImport.module.scss";

import { fetchBillingPeriods} from "../../redux/slices/paidCustomerImportSlice";

import PeriodSelector from "./PeriodSelector";

import UploadBox from "./UploadBox";

const PaidCustomerImport =
  () => {

    const dispatch =
      useDispatch();

    useEffect(() => {

      dispatch(
        fetchBillingPeriods()
      );

    }, []);

    return (

      <div className={styles.page}>

        <div className={styles.header}>

          <div>

            <h1>
              Cập nhật KH đã thanh toán
            </h1>

            <p>
              Import dữ liệu đối soát
              thanh toán khách hàng
            </p>

          </div>

        </div>

        <PeriodSelector />

        <UploadBox />

      </div>

    );

  };

export default
  PaidCustomerImport;