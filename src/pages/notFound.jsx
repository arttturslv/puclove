import { } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const notFound = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-[url('../src\assets\background-linhas.svg')]">
            <div className="z-40 m-auto h-screen content-center flex flex-wrap justify-center  ">
                <div className="p-5 bg-vermelhoSanguino text-white rounded shadow-xl ">
                    <h1 className="font-bold text-3xl">Você está perdido?</h1>
                    <h4> Parece que sim...</h4>
                    <button onClick={() => navigate("/")} className="bg-gray p-2 my-3 rounded-md shadow-xl hover:scale-105">Clique para voltar a home.</button>
                </div>
                <div className="absolute right-[21%] bottom-[14%] cursor-help m-5 text-5xl opacity-0 hover:opacity-100">
                    😱
                </div>
            </div>
            <img className="z-10 absolute left-[10%] bottom-[20%]" src="../src/assets/lost.gif" alt="" />
        </div>
    )
}
export default notFound;
