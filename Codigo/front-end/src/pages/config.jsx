import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import voltar from "../assets/Icones/icon voltar.svg";
import work_mode from "../assets/Icones/icon workmode.svg";
import imgwork_mode from "../assets/sga_workmode.png";
import "../stylesConfig.css";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import Interesses from "../components/Interesses";
import api from "../api/axiosConfig";

const Configuracao = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem("authToken")
  );
  const pictureImageRefs = Array.from({ length: 6 }, () => useRef(null));
  const inputFileRefs = Array.from({ length: 6 }, () => useRef(null));

  //-----------MODO DE TRABALHO-------------------
  var imgAberta = false;
  var imgWork = document.getElementById("img_work");
  var hiddenDiv = document.getElementById("config_page");
  function imgWorkMode() {
    console.log("oi");
    if (imgAberta) {
      imgWork.style.display = "none";
      hiddenDiv.style.display = "block";
      imgAberta = false;
    } else {
      imgWork.style.display = "block";
      hiddenDiv.style.display = "none";
      imgAberta = true;
    }
  }

  //--------------------------------------------------------------------

  //-----------IMAGENS DO USUÁRIO-------------------
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao fazer upload da imagem: ", error);
    }
  };

  const handleFileChange = (index) => (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.classList.add("choose_image");

        uploadImage(file);

        pictureImageRefs[index].current.innerHTML = "";
        pictureImageRefs[index].current.appendChild(img);
      };
      reader.readAsDataURL(file);
      console.log(file);
    } else {
      pictureImageRefs[index].current.innerHTML = "+";
    }
  };

  const renderImageProfiles = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <div className="image_profile" key={index}>
        <label className="picture" tabIndex={0}>
          <input
            type="file"
            accept="image/*"
            className="picture_input"
            ref={inputFileRefs[index]}
            onChange={handleFileChange(index)}
          />
          <span ref={pictureImageRefs[index]} className="picture_image">
            +
          </span>
        </label>
      </div>
    ));
  };

  //--------------------------------------------------------------------

  //-----------API DO SPOTIFY E SELECIONAR MÚSICA-------------------
  let info = "-------------------------------------------- artur";
  const [searchInput, setSearchInput] = useState("");
  const [accessAPIToken, setAccessAPIToken] = useState("");
  const [musicaPesquisa, setMusicaPesquisa] = useState("");

  const CLIENT_ID = "6e405048be884c30afdb08703ad691a5";
  const CLIENT_SECRET = "c8aff7e35fc9480485a820872499ebeb";

  useEffect(() => {
    //acesso a api
    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setAccessAPIToken(data.access_token));
  }, []);

  async function search() {
    console.log("Procurando por " + searchInput);
    console.log(accessAPIToken);

    var songParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessAPIToken}`,
      },
    };

    var songs = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      songParameters
    )
      .then((response) => response.json())
      .then((data) => setMusicaPesquisa(data.tracks.items.slice(0, 5)));
  }

  const [song, setSong] = useState("");
  function musicaSelecionada(list) {
    setSong(list);
    setMusicaPesquisa(false);

    console.log(list);
  }

  //--------------------------------------------------------------------

  //-----------DADOS DO USUÁRIO-------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("@sga.pucminas.br");
  const [birth, setBirth] = useState("");
  const [course, setCourse] = useState("");
  const [campus, setCampus] = useState("");
  const [insta, setInsta] = useState("");
  const [intention, setIntention] = useState("");
  const [orientation, setOrientation] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  var userInfo = sessionStorage.getItem("userData");
  userInfo = JSON.parse(userInfo);

  useEffect(() => {
    // //INFOS CONTA
    // let dataNasc = userInfo.birthDate.split("-"); //formatar data de nascimento
    // setName(userInfo.name);
    // setEmail(userInfo.email);
    // setBirth(dataNasc[1] + "/" + dataNasc[2] + "/" + dataNasc[0]);
    // setCourse(userInfo.course);
    // setCampus(userInfo.campus);

    // //INFOS PERFIL
    // setInsta(userInfo.instagram);
    // setIntention(userInfo.intention);
    // [];
    // //setOrientation(userInfo.name);
    // console.log(userInfo);

    if (userInfo) {
      //configurando os estados com os dados do usuário, se existirem
      let dataNasc = userInfo.birthDate ? userInfo.birthDate.split("-") : "";
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
      setBirth(dataNasc ? `${dataNasc[1]}/${dataNasc[2]}/${dataNasc[0]}` : "");
      setCourse(userInfo.course || "");
      setCampus(userInfo.campus || "");
      setInsta(userInfo.instagram || "");
      setIntention(userInfo.intention || "");
      setOrientation(userInfo.aboutUser.orientation || "");
      setGender(userInfo.aboutUser.gender || ""); 
      setPhoneNumber(userInfo.phoneNumber || "");
      setSong(userInfo.aboutUser.profileSong.songTitle || "");
      setSelectedInterests(userInfo.interests || []);
      setText(userInfo.aboutUser.description || "");
    }

  }, []);

  function decideEmoji(intention) {
    if (intention == "FRIENDSHIP") {
      return " Amizades 😁";
    } else if (intention == "SERIOUS_RELATIONSHIP") {
      return " Um relacionamento sério 🥰";
    } else {
      return " Algo casual 🥰";
    }
  }

  //--------------------------------------------------------------------

  //-----------LOGOUT-------------------
  const [counter, setCounter] = useState(3);
  const [statusLogout, setstatusLogout] = useState(false);

  function logout() {
    setstatusLogout(true);
  }

  useEffect(() => {
    if (statusLogout && counter > 0) {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("matches");
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
        console.log(counter);
      }, 1000);
      return () => clearInterval(interval);
    } else if (statusLogout && counter <= 0) {
      setstatusLogout(false);
      navigate("/");
    }
  }, [statusLogout, counter]);

  const [text, setText] = useState("");

  //----------INTERESSES-------------
  const [openModal, setOpenModal] = useState(false); // Adicionando o estado para controlar a abertura do modal
  const [opcoes, setOpcoes] = useState([]);
  const [placeholder, setPlaceholder] = useState("Clique aqui para escolher");
  const [selectedInterests, setSelectedInterests] = useState([]);

  useEffect(() => {
    api
      .get("/interests")
      .then((response) => setOpcoes(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Configura os interesses a partir do estado selecionado
  //     data.interests = selectedInterests;

  //     // Envia os dados para o servidor
  //     const response = await axios.post(
  //       "http://localhost:8080/auth/register",
  //       data
  //     );

  //     console.log("Registration successful", response.data);
  //     alert("Registrado com sucesso");
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Registration failed", error);
  //   }
  // };

  const handleInterestSelect = (interest) => {
    // Verifica se o interesse já foi selecionado
    const isAlreadySelected = selectedInterests.includes(interest);
    let updatedInterests = [];

    if (isAlreadySelected) {
      // Remove o interesse da lista de selecionados
      updatedInterests = selectedInterests.filter(
        (selected) => selected !== interest
      );
    } else {
      // Adiciona o interesse à lista de selecionados
      updatedInterests = [...selectedInterests, interest];
    }

    setSelectedInterests(updatedInterests);
    setPlaceholder(updatedInterests.join(", "));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    //formatar data de nascimento
    const formattedBirthDate = birth.split("/").reverse().join("-");

    //json com os dados do usuário
    const userInfoObj = {
      name,
      email,
      birthDate: formattedBirthDate,
      course,
      campus,
      instagram: insta,
      interests: userInfo.interests,
      matches: userInfo.matches,
      // interests: selectedInterests.map(interest => ({
      //   id: {
      //     timestamp: Date.parse(interest.date) / 1000,
      //     date: interest.date
      //   },
      //   interest: interest.interest,
      //   name: interest.name
      // })),
      aboutUser: {
        description: text,
        profileSong: {
          songTitle: song.name,
          author: song.artists[0].name,
          songImgUrl: song.preview_url,
          songUrl: song.href
        },
        orientation: orientation,
        gender: gender 
      },
      phoneNumber: phoneNumber, 
      intention: intention 
    };
    console.log(userInfoObj)

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/users/update/${userInfo.id}`,
        userInfoObj,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data) {
        sessionStorage.removeItem("userData");
        sessionStorage.setItem("userData", JSON.stringify(response.data));
      }

      console.log("Perfil atualizado com sucesso", response.data);
      alert("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar perfil", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=" bg-cover w-full h-full bg-[url('../src\assets\background-linhas.svg')]"
    >
      {statusLogout && (
        <Modal
          text1={
            <h4 className="font-normal">
              Deslogando do Puc
              <strong>
                <font color="#AD5E5E">LOVE</font>
              </strong>
              !{" "}
            </h4>
          }
          text2={
            <p className="font-thin">
              Nem saiu, mas já estou com saúdadess😥... Deslogando em {counter}
            </p>
          }
          txtBtn1="Tchau PucLove🖐"
        />
      )}
      <img
        onClick={imgWorkMode}
        id="img_work"
        className="h-[100vh] cursor-pointer hidden"
        src={imgwork_mode}
      ></img>

      <div iv id="config_page" className="container-config">
        <div className="wrap-config">
          <div className="topo">
            <div className="title_config">
              <h1>Configurações</h1>
            </div>
          </div>

          <div className="voltar" onClick={() => navigate("/matches")}>
            <a>
              <img className="img_return" src={voltar} alt="voltar" />
            </a>
            <button className="text_return">Voltar</button>
          </div>

          <div className="info_conta">
            <h2 className="title_conta">Conta</h2>
            <div className="subinfo_conta">
              <h3 className="subtitle_config">Nome</h3>
              <h3 className="description">{name}</h3>
              <h3 className="subtitle_config">E-mail</h3>
              <h3 className="description">{email}</h3>
              <h3 className="subtitle_config">Senha</h3>
              <h3 className="description">********</h3>
              <h3 className="subtitle_config">Data de Nascimento</h3>
              <h3 className="description">{birth}</h3>
              <h3 className="subtitle_config">Curso</h3>
              <h3 className="description">{course}</h3>
              <h3 className="subtitle_config">Campus</h3>
              <h3 className="description">{campus}</h3>

              <div className="buttons_conta">
                <div className="logout">
                  <button className="text_button" onClick={logout}>
                    Logout
                  </button>
                  <a onClick={logout}>
                    <img className="img_exit" src={voltar} alt="voltar" />
                  </a>
                </div>

                <div className="work_mode" onClick={imgWorkMode}>
                  <button className="text_button">Modo de Trabalho</button>
                  <a>
                    <img
                      className="img_workmode"
                      src={work_mode}
                      alt="modo de trabalho"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="info_perfil">
            <hr className="divider"></hr>

            <h2 className="title_conta">Perfil</h2>
            <form className="config-form" onSubmit={handleUpdateSubmit}>
              <div className="form-input">
                <h4>Selecione seus interesses</h4>
                <input
                  className="input_config"
                  type="text"
                  placeholder={placeholder}
                  onClick={() => setOpenModal(true)} // Abrir o modal ao clicar no input
                />
                {openModal && ( // Renderizar o modal se openModal for true
                  <Interesses
                    opcoes={opcoes}
                    closeModal={() => setOpenModal(false)} // Fechar o modal ao chamar essa função
                    handleInterestSelect={handleInterestSelect}
                  />
                )}
              </div>

              <div className="form-input">
                <h4>Qual o seu instagram?</h4>
                <input
                  value={insta}
                  className="input_config"
                  type="text"
                  placeholder={insta}
                  onChange={(e) => setInsta(e.target.value)}
                />
              </div>
              <div className="form-input">
                <h4>Sua música predileta</h4>
                <input
                  className="input_config"
                  type="text"
                  placeholder="Nome da musica predileta."
                  onKeyUp={(e) => {
                    console.log("Digitando");
                    if (e.key === "Enter") {
                      console.log("Pressed enter");
                      search();
                    }
                  }}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
                {musicaPesquisa != "" ? (
                  <div id="musics" className="musics">
                    {musicaPesquisa.map((list) => (
                      <div
                        id="song"
                        key={list.id}
                        onClick={() => musicaSelecionada(list)}
                        className="song"
                      >
                        <div id="imgSong">
                          <img
                            className="imgsong"
                            src={list.album.images[0].url}
                            alt=""
                          />
                        </div>

                        <div id="txtSong">
                          <h1 className="artists_name">{list.name}</h1>
                          <p className="artists_name">{list.artists[0].name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="form-input">
                <h4>O que você busca?</h4>
                <select
                  className="input_config"
                  id="intencao"
                  name="intention"
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                >
                  <option value="">Selecionar</option>
                  <option value="FRIENDSHIP">Amizades 😁</option>
                  <option value="SERIOUS_RELATIONSHIP">
                    {" "}
                    Um relacionamento sério 🥰
                  </option>
                  <option value="SOMETHING_CASUAL"> Algo casual 🥰</option>
                </select>
              </div>

              <div className="form-input_about">
                <h4>Fale sobre você</h4>
                <textarea
                value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  className="input_config_about"
                  placeholder="Escreva sobre você..."
                ></textarea>
              </div>
              <div className="form-input">
                <h4>Orientação Sexual</h4>
                <select
                  className="input_config"
                  id="orientacao"
                  value={orientation}
                  onChange={(e) => {
                    setOrientation(e.target[e.target.selectedIndex].text);
                  }}
                >
                  <option value="">Clique aqui para escolher</option>
                  <option value="Heterossexual">Heterossexual</option>
                  <option value="Homossexual">Homossexual</option>
                  <option value="Bissexual">Bissexual</option>
                  <option value="Assexual">Assexual</option>
                  <option value="Pansexual">Pansexual</option>
                </select>
              </div>
              <div className="form-input">
                <h4>Gênero</h4>
                <select 
                  className="input_config" 
                  id="genero"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target[e.target.selectedIndex].text);
                  }}>
                  <option value="">Clique aqui para escolher</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Transgênero">Transgênero</option>
                  <option value="Gênero Neutro">Gênero Neutro</option>
                  <option value="Não Binário">Não Binário</option>
                </select>
              </div>
              <div className="form-input">
                <h4>Adicione seu número</h4>
                <input
                  className="input_config z-0"
                  type="text"
                  placeholder="(DDD) X XXXX-XXXX"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
              <div className="save-button">
                <div className="config_save">
                  <button className="text_save" onClick="">
                    Salvar
                  </button>
                  <a onClick={() => navigate("/")}></a>
                </div>
              </div>
            </form>
          </div>

          <div className="images">{renderImageProfiles()}</div>

          <div className="info_segurança">
            <hr className="divider"></hr>
            <h2 className="title_security">Segurança</h2>
            <div className="config_security">
              <button className="text_button" onClick={logout}>
                Desejo excluir minha conta
              </button>
              <a onClick={() => navigate("/")}></a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Configuracao;
