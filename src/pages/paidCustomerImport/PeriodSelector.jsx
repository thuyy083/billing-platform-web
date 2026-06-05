import { setSelectedPeriodId } from "../../redux/slices/paidCustomerImportSlice";
import styles
from "./PeriodSelector.module.scss";

import {
  useDispatch,
  useSelector
}
from "react-redux";


const PeriodSelector =
() => {

  const dispatch =
    useDispatch();

  const {
    periods,
    selectedPeriodId
  } =
  useSelector(
    state =>
      state.paidCustomerImport
  );

  return (

    <div className={styles.card}>

      <label>
        Kỳ cước
      </label>

      <select

        value={
          selectedPeriodId
        }

        onChange={e =>
          dispatch(
            setSelectedPeriodId(
              e.target.value
            )
          )
        }

      >

        {
          periods.map(
            item => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>

            )
          )
        }

      </select>

    </div>

  );

};

export default
PeriodSelector;