import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;

  const [name, Setname] = useState('');
  const [lastname, Setlastname] = useState('');
  const [nickname, Setnickname] = useState('');
  const [date, Setdate] = useState('');
  const [age, Setage] = useState('');
  const [sex, Setsex] = useState('');
  const [data, Setdata] = useState([]);
  const [id, SetId] = useState('');

  const loading = () => {
    setTimeout(() => {
      window.location.reload(true);
    }, 1600);
  };

  async function Submit(ev) {
    ev.preventDefault();
    if (name && lastname && nickname && date && age && sex && age >= 0 && age <= 99 && (sex === 'ชาย' || sex === 'หญิง')) {
      Swal.fire({
        icon: "success",
        title: "คุณได้เพิ่มข้อมูลนี้สำเร็จ.",
        showConfirmButton: false,
        timer: 1500
      });
      await axios.post('/data', { name, lastname, nickname, date, age, sex });
      loading();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!!",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน"
      });
    }
  }

  useEffect(() => {
    axios.get('/dataall').then(res => (
      Setdata(res.data)
    ));
  }, []);

  async function deletes(id) {
    Swal.fire({
      title: "การลบข้อมูล",
      text: "คุณต้องการลบข้อมูลบุคคลนี้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        loading();
        axios.delete('/dataD/' + id);
      }
    });
  }

  async function edit(id) {
    await axios.get('/dataall/' + id).then(res => {
      Setname(res.data.name);
      Setlastname(res.data.lastname);
      Setnickname(res.data.nickname);
      Setdate(res.data.date);
      Setage(res.data.age);
      Setsex(res.data.sex);
      SetId(res.data._id);
    });
  }

  async function Submitedit(ev) {
    ev.preventDefault();
    if (name && lastname && nickname && date && age && sex && age >= 0 && age <= 99 && (sex === 'ชาย' || sex === 'หญิง')) {
      const res = await axios.put('/dataP', { name, lastname, nickname, date, age, sex, id });
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have successfully edited the data.",
          showConfirmButton: false,
          timer: 1500
        });
        loading();
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "กรุณากรอกข้อมูลก่อนกดยืนยัน"
      });
    }
  }


  function Openedit() {
    document.querySelector(".form_edit").classList.remove("hidden");
    document.querySelector(".bg_form_edit").classList.remove("hidden")
  }
  function Closeedit(){
    document.querySelector(".form_edit").classList.add("hidden");
    document.querySelector(".bg_form_edit").classList.add("hidden");
    setEmpty();
  }
  

  function Openadd() {
    document.querySelector(".form_add").classList.remove("hidden");
    document.querySelector(".bg_form_add").classList.remove("hidden")
  }
  function Closeadd(){
    document.querySelector(".form_add").classList.add("hidden");
    document.querySelector(".bg_form_add").classList.add("hidden");
    setEmpty();
      
  }
  function setEmpty(){
    Setname("");
      Setlastname("");
      Setnickname("");
      Setdate("");
      Setage("");
      Setsex("");
  }

  return (
    <div className="h-[100vh] w-[100%]">
      <div className="">
        <div className="block">
          <div onClick={Closeadd} className="hidden bg_form_add before-[content:''] py-0 z-50 bg-blur-black before:bg-[rgba(4,11,20,0.8)] before:h-[100%] before:absolute before:w-[100vw]"/>
          <form onSubmit={Submit}  className="hidden form_add flex justify-center ">
            <div className="absolute top-[10%] lg:top-[3%] xl:top-[10%]">
              <div className="border px-5 py-5 md:px-[5rem] md:py-[8rem] lg:px-[8rem] lg:py-[1.5rem] xl:px-[8rem] xl:py-[5rem] bg-[#f4f6f8] border-[#f4f6f8] text-black rounded-lg relative">
                <div className="text-center font-bold">เพิ่มข้อมูลพนักงาน</div>
                <div className="pb-2">
                  <div className="py-1">
                    <div>ชื่อ</div>
                    <input id="name" type="text" placeholder='ชื่อ' value={name} onChange={ev => Setname(ev.target.value)} minLength="2" maxLength="20" className="border text-black" />
                  </div>
                  <div className="py-1">
                    <div>นามสกุล</div>
                    <input id="lastname" type="text" placeholder='นามสกุล' value={lastname} onChange={ev => Setlastname(ev.target.value)} minLength="2" maxLength="20" className="border text-black" />
                  </div>
                  <div className="py-1">
                    <div>ชื่อเล่น</div>
                    <input id="nickname" type="text" placeholder="ชื่อเล่น" value={nickname} onChange={ev => Setnickname(ev.target.value)} minLength="2" maxLength="20" className="border text-black" />
                  </div>
                  <div className="py-1">
                    <div>วันเดือนปีเกิด</div>
                    <div className="py-1">
                      <input type="date" id="birthday" name="birthday" value={date} onChange={ev => Setdate(ev.target.value)} className="border text-black" />
                    </div>
                  </div>
                  <div className="py-1">
                    <div>อายุ</div>
                    <input id="age" type="number" placeholder="อายุ" value={age} onChange={ev => Setage(ev.target.value)} className="border text-black" min="0" max="99" />
                  </div>
                  <div className="py-1">
                    <div>เพศ</div>
                    <select id="sex" value={sex} onChange={ev => Setsex(ev.target.value)} className="text-black">
                      <option value="">เลือกเพศ</option>
                      <option value="ชาย">ชาย</option>
                      <option value="หญิง">หญิง</option>
                    </select>
                  </div>
                </div>
                <div className="text-center"><button type="submit" className="border px-2 py-1 text-center bg-[#3085d6] border-[#3085d6] rounded-md text-white">เพิ่มข้อมูล</button></div>
                <div className="text-center pt-2"><button type="button" onClick={Closeadd} className="border px-2 py-1 text-center bg-[#d33] border-[#d33] rounded-md text-white">ยกเลิก</button></div>
              </div>
            </div>
          </form>
        </div>
        <div onClick={Closeedit} className="hidden bg_form_edit before-[content:''] py-0 z-50 bg-blur-black before:bg-[rgba(4,11,20,0.8)] before:h-[100%] before:absolute before:w-[100vw]"/>
        <div className="flex justify-center hidden form_edit">
          <div className="absolute top-[10%] lg:top-[3%] xl:top-[10%]">
            <div className="border px-5 py-5 md:px-[5rem] md:py-[8rem] lg:px-[8rem] lg:py-[1.5rem] xl:px-[8rem] xl:py-[5rem] border-[#f4f6f8] bg-[#f4f6f8] text-black rounded-lg">
              <form onSubmit={Submitedit} className="pb-2">
                <div className="pb-[1rem] font-bold text-center">แก้ไขข้อมูลส่วนตัว</div>
                <div className="py-1">
                  <div>ชื่อ</div>
                  <input type='text' placeholder='ชื่อ' value={name} onChange={e => Setname(e.target.value)} minLength="2" maxLength="20" className="border text-black"/>
                </div>
                <div className="py-1">
                  <div>นามสกุล</div>
                  <input type='text' placeholder='นามสกุล' value={lastname} onChange={e => Setlastname(e.target.value)} minLength="2" maxLength="20" className="border text-black"/>
                </div>
                <div className="py-1">
                  <div>ชื่อเล่น</div>
                  <input type='text' placeholder='ชื่อเล่น' value={nickname} onChange={e => Setnickname(e.target.value)} minLength="2" maxLength="20" className="border text-black"/>
                </div>
                <div className="py-1">
                  <div>วันเดือนปีเกิด</div>
                  <div>
                    <input type="date" id="birthday" name="birthday" value={date} onChange={e => Setdate(e.target.value)} className="border text-black"/>
                  </div>
                </div>
                <div className="py-1">
                  <div>อายุ</div>
                  <input type='number' placeholder='อายุ' value={age} onChange={e => Setage(e.target.value)} className="border text-black" required min="0" max="99" />
                </div>
                <div className="py-1">
                  <div>เพศ</div>
                  <select value={sex} onChange={ev => Setsex(ev.target.value)} className="text-black">
                    <option value="ชาย">ชาย</option>
                    <option value="หญิง">หญิง</option>
                  </select>
                </div>
                <div className="pt-4 text-center"><button type="submit" className="border px-2 py-1 bg-[#3085d6] border-[#3085d6] rounded-md text-white">ยืนยันการแก้ไข</button></div>
              </form>
              <div className="text-center">
                <button className="border px-2 py-1 bg-[#d33] border-[#d33] rounded-md text-white" onClick={Closeedit}>ยกเลิกการแก้ไข</button>
              </div>              
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[4rem] flex justify-center">
        <div>
          <div className="bg-[#f5f5f5] px-[3.5rem] py-[5rem]">
            <div className="flex justify-end"><button className="px-5 py-2 bg-[#3b3ec1] text-[13px]  md:text-[20px] lg:text-[30px] xl:text-[40px]" onClick={Openadd}>เพิ่มข้อมูล</button></div>
            <div className="pb-[1rem] text-black font-bold text-[13px] md:text-[20px] lg:text-[30px] xl:text-[40px]">ข้อมูลพนักงาน</div>
            <table className="text-left w-full table-auto">
              <thead>
                <tr className="bg-[#a3afc9] text-center text-[8px] md:text-[16px] lg:text-[20px] xl:text-[25px]">
                  <th className="sm:px-[2rem] md:px-[2.1rem] md:py-[10px] lg:py-[13px] lg:px-[5rem] xl:py-[1rem] xl:px-[6rem]">ชื่อ</th>
                  <th className="md:px-[1rem] lg:px-[2rem] xl:px-[4rem]">นามสกุล</th>
                  <th className="md:px-[1.1rem] lg:px-[1rem] xl:px-[2rem]">ชื่อเล่น</th>
                  <th className="md:px-[0.3rem] lg:px-[2rem] xl:px-[3rem]">วัน/เดือน/ปีเกิด</th>
                  <th className="md:px-[0.3rem] lg:px-[1rem] xl:px-[2rem]">อายุ</th>
                  <th className="md:px-[0.3rem] lg:px-[1rem] xl:px-[2rem]">เพศ</th>
                  <th className="md:px-[0.3rem] lg:px-[1rem] xl:px-[2rem]">แก้ไข</th>
                  <th className="md:px-[0.3rem] lg:px-[1rem] xl:px-[2rem]">ลบ</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 && data.map((dataAll, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#ffffff] text-black text-[7px] md:text-[12px] lg:text-[20px] xl:text-[24px]" : "bg-[#f4f6f8] text-black text-[7px] md:text-[12px] lg:text-[20px] xl:text-[24px]"}>
                    <td className="md:pl-2">{dataAll.name}</td>
                    <td>{dataAll.lastname}</td>
                    <td className="text-center">{dataAll.nickname}</td>
                    <td className="text-center">{dataAll.date}</td>
                    <td className="text-center">{dataAll.age}</td>
                    <td className="text-center">{dataAll.sex}</td>
                    <td className="text-center">
                      <button onClick={() => { Openedit(); edit(dataAll._id) }} className="hover:bg-[#3085d6] hover:border-[#3085d6] hover:shadow-md hover:shadow-[#3085d6] rounded-full border">
                        <CiEdit className="text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px]" />
                      </button>
                    </td>
                    <td className="text-center py-2">
                      <button onClick={() => { deletes(dataAll._id) }} className="hover:bg-[#d33] hover:shadow-md hover:shadow-[#d33] hover:border-[#d33] rounded-full border">
                        <MdDeleteForever className="text-[20px] md:text-[30px] lg:text-[40px] xl:text-[50px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;