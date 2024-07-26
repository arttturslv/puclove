import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageInput from "../../components/ImageInput";
import SongOptions from "../../components/Song";
import { useForm } from "react-hook-form";

import voltarIcon from "../../assets/Icons/revert.svg";
import fakeWork from "../../assets/Background/bg_sga.png";
import workIcon from "../../assets/Icons/excel.svg";
import axios from "axios";
import Input from "../../components/Input";
import Interesses from '../../components/Interesses'
import WrapperDiv from "../Matches/components/WrapperDiv";
import RangeSlider from "./RangeSlider";
export default function Configuration({ user, setIsSettingsShowing }) {
    const [signProgress, setSignProgress] = useState("first"); // usado para verificar o processo de cadastro (0 = primeira parte | 1, segunda parte | 2 cadastro completo)
    const [arrayInteresses, setArrayInteresses] = useState(null);
    const [placeholder, setPlaceholder] = useState(""); //usado para armazenar os valores selecionados no modal de interesse
    const [displayNotification, setDisplayNotification] = useState(false); //usado para controlar a visibilidade da mensagem de cadastro concluido.
    const [idades, setIdades] = useState([18, 35])
    const [isInteressesOpen, setInteressesOpen] = useState(true);

    function isInteressesValid() {
        console.log(placeholder)
        if (placeholder.length > 0) {
            return true;
        }
        return false;
    }


    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [token, setToken] = useState(currentUser.token);

    const [interests, setInterests] = useState(user.interests);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [instagram, setInstagram] = useState(user.instagram);
    const [description, setDescription] = useState(user.aboutUser?.description || 'a');
    const [profileSong, setProfileSong] = useState(user.aboutUser?.profileSong || 'b');
    const [orientation, setOrientation] = useState(user.orientation);
    const [gender, setGender] = useState(user.gender);
    const [agePreference, setAgePreference] = useState(user.agePreference || [18, 100]);
    const [intention, setIntention] = useState(user.intention);

    const [searchedSong, setSearchedSong] = useState(profileSong?.songTitle || 'padrao');
    const [spotifyToken, setSpotifyToken] = useState();
    const [searchedList, setSearchedList] = useState();


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getInterests();
    }, []);

    async function getInterests() {
        try {
            const response = await API.interests;
            var data = response.data;
            setArrayInteresses(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (data) => {

        if (signProgress == "first") {
            setSignProgress("second");
            console.log("preencher outra pagina")
            return;
        }

        let arrayInterests = placeholder.split(", ");
        data.interests = arrayInterests;

        try {
            const response = await API.register(data);
            console.log("Registration successful", response.data);

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            console.error("Registration failed", error);
            setDisplayNotification(true);
        }

    };

    function formataData(data) {
        if (data == null) return;
        var dataArr = data.split('-');
        return dataArr[2] + "/" + dataArr[1] + "/" + dataArr[0];
    }

    const [images, setImages] = useState(Array(6).fill(null));

    const handleImageChange = (index, newImage) => {
        const newImages = [...images];
        newImages[index] = newImage;
        setImages(newImages);
    };

    return (
        <section id="config" className="nobar overflow-y-scroll h-screen overflow-x-hidden relative md:m-0 mb-8 p-4 bg-cinzaBlack text-amareloOcre">
            <span className="flex justify-between">
                <h3 className=" text-lg font-semibold" >Configurações</h3>
                <span onClick={() => setIsSettingsShowing((prev)=> !prev)} className="flex gap-2 cursor-pointer justify-center items-center">
                    <img className="w-6" src={voltarIcon} alt="" />
                    <h3 className=" text-md " >Voltar</h3>
                </span>
            </span>

            <WrapperDiv title={"Conta"}>
                <div className="pl-4 py-2 space-y-2">
                    <div>
                        <h6 className="text-sm font-semibold" >Nome</h6>
                        <p className="font-extralight text-sm">{user.name}</p>
                    </div>
                    <div>
                        <h6 className="text-sm font-semibold"  >E-mail</h6>
                        <p className="font-extralight  text-sm">{user.email}</p>
                    </div>
                    <div>
                        <h6 className="flex gap-4 text-sm font-semibold">Senha
                            <img className="img_exit w-6" src={voltarIcon} alt="voltar" />
                        </h6>
                        <p className=" font-extralight text-sm">########</p>
                    </div>
                    <div>
                        <h6 className="text-sm font-semibold" >Data de Nascimento</h6>
                        <p className="font-extralight text-sm">{formataData(user.birthDate)}</p>
                    </div>
                    <div>
                        <h6 className="text-sm font-semibold" >Curso</h6>
                        <p className="font-extralight text-sm">{user.course}</p>
                    </div>
                    <div>
                        <h6 className="text-sm font-semibold" >Campus</h6>
                        <p className="font-extralight text-sm">{user.campus}</p>
                    </div>
                    <div >
                        <div className="w-[100%] flex gap-4 flex-wrap  ">
                            <button onClick={() => console.log("deslogar")} className="flex gap-2 px-4 py-2 pr-12 cursor-pointer bg-cinzaBlack relative rounded-xl">
                                Logout
                                <img className="w-6 absolute right-3 " src={voltarIcon} alt="voltar" />
                            </button>

                            <button onClick={() => setWorkMode(true)} className="flex gap-2 px-4 py-2 pr-12 cursor-pointer bg-cinzaBlack relative rounded-xl">
                                Modo de Trabalho
                                <img className="w-6 absolute right-3" src={workIcon} alt="voltar" />
                            </button>
                        </div>
                    </div>

                </div>
            </WrapperDiv>

            <WrapperDiv title="Perfil">

                <form className="w-[90%] m-auto py-2 flex flex-col gap-1 text-amareloOcre" onSubmit={handleSubmit(onSubmit)}>

                    {/* OTIMIZAR COM O CUSTOM INPUT DEPOIS */}
                    <div>
                        <h4 className=" font-semibold text-amareloOcre my-[3px] text-[15px]">Qual seu campus?</h4>
                        <select
                            className="text-[14px] text-amareloOcre w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343]"
                            type="name"
                            placeholder="Qual seu campus?"
                            name="campus"
                            {...register("campus", { required: true })}
                        >
                            <option value="" defaultValue={"Fala aí pra gente!"} disabled hidden>Fala aí pra gente!</option>
                            <option value="São Gabriel">São Gabriel</option>
                            <option value="Praça da Liberdade">Praça da Liberdade</option>
                            <option value="Coração Eucarístico">Coração Eucarístico</option>
                            <option value="Betim">Betim</option>
                            <option value="Contagem">Contagem</option>
                            <option value="Poços de Caldas">Poços de Caldas</option>
                            <option value="Arcos">Arcos</option>
                            <option value="Serro">Serro</option>
                            <option value="Guanhães">Guanhães</option>
                            <option value="Uberlândia">Uberlândia</option>
                        </select>
                        {errors?.campus?.type === "required" && (<p className="text-right text-[12px] text-vermelhoSanguino">Preencha qual seu campus*</p>)}
                    </div>

                    {/* FAZER VERIFICAÇÃO DE FALTA DE INTERESSES MATCH */}
                    <div>
                        <h4 className=" font-semibold text-amareloOcre my-[3px] text-[15px]">Selecione seus interesses</h4>
                        <Input
                            type="text"
                            name="interests"
                            value={placeholder}
                            placeholder="Escolha seus interesses"
                            errors={errors}
                            register={register}
                            onClick={() => setInteressesOpen(!isInteressesOpen)}
                            required
                        />
                        {!isInteressesValid && (<p className="text-right text-[12px] text-vermelhoSanguino">Adicione ao menos 3 interesses*</p>)}
                    </div>

                    <div>
                        <h4 className=" font-semibold text-amareloOcre my-[3px] text-[15px]">Qual seu instagram?</h4>
                        <Input
                            type="text"
                            name="instagram"
                            placeholder="@puclovers"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                validate: value => value.includes("@") || "Não esqueça de adicionar o @."
                            }}
                            required
                        />
                    </div>

                    <div>
                        <h4 className=" font-semibold text-amareloOcre my-[3px] text-[15px]">O que você busca?</h4>
                        <select
                            className="text-[14px] text-amareloOcre w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343]"
                            type="name"
                            name="intention"
                            {...register("intention", { required: true })}
                        >
                            <option value="" defaultValue={"Amizade, um romance de filme ou algo mais?"} disabled hidden>Amizade, um romance de filme ou algo mais?</option>
                            <option value="FRIENDSHIP">Amizade</option>
                            <option value="SERIOUS_RELATIONSHIP">Um romance</option>
                            <option value="SOMETHING_CASUAL">Algo casual</option>
                        </select>
                        {errors?.intention?.type === "required" && (<p className="text-right text-[12px] text-vermelhoSanguino">Fala o que você está buscando*</p>)}
                    </div>

                    <div>
                        <h4 className=" font-semibold text-amareloOcre my-[3px] text-[15px]">Fale sobre você</h4>
                        <textarea
                            className="text-[14px] text-amareloOcre placeholder:text-amareloOcre w-[100%] py-[7px] px-[15px] rounded-lg bg-[#434343]"
                            type="name"
                            placeholder="Quem é você?"
                            name="sobre"
                            {...register("sobre", { required: true })}
                        >
                        </textarea>
                    </div>

                    <div>
                        <h4 className=" font-semibold text-amareloOcre my-[3px] text-[15px]">Orientação sexual</h4>
                        <select
                            className="text-[14px] text-amareloOcre w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343]"
                            type="name"
                            placeholder="Qual sua orientação sexual?"
                            name="orientacao"
                            {...register("orientacao", { required: true })}
                        >
                            <option value="" defaultValue={"Fala aí pra gente!"} disabled hidden>Fala aí pra gente!</option>
                            <option value="hetero">Hetero</option>
                            <option value="bissexual">Bissexual</option>
                            <option value="homossexual">Homossexual</option>
                            <option value="pansexual">Pansexual</option>
                        </select>
                    </div>

                    <div>
                        <h4 className=" font-semibold text-amareloOcre my-[3px] text-[15px]">Gênero</h4>
                        <select
                            className="text-[14px] text-amareloOcre w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343]"
                            type="name"
                            placeholder="Qual seu gênero?"
                            name="genero"
                            {...register("genero", { required: true })}
                        >
                            <option value="" defaultValue={"Fala aí pra gente!"} disabled hidden>Fala aí pra gente!</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <div className="space-y-1 max-sm:w-[100%] ">
                        <h6>Preferência de idade</h6>
                        <RangeSlider idades={idades} setIdades={setIdades}></RangeSlider>
                        <div className="text-center text-xs"> {idades[0] + " anos até " + idades[1] + " anos"}</div>
                    </div>


                    <div className='grid grid-cols-3 md:grid-cols-2 py-2 gap-2 max-md:grid-cols-2 m-auto'>
                        {images.map((image, index) => (
                            <ImageInput
                                key={index}
                                initialImage={image}
                                onImageChange={handleImageChange}
                                index={index}
                            />
                        ))}

                    </div>

                </form>
            </WrapperDiv>
        </section>
    )
}