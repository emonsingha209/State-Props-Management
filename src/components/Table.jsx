import { useEffect, useState } from "react";

const Table = ({ courseData }) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [filteredCourse, setFilteredCourse] = useState([]);
  // fetching property name
  const tableHeaders = Object.keys(courseData[0] || {}).filter(
    (header) => header !== "id" // remove id from tableHeader for not render id
  );
  tableHeaders.push("action"); // adding Action Column
  const checkboxInit = {};
  tableHeaders.forEach((header) => {
    checkboxInit[header] = true; // initializing all checkbox to true
  });

  const [checkbox, setCheckbox] = useState(checkboxInit);
  const handleMenu = () => {
    setSideMenu(!sideMenu);
  };
  const handleCheckboxChange = (header) => {
    setCheckbox((checkboxValue) => ({
      ...checkboxValue,
      [header]: !checkboxValue[header], // checkbox value toggle
    }));
  };
  const handleStatusChange = () => {
    console.log("dropdown changed");
  };
  useEffect(() => {
    setFilteredCourse(tableHeaders.filter((header) => checkbox[header])); // update filteredCourse when checkbox state change
  }, [checkbox]);
  console.log(courseData);
  return (
    <div className="card">
      <span className="bar-menu" onClick={handleMenu}>
        &#9776;
      </span>
      {sideMenu && (
        <div className="side-menu">
          <span>Add or remove columns</span>
          {/* checkbox for filter column */}
          {tableHeaders.map((header, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={header}
                checked={checkbox[header] || false}
                onChange={() => handleCheckboxChange(header)}
              />
              <label>{header}</label>
            </div>
          ))}
        </div>
      )}
      <div className="table">
        <div className="table-caption">
          <h2>Table Title </h2>
        </div>
        {/* Table Header thead */}
        <div className="table-header-group">
          <div className="table-row">
            {filteredCourse.map((header, index) => (
              <div className="table-cell" key={index}>
                {/* rendering property name*/}
                {header}
              </div>
            ))}
          </div>
        </div>
        {/* Table Body tbody */}
        <div className="table-row-group">
          {courseData.map((courses, index) => (
            <div className="table-row" key={index}>
              {filteredCourse.map((data, dataIndex) => (
                <div className="table-cell" key={dataIndex}>
                  {/* rendering property */}
                  {data === "action" ? (
                    <button>Edit</button>
                  ) : data === "status" ? (
                    <select
                      value={courses[data] ? "publish" : "unpublish"} // selected publish/unpublish value based on true/false
                      onChange={(e) => handleStatusChange()}
                    >
                      <option value="publish">Publish</option>
                      <option value="unpublish">Unpublish</option>
                    </select>
                  ) : (
                    courses[data]
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
