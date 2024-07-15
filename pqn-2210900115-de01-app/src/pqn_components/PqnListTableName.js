import React from 'react'
import axios from '.pqn-2210900115';

export default function PqnListTableName({ renderPqnListTableName, onPqnDelete , onPqnEdit }) {
    console.log("PqnListTableName:", renderPqnListTableName);
    const pqnHandleEdit = (tablename) => {
        // Call a function passed from the parent component to handle the edit operation
        // You can pass the tablename object to the parent component
        onPqnEdit(tablename);
      };

    // Check if renderPqnListUsers is an array
    if (!Array.isArray(renderPqnListTableName)) {
        return <div>No data available</div>;
    }
    
    const pqnHandleDelete = async (param) => {
        if (window.confirm("Ban co muon xoa khong?")) {
                const pqnRes = await axios.delete("PqnTableName/" + param.PqnMaSV);
                console.log("PqnTableName/" + param.PqnMaSV);
                // Optionally, you can update the list after successful deletion
                onPqnDelete();
        }
    }
    // Render the list of users
    let pqnElementTableName = renderPqnListTableName.map((PqnTableName, index) => {
        return (
            <>
                <tr key={index}>
                    <td>{PqnTableName.pqnid}</td>
                    <td>{PqnTableName.pqnName}</td>
                    <td>{PqnTableName.pqnEmail}</td>
                    <td>{PqnTableName.pqnPhone}</td>
                    <td>{PqnTableName.pqnStatus}</td>
                    <td>
                        <button className='btn btn-success' onClick={() => pqnHandleEdit(PqnTableName)}>Edit</button>
                        <button className='btn btn-danger' onClick={()=>pqnHandleDelete(PqnTableName)}>Remove</button>
                    </td>
                </tr>
            </>
        )
    })

    

    return (
        <div className='row'>
            <div className='col-md-12'>
                <table className='table table-bordered'>
                    <thead>
                        <th>pqnName</th>
                        <th>pqnEmail</th>
                        <th>pqnPhone</th>
                        <th>pqnStatus</th>
                        <th>pqnid</th>                 
                    </thead>
                    <tbody>
                        {pqnElementTableName}
                    </tbody>
                </table>
            </div>
        </div>
    )
}