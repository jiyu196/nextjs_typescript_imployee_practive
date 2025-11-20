import {createSlice, PayloadAction} from "@reduxjs/toolkit";


// Fact Table
const initialTotal:EmployeeInfo[]= [
    {id:1, name: 'John', age: 35, job: "frontend", language: "react", pay: 1},
    {id:2, name: 'Peter', age: 35, job: "frontend", language: "react", pay: 1},
    {id:3, name: 'Sue', age: 35, job: "frontend", language: "react", pay: 1},
    {id:4, name: 'Susan', age: 35, job: "frontend", language: "react", pay: 1},
]



export type Mode = "" | "register" | "upgrade" | "delete" | "reset"

interface ModeItem {
    id: Mode;
    label: string;
}
// mode data
const modes: ModeItem[] =  [
    {id:"register" as Mode, label:"register" as string},
    {id:"upgrade" as Mode, label:"upgrade" as string},
    {id:"delete" as Mode, label:"delete" as string},
    {id:"reset"as Mode, label:"reset" as string}
]

export type EmployeeInfo = {
    id: number;
    name: string;
    age: number | string;
    job: string;
    language: string;
    pay: number | string;
}

interface EmployeeStateType {
    mode: Mode;
    modes:ModeItem[];
    infos: EmployeeInfo[];
    upInfo: EmployeeInfo | null;
    selectedId: number | null;
    error: string | null;
    loading: boolean;
}

// 1. initialState 설정 (데이터베이스로 따지면 스키마 구성, 자바로 따지면 클래스 생성)
const initialState: EmployeeStateType = {
    mode: '',
    modes,
    infos: initialTotal,
    upInfo: null,
    selectedId: 0,
    error: null,
    loading: false
}


// 2. Action Reducers 설정 -> controll이라고 할 수 있음. MVC 패턴. (그래서 리덕스를 mvc패턴이라고하는거임)
const handleModeReducer = (
    state: EmployeeStateType,
    action: PayloadAction<Mode>
) =>{
    const mod = action.payload; // 변하는 값이 아님. state는 변하는 값이어서 불안하니까 선언 안하는걸로.

    if(mod === "delete"){
        if(!state.selectedId){
            alert("직원을 선택해 주세요!!!")
            return;
        }
        const targetObj = state.infos.find(x => x.id === state.selectedId)
        if(!targetObj){
            alert("해당 직원을 찾을 수 없습니다.")
            return;
        }
        if(confirm(`${targetObj.name} 직원을 삭제할까요?`)){

            state.infos = [...state.infos].filter(item => item.id !== state.selectedId)
            state.mode = "";
            state.upInfo= null;
            state.selectedId = null;
        }
        return;
    }
    if(mod === 'reset'){
        if(confirm("목록을 초기 데이터로 되돌릴까요?")){
            state.infos = initialTotal
            state.mode = "";
            state.upInfo= null;
            state.selectedId = null;
        }
        return;
    }
    if(mod === "upgrade"){
        if(!state.selectedId){
            alert("수정할 직원을 먼저 선택해 주세요!!")
            return;
        }
    }
    state.mode = mod
}

const handleSelectedIdReducer = (
    state:EmployeeStateType,
    action:PayloadAction<number>
) =>{
    const id = action.payload;
    state.selectedId = id
    state.upInfo = state.infos.filter(info => info.id === id)[0] ?? null;

}
const handleRegisterReducer = (
    state: EmployeeStateType,
    action: PayloadAction<EmployeeInfo>
) => {
    const obj = action.payload;
    if (!obj.name) {
        alert("이름은 필수입니다.")
        return;
    }
    if (!obj.age || Number(obj.age) < 0) {
        alert("나이는 필수입니다.")
        return;
    }
    if (!obj.pay || Number(obj.pay) < 0) {
        alert("급여는 필수입니다.")
        return;
    }
    if (state.infos.some(item => item.name === obj.name)) {
        alert("이미 존재하는 이름입니다.")
        return;
    }
    const nextId = state.infos.length ? Math.max(...state.infos.map((i) => i.id)) + 1 : 1;
    state.infos = [...state.infos, {...obj, id: nextId}];
}


const handleUpgradeReducer = (
    state: EmployeeStateType,
    action: PayloadAction<EmployeeInfo>
) => {
    const obj = action.payload;
    if (Number(obj.age)<0){
        alert("나이는 0 이상입니다.")
        return;
    }
    if (Number(obj.pay)<0){
        alert("급여는 0 이상입니다.")
        return;
    }
    state.infos = [...state.infos].map(item =>
        item.id === obj.id ?
            {...item,
                age: obj.age,
                job: obj.job,
                language: obj.language,
                pay: obj.pay,
            } : item
    );
    state.mode = ''
}

// thunk Slice 담기.
const employeeSlice = createSlice({
    name: "emp/employeeSlice",
    initialState,
    reducers: {
        handleMode: handleModeReducer,
        handleRegister: handleRegisterReducer,
        handleUpgrade: handleUpgradeReducer,
        handleSelectedId: handleSelectedIdReducer
    },
});

export const {
    handleMode,
    handleRegister,
    handleUpgrade,
    handleSelectedId
} = employeeSlice.actions;

export default employeeSlice.reducer;

