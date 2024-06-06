import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageInput from "../components/ImageInput";
import SongOptions from "../components/Song";

import voltarIcon from "../assets/Icons/revert.svg";
import fakeWork from "../assets/Background/bg_sga.png";
import workIcon from "../assets/Icons/excel.svg";
import axios from "axios";

const Configuracao = () => {
  const navigate = useNavigate();

  const [workMode, setWorkMode] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUser.user);
  const [token, setToken] = useState(currentUser.token);

  const [interests, setInterests] = useState(user.interests);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [instagram, setInstagram] = useState(user.instagram);
  const [description, setDescription] = useState(user.aboutUser?.description || 'a');
  const [profileSong, setProfileSong] = useState(user.aboutUser?.profileSong || 'b');
  const [orientation, setOrientation] = useState(user.orientation);
  const [gender, setGender] = useState(user.gender);
  const [agePreference, setAgePreference] = useState(user.agePreference || [18,100]);
  const [intention, setIntention] = useState(user.intention);

  const [searchedSong, setSearchedSong] = useState(profileSong?.songTitle || 'padrao');
  const [spotifyToken, setSpotifyToken] = useState();
  const [searchedList, setSearchedList] = useState();

  function formataData(data) {
    if (data==null) return;
    var dataArr = data.split('-');
    return dataArr[2]+"/"+dataArr[1]+"/"+dataArr[0];
  }

  function formataIntention(intention) {
    if(intention=='FRIENDSHIP') {
      return "Amizade";
    } else if(intention=='SERIOUS_RELATIONSHIP') {
      return "Um romance";
    } else if(intention=='SOMETHING_CASUAL') {
      return "Algo casual";
    } else {
      return "Amizade, um romance de filme ou algo mais?"
    }
  }
  
  function updateData(userState, newUserState) {
    if(userState != newUserState)
      return newUserState;
    return userState;
  }

  // Retorna um token para as requisições do SPOTIFY
  useEffect(() => { 


    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        "6e405048be884c30afdb08703ad691a5" +
        "&client_secret=" +
        "c8aff7e35fc9480485a820872499ebeb",
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setSpotifyToken(data.access_token));
  }, []);

  const digitacao = debounce(procurarMusica, 1000);
  function debounce (fn, delay) {
    let timer=null;
    return function(...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        fn(...args)
      }, delay);
    }
  }
  function esperarDigitacao (searchedSong) {
    setSearchedSong(searchedSong)
    digitacao(searchedSong);
  }

  async function procurarMusica(valor) {
    console.log("Procurando por " + valor);
  
    var songParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${spotifyToken}`,
      },
    };

    fetch(
      "https://api.spotify.com/v1/search?q=" + valor + "&type=track",
      songParameters
    )
      .then((response) => response.json())
      .then((data) => setSearchedList(data.tracks.items.slice(0, 5)));
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if(user.aboutUser == undefined) {
      user.aboutUser = {
        description: description,
        profileSong: profileSong,
      }
    } else {
      user.aboutUser.description = updateData(user.aboutUser.description, description);
      user.aboutUser.profileSong = updateData(user.aboutUser.profileSong, profileSong);
    }
    user.interests = updateData(user.interests, interests);
    user.phoneNumber = updateData(user.phoneNumber, phoneNumber);
    user.instagram = updateData(user.instagram, instagram);
    user.orientation = updateData(user.orientation, orientation);
    user.gender = updateData(user.gender, gender);
    user.age = updateData(user.age, age);
    user.intention = updateData(user.intention, intention);

    console.log("Depois de atualizar: \n");
    console.log(user);

    //atualizar com base em res code. 200...
    /* ESPERAR O BACK - por enquanto, atualiza os states e console log them.
    try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/users/update/${user.id}`,
          user,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        );

        if (res.data) {
          sessionStorage.removeItem("currentUser");
          let userData = {
            token: token,
            user: res.data
          }
          setUser(res.data);
          sessionStorage.setItem("currentUser", JSON.stringify(userData));
        }

        console.log("Perfil atualizado com sucesso", res.data);
        alert("Perfil atualizado com sucesso");
      } catch (err) {
        console.error("Erro ao atualizar perfil", err);
      }
    */
 
  }

  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-cover w-full h-full bg-[url('../src\assets\Background\bg_lines.svg')]"
    >
      {workMode ?
        <img className="w-full h-[100vh] object-cover cursor-pointer " onClick={() => setWorkMode(false)} src={fakeWork} />
        :
        <>
          <div id='config-container' className='space-y-3 text-white  max-sm:w-full w-[80vw] px-10 py-10 bg-cinzaBlack' >

            <div id='btnVoltar' className="voltar w-[100%] flex justify-end gap-1" onClick={() => navigate("/matches")}>
              <a className="w-6">
                <img className="img_return" src={voltarIcon} alt="voltar" />
              </a>
              <button className="text_return text-white font-extralight">Voltar</button>
            </div>

            <h1 className="text-[22px]">Configurações</h1>
            
            <div className="space-y-3">

            <div id="Conta" className="space-y-2">
              <h5 className=" text-[18px]" >Conta</h5>
              <div className="pl-4 space-y-2">
                <div>
                  <h6>Nome</h6>
                  <p className="font-extralight">{user.name}</p>
                </div>
                <div>
                  <h6>E-mail</h6>
                  <p className="font-extralight">{user.email}</p>
                </div>
                <div>
                  <h6 className="flex gap-4">Senha
                    <img className="img_exit w-6" src={voltarIcon} alt="voltar" />
                  </h6>
                  <p className=" font-extralight">********</p>
                </div>
                <div>
                  <h6>Data de Nascimento</h6>
                  <p className="font-extralight">{formataData(user.birthDate)}</p>
                </div>
                <div>
                  <h6>Curso</h6>
                  <p className="font-extralight">{user.course}</p>
                </div>
                <div>
                  <h6>Campus</h6>
                  <p className="font-extralight">{user.campus}</p>
                </div>

                <div > 
                  <div className="w-[100%] flex gap-6 max-sm:block max-sm:space-y-2 ">
                  <div onClick={() => console.log("deslogar")} className="flex gap-2 px-4 py-2 pr-12 cursor-pointer bg-cinzaWhite relative rounded-xl">
                      Logout
                      <img className="w-6 absolute right-3 " src={voltarIcon} alt="voltar" />
                    </div>

                    <div onClick={() => setWorkMode(true)} className="flex gap-2 px-4 py-2 pr-12 cursor-pointer bg-cinzaWhite relative rounded-xl">
                      Modo de Trabalho
                      <img className="w-6 absolute right-3" src={workIcon} alt="voltar" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div id="Perfil-Container" className="max-lg:block gap-9">

              <div id="Perfil" className="space-y-2">
                <h5 className="text-[18px]" >Perfil</h5>
                <div className="pl-4 space-y-2">

                  <div className="space-y-1">
                      <h6>Selecione seus interesses</h6>
                      <input className="bg-cinzaWhite rounded-lg max-sm:w-[100%] w-80 py-2 px-4"
                      type="text" placeholder={interests}  />
                  </div>
                  <div className="space-y-1">
                    <h6>Qual seu número de telefone?</h6>
                    <input className="bg-cinzaWhite rounded-lg max-sm:w-[100%] w-80 py-2 px-4"
                    type="text" value={phoneNumber} onInput={e =>setPhoneNumber(e.target.value)} />
                  </div>
                  <div className="space-y-1 ">
                    <h6>Qual seu instagram?</h6>
                    <input className="bg-cinzaWhite rounded-lg max-sm:w-[100%] w-80 py-2 px-4"
                    type="text" value={instagram} onInput={e =>setInstagram(e.target.value)} />
                  </div>
                  <div className="space-y-1 ">
                      <h6>Qual sua música favorita?</h6>
                      <div className="max-sm:w-[100%] w-80 relative">

                      <input className="bg-cinzaWhite rounded-lg w-full py-2 px-4 pr-9"
                      type="text" placeholder={profileSong.name+" - "+profileSong.album} value={searchedSong} onInput={e => esperarDigitacao(e.target.value)} />
                      
                      {searchedList != undefined ? (
                      <a onClick={()=> {setSearchedSong(''); setSearchedList(undefined)}} className="absolute z-40 top-2 right-3 px-1.5 rounded-full  text-amareloOcre hover:text-amareloOcre hover:bg-vermelhoSanguino cursor-pointer">&#10006;</a>
                        ) : (
                          <p></p>
                        )}
  
                      </div>
                  {searchedList != undefined ? (
                    <div className="space-y-1 max-sm:w-[100%] w-80 ">
                      {searchedList.map((list) => (
                        <SongOptions setProfileSong={setProfileSong} setSearchedSong={setSearchedSong} setSearchedList={setSearchedList} musica={list} key={list.id}/>
                      ))}
                    </div>
                  ) : (
                    <p></p>
                  )}

                  </div>
                  <div className="space-y-1">
                    <h6>Orientação sexual</h6>
                    <select className="bg-cinzaWhite rounded-lg max-sm:w-[100%] w-80 py-2 px-4" name="intencao" onInput={e =>setIntention(e.target.value)}>
                      <option value="" defaultValue={formataIntention(user.intention)} disabled hidden></option>
                      <option value="FRIENDSHIP">Amizade</option>
                      <option value="SERIOUS_RELATIONSHIP">Um romance</option>
                      <option value="SOMETHING_CASUAL">Algo casual</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <h6>Fale sobre você</h6>
                    <textarea className="bg-cinzaWhite rounded-lg max-sm:w-[100%] w-80 py-2 px-4"
                      type="text" value={description} onInput={e =>setDescription(e.target.value)}></textarea>
                  </div>

                  <div className="space-y-1">
                    <h6>Orientação sexual</h6>
                    <select className="bg-cinzaWhite rounded-lg max-sm:w-[100%] w-80 py-2 px-4" name="orientacao" onInput={e =>setOrientation(e.target.value)}>
                      <option className="pr-2" value="masculino">Hetero</option>
                      <option value="feminino">Bissexual</option>
                      <option value="pansexual">Pansexual</option>
                      <option value="homossexual">Homossexual</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <h6>Gênero</h6>
                    <select className="bg-cinzaWhite rounded-lg max-sm:w-[100%] w-80 py-2 px-4" name="genero" onInput={e =>setGender(e.target.value)}>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div className="space-y-1 max-sm:w-[100%] w-80 ">
                    <h6>Preferência de idade</h6>
                    <div id="slider-container">
                      <input className="w-[50%] " type="range" onInput={e => setAgePreference([parseInt(e.target.value),agePreference[1]])} name="minAge" min="18" max={agePreference[1]-1} />
                      <input className="w-[50%] " type="range" onInput={e => setAgePreference([agePreference[0], parseInt(e.target.value)])} name="maxAge" min={agePreference[0]+1} max="100" />
                    </div>
                    <div className="w-[100%] text-center text-sm"> {agePreference[0] + " anos até "+agePreference[1]+" anos"}</div>
                  </div>
                  
                </div>
              </div>

              <div id="Imagens" className="py-8 pl-4 w-fit h-fit grid grid-cols-2 max-sm:flex flex-wrap gap-4">
                <ImageInput token={token}/>
              </div>

            </div>
              {
                true?                 
                <div className="space-y-2 pl-4  max-sm:w-full w-[70vw] flex ">
                  <div onClick={() => handleUpdateSubmit} className="px-4 border-solid border-4 border-green py-2 cursor-pointer bg-cinzaWhite rounded-xl">
                    Salvar dados
                  </div>
                </div>
                : ""
              }

            <div id="Segurança" className="space-y-2 w-fit ">
              <h5 className=" text-[18px]" >Segurança</h5>
              <div onClick={() => console.log("deslogar")} className="px-4 border-solid border-4 border-vermelhoSanguino py-2 cursor-pointer bg-cinzaWhite rounded-xl">
                Desejo excluir a minha conta
              </div>
            </div>

            </div>


          </div>
        </>
      }



    </motion.div>
  );
};

export default Configuracao;
