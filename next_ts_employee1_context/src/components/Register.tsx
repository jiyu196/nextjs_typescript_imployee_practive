import React, {useState} from 'react';
import {EmployeeInfo, useEmployee} from "@/context/EmployeeContext";

export const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export const labelStyle: React.CSSProperties = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    color: '#333',
};

export const inputStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
};

    const initialInfo: EmployeeInfo = {
        id:1, name: '', age: 0, job: "", language: "", pay: 0}

const Register = () => {// 함수는 1개 짰는데 onChange 는 5개. 동적으로 들어가겠다는 뜻. 동시에가 아니라 이벤트 하나씩만
    const {handleRegister} = useEmployee()

    const [info, setInfo] = useState<EmployeeInfo>(initialInfo)

    const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target; // 데이터를 날려줬으니까 저장할 그릇이 필요해. 근데 변수는 사용할 수 없어. 그래서 state를 구성해야하는거임.
        // console.log(name, value)
        setInfo(prev => ({...prev, [name]: value})) // 이건 변하지 않음.
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // 페이지 이동을 막기 위해서. 싱글페이지라 페이지 이동이 필요 없기 때문.
        // main에서 자식한테 보내주려고 이벤트를 만들어. 그럼 자식쪽에서 submit에서 실행시키고 날리면됨.
        handleRegister(info);
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <label style={labelStyle}>
                Name
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    style={inputStyle}
                    required/>
            </label>
            <label style={labelStyle}>
                Age
                <input
                    type="number"
                    name="age"
                    onChange={handleChange}
                    min={1}
                    style={inputStyle}
                    required/>
            </label>
            <label style={labelStyle}>
                Job
                <input
                    type="text"
                    name="job"
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Language
                <input
                    type="text"
                    name="language"
                    onChange={handleChange}
                    style={inputStyle}
                />
            </label>
            <label style={labelStyle}>
                Pay
                <input
                    type="number"
                    name="pay"
                    onChange={handleChange}
                    min={0}
                    style={inputStyle}
                    required/>
            </label>
            <button type="submit">등록</button>
        </form>
    );
};

export default Register;