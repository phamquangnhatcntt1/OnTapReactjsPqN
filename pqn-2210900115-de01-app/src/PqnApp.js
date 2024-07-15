import "./App.css";
import axios from "./pqn_apis/pqn-2210900115";
import { useEffect, useState } from "react";
import PqnFormTableName from "./components/PqnFormTableName";
import PqnListTableName from "./pqn_components/PqnListTableName"

const PqnApp = () => {
  const [PqnListTableName, setPqnListTableName] = useState([null]);
  const [PqnSinhVienToEdit, setPqnTableNameToEdit] = useState(null);
  const PqnHandleEdit = (tablename) => {
    setPqnTableNameToEdit(tablename);
    setPqnAddOrEdit(true); // Open the form for editing
  };
  // doc du lieu tu api
  const PqnGetAllTableName = async () => {
    try {
      const PqnResponse = await axios.get("PqnTableName");
      console.log("API Data:", PqnResponse.data);
      setPqnListTableName(PqnResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    PqnGetAllTableName();
    console.log("Day la State Data:", PqnListTableName);
  }, []); // Empty dependency array to run the effect only once

  const [pqnAddOrEdit, setPqnAddOrEdit] = useState(false);
  const PqnInitTableName = {
    pqnName: "Nhất",
    pqnEmail: "phamquangnhatdz2105@gmail.com",
    pqnPhone: "0817842585",
    pqnStatus: true,
    pqnid: "2210900115"
  }

  const [PqnTableName, setPqnTableName] = useState(PqnInitTableName);
  //Ham xu ly them moi
  const PqnHandleAddNew = () => {
    setPqnAddOrEdit(true);
  }

  const PqnHandleClose = (param) => {
    setPqnAddOrEdit(param);
  }
  const PqnHandleSubmit = async (param) => {
    // Handle the submission logic here
    // For example, you can make an API call to update or create a new tablename
    console.log("Submitted data:", param);
  
    try {
      // Make an API call to update or create a new tablename
      await axios.post("PqnTableName", param);
  
      // After handling the submission, fetch the updated data
      await PqnGetAllTableName();
      setPqnAddOrEdit(false); // Close the form after submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  
  const PqnHandleDelete = () => {
    PqnGetAllTableName();
  };
  let PqnElementForm = pqnAddOrEdit === true ? (
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
      <h1>Lam viec voi API</h1>
      <hr />
      <PqnListTableName renderPqnListTableName={PqnListTableName} onPqnDelete={PqnHandleDelete} onPqnEdit={PqnHandleEdit}/>
      <button className='btn btn-primary' onClick={PqnHandleAddNew}>Them moi</button>
      <hr />
      {PqnElementForm}
    </div>
  )
}

export default PqnApp;