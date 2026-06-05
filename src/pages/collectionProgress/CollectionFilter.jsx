import {
  useDispatch,
  useSelector
} from "react-redux";

import styles from "./CollectionFilter.module.scss";


import { fetchCollectionProgress, resetFilter, setPage, updateFilter } from "../../redux/slices/collectionProgressSlice";
import { selectBillingPeriods, selectConsultants, selectFilters } from "../../redux/selector/collectionProgressSelector";

const CollectionFilter = () => {

  const dispatch =
    useDispatch();

  const consultants =
    useSelector(
      selectConsultants
    );

  const periods =
    useSelector(
      selectBillingPeriods
    );

  const filters =
    useSelector(
      selectFilters
    );

  const handleSearch = () => {

    dispatch(setPage(0));

    dispatch(
      fetchCollectionProgress()
    );
  };

  const handleReset = () => {

    dispatch(
      resetFilter()
    );

    setTimeout(() => {

      dispatch(
        fetchCollectionProgress()
      );

    }, 100);
  };

  return (

    <div className={styles.container}>

  {/* Hàng bộ lọc */}
  <div className={styles.filterRow}>

    <select
      value={filters.periodId}
      onChange={(e) =>
        dispatch(
          updateFilter({
            periodId: e.target.value
          })
        )
      }
    >
      <option value="">
        Tất cả kỳ cước
      </option>

      {periods.map((period) => (
        <option
          key={period.id}
          value={period.id}
        >
          {period.name}
        </option>
      ))}
    </select>

    <select
      value={filters.assignedUserId}
      onChange={(e) =>
        dispatch(
          updateFilter({
            assignedUserId:
              e.target.value
          })
        )
      }
    >
      <option value="">
        Tất cả nhân viên
      </option>

      {consultants.map((item) => (
        <option
          key={item.id}
          value={item.id}
        >
          {item.fullName}
        </option>
      ))}
    </select>

    <select
      value={filters.collectionStatus}
      onChange={(e) =>
        dispatch(
          updateFilter({
            collectionStatus:
              e.target.value
          })
        )
      }
    >
      <option value="">
        Tất cả trạng thái thu
      </option>

      <option value="CHUA_THU">
        Chưa thu
      </option>

      <option value="DA_THANH_TOAN">
        Đã thanh toán
      </option>
    </select>

    <select
      value={filters.debtStatus}
      onChange={(e) =>
        dispatch(
          updateFilter({
            debtStatus:
              e.target.value
          })
        )
      }
    >
      <option value="">
        Tất cả trạng thái gạch nợ
      </option>

      <option value="CHUA_GACH_NO">
        Chưa gạch nợ
      </option>

      <option value="DA_GACH_NO">
        Đã gạch nợ
      </option>
    </select>

  </div>

  {/* Hàng tìm kiếm */}
  <div className={styles.searchRow}>

    <input
      placeholder="Tìm mã KH, tên KH, số TB, SĐT..."
      value={filters.search}
      onChange={(e) =>
        dispatch(
          updateFilter({
            search: e.target.value
          })
        )
      }
    />

    <button
      className={styles.searchBtn}
      onClick={handleSearch}
    >
      Tìm kiếm
    </button>

    <button
      className={styles.resetBtn}
      onClick={handleReset}
    >
      Làm mới
    </button>

  </div>

</div>
  );
};

export default CollectionFilter;