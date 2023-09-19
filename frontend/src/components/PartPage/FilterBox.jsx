import React from "react";

const FilterBox = () => {
  const cpuFilter = [
    { name: "제조사", value: ["AMD", "인텔", "ASUS", "APPLE", "NVIDIA"] },
    { name: "코어 수", value: [1, 2, 3] },
    { name: "쓰레드 수", value: [4, 5, 6] },
    { name: "L3캐시", value: [7, 8, 9, 10] },
    { name: "TDP", value: [11, 12, 3, 5, 6, 6, 7, 8, 5, 4] },
    { name: "내장그래픽", value: [1, 3, 4] },
  ];

  return (
    <div>
      <table className="part-filter-box">
        <thead></thead>
        <tbody>
          {cpuFilter.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="part-filter-attribute">
                <td>{item.name}</td>
                <td>|</td>
                {item.value.map((value, idx) => (
                  <td key={idx}>
                    <div className={`checkbox-wrapper-8`}>
                      <input
                        className="tgl tgl-skewed"
                        id={`cb3-8-${index}${idx}`}
                        type="checkbox"
                      />
                      <label
                        className="tgl-btn"
                        data-tg-off={`${value}`}
                        data-tg-on={`${value}`}
                        htmlFor={`cb3-8-${index}${idx}`}
                      ></label>
                    </div>
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterBox;
