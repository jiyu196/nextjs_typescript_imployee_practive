import React from 'react';
import {EmployeeInfo} from "@/components/Main";
import InfoTable from "@/components/InfoTable";
// import {buttonBarStyle}


const buttonBarStyle:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
}

interface EmployeeInfoProps {
    selectedId: number;
    infos: EmployeeInfo[];
    handleSelectedId: (id: number) => void; // id 받을건데 number로 받을거고, void로 return없이 받을거임.
} // 타입을 인식을 못해서 인터페이스 선언 했음.

const EmployeeList= ({selectedId, infos, handleSelectedId}: EmployeeInfoProps) => {
    return (
        <>
            <div style={buttonBarStyle}>
                {infos?.map(info => (
                    <button
                        key={info.id}
                        onClick={() => handleSelectedId(info.id)}
                    >{info.name}</button>))}
            </div>
            <InfoTable
                selectedId = {selectedId}
                infos = {infos}
            />

        </>
    );
};

export default EmployeeList;