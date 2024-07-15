import "./App.css";
import axios from "./pqn_apis/pqn-2210900115";
import { useEffect, useState } from "react";
import PqnFormTableName from "./pqn_components/PqnFormTableName";
import PqnListTableName from "./pqn_components/PqnListTableName";

const PqnApp = () => {
  const [pqnListTableNames, setPqnListTableNames] = useState([]);
  const [pqnTableNameToEdit, setPqnTableNameToEdit] = useState(null);

  const PqnHandleEdit = (tablename) => {
    setPqnTableNameToEdit(tablename);
    setPqnAddOrEdit(true); // Open the form for editing
  };

  // Fetch data from API
  const PqnGetAllTableName = async () => {
    try {
      const response = await axios.get("PqnTableName");
      console.log("API Data:", response.data);
      setPqnListTableNames(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    PqnGetAllTableName();
    console.log("State Data:", pqnListTableNames);
  }, []); // Empty dependency array to run the effect only once

  const [pqnAddOrEdit, setPqnAddOrEdit] = useState(false);
  const PqnInitTableName = {
    pqnName: "Nhất",
    pqnEmail: "phamquangnhatdz2105@gmail.com",
    pqnPhone: "0817842585",
    pqnStatus: true,
    pqnid: "2210900115"
  };

  const [PqnTableName, setPqnTableName] = useState(PqnInitTableName);

  const PqnHandleAddNew = () => {
    setPqnAddOrEdit(true);
  };

  const PqnHandleClose = (param) => {
    setPqnAddOrEdit(param);
  };

  const PqnHandleSubmit = async (param) => {
    console.log("Submitted data:", param);
  
    try {
      await axios.post("PqnTableName", param);
      await PqnGetAllTableName();
      setPqnAddOrEdit(false); // Close the form after submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const PqnHandleDelete = () => {
    PqnGetAllTableName();
  };

  let PqnElementForm = pqnAddOrEdit ? (
    <PqnFormTableName
      renderTableName={PqnTableName}
      onPqnClose={PqnHandleClose}
      onPqnSubmitForm={PqnHandleSubmit}
    />
  ) : (
    ""
  );

  return (
    <div className='container border my-3'>
      <h1>Phạm Quang Nhất - Ôn Tập</h1>
      <hr />
      <PqnListTableName renderPqnListTableName={pqnListTableNames} onPqnDelete={PqnHandleDelete} onPqnEdit={PqnHandleEdit}/>
      <button className='btn btn-primary' onClick={PqnHandleAddNew}>Them moi</button>
      <hr />
      {PqnElementForm}
    </div>
  );
};

export default PqnApp;
