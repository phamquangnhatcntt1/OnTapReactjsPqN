import React, { useEffect, useState } from 'react'
import axios from './pqn_apis/pqn-2210900115';


export default function PqnFormTableName(onPqnClose, onPqnSubmitForm, renderStudent) {
    console.log(renderStudent);
    const [pqnMid, setPqnid] = useState(0);
    const [pqnName, setPqnName] = useState("");
    const [pqnEmail, setPqnEmail] = useState("");
    const [pqnPhone, setPqnPhone] = useState("");
    const [pqnStatus, setPqnStatus] = useState("");


    useEffect(() => {
        if (renderStudent) {
            setPqnid(renderStudent.id);
            setPqnName(renderStudent.Name);
            setPqnEmail(renderStudent.Email);
            setPqnPhone(renderStudent.Phone);
            setPqnStatus(renderStudent.Status);
        }

    }, [renderStudent]);
    const pqnHandleClose = () => {
        onPqnClose(false);
    }

    const pqnHandleSubmit = async (event) => {
        event.preventDefault();
        console.log(pqnid, pqnName, pqnEmail, pqnPhone, pqnStatus, pqnNoiSinh, pqnMaKH, pqnHocBong, pqnDiemTrungBinh);
        let pqnObjectStudent = {
            Pqnid: pqnid,
            PqnName: pqnName,
            PqnEmail: pqnEmail,
            PqnPhone: pqnPhone,
            PqnStatus: pqnStatus,

        }
        const pqnRes = await axios.post("PqnTableName", pqnObjectStudent);
        onPqnSubmitForm(false);
    }
    return (
        <div className='border'>
            <div class="input-group mb-3">
                <span class="input-group-text" id="id">id</span>
                <input type="text" class="form-control"
                    name='id' value={pqnid} onChange={(ev) => setPqnid(ev.target.value)}
                    placeholder="id" aria-label="id" aria-describedby="id" />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="Name">Name</span>
                <input type="text" class="form-control"
                    name='Name' value={pqnName} onChange={(ev) => setPqnName(ev.target.value)}
                    placeholder="Name" aria-label="Name" aria-describedby="Name" />
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="Email">Email</span>
                <input type="text" class="form-control"
                    name='Email' value={pqnEmail} onChange={(ev) => setPqnEmail(ev.target.value)}
                    placeholder="Email" aria-label="Email" aria-describedby="Email" />
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="Phone">Phone</span>
                <input type="text" class="form-control"
                    name='Phone' value={pqnPhone} onChange={(ev) => setPqnPhone(ev.target.value)}
                    placeholder="Phone" aria-label="Phone" aria-describedby="Phone" />
            </div>
            
            
            <button className='btn btn-primary' name='btnPqnSave' onClick={(ev) => pqnHandleSubmit(ev)}>Ghi lai</button>
            <button className='btn btn-danger' onClick={pqnHandleClose}>Dong</button>
        </div>
    )
}