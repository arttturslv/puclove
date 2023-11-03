import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import voltar from "../assets/Icones/icon voltar.svg";
import work_mode from "../assets/Icones/icon workmode.svg";
import "../stylesConfig.css";

const Configuracao = () => {
  const navigate = useNavigate();
  // Inicializa referências para as imagens e arquivos de entrada
  const pictureImageRefs = Array.from({ length: 6 }, () => useRef(null));
  const inputFileRefs = Array.from({ length: 6 }, () => useRef(null));

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Aqui você pode lidar com a resposta da solicitação de upload, se necessário
      console.log(response.data); // A resposta pode conter o caminho da imagem salva no sistema de arquivos
    } catch (error) {
      // Se ocorrer um erro durante o upload
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

        // função de upload de imagem 
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

  // Função para renderizar os perfis de imagem
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

  return (
    <div className="container-config">
      <div className="wrap-config">
        <div className="topo">
          <div className="title_config">
            <h1>Configurações</h1>
          </div>
        </div>
        <div className="info_conta">
          <h2 className="title_conta">Conta</h2>
          <div className="subinfo_conta">
            <h3 className="subtitle_config">Nome</h3>
            <h3 className="description">Giovana Mello Calcique Nunes</h3>
            <h3 className="subtitle_config">E-mail</h3>
            <h3 className="description">meuemail@sga.pucminas.br</h3>
            <h3 className="subtitle_config">Senha</h3>
            <h3 className="description">*********</h3>
            <h3 className="subtitle_config">Data de Nascimento</h3>
            <h3 className="description">19/05/2001</h3>
            <h3 className="subtitle_config">Curso</h3>
            <h3 className="description">Psicologia</h3>
            <h3 className="subtitle_config">Campus</h3>
            <h3 className="description">São Gabriel</h3>

            <div className="buttons_conta">
              <div className="logout">
                <button className="text_button" onClick={() => navigate("/")}>
                  Logout
                </button>
                <a onClick={() => navigate("/")}>
                  <img className="img_return" src={voltar} alt="voltar" />
                </a>
              </div>

              <div className="work_mode">
                <button className="text_button" onClick={() => navigate("/")}>
                  Modo de Trabalho
                </button>
                <a onClick={() => navigate("/")}>
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
          <form className="config-form">
            <div className="form-input">
              <h4>Selecione seus interesses</h4>
              <input
                className="input_config"
                type="email"
                placeholder="Gatos, UFC, Livros, Skyrim"
              />
            </div>
            <div className="form-input">
              <h4>Qual o seu instagram?</h4>
              <input
                className="input_config"
                type="text"
                placeholder="@Gio_mello"
              />
            </div>
            <div className="form-input">
              <h4>Sua música predileta</h4>
              <input
                className="input_config"
                type="text"
                placeholder="The Dragonborn Comes - Malukah"
              />
            </div>
            <div className="form-input">
              <h4>O que você busca?</h4>
              <input
                className="input_config"
                type="text"
                placeholder="Algo casual, nas noites de sexta."
              />
            </div>
            <div className="form-input_about">
              <h4>Fale sobre você</h4>
              <textarea
                className="input_config_about"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ></textarea>
            </div>
            <div className="form-input">
              <h4>Orientação Sexual</h4>
              <select className="input_config" id="orientacao">
                <option value="">Clique aqui para escolher</option>
                <option value="1">Heterossexual</option>
                <option value="2">Homossexual</option>
                <option value="3">Bissexual</option>
                <option value="4">Assexual</option>
                <option value="4">Pansexual</option>
              </select>
            </div>
            <div className="form-input">
              <h4>Gênero</h4>
              <select className="input_config" id="orientacao">
                <option value="">Clique aqui para escolher</option>
                <option value="1">Masculino</option>
                <option value="2">Feminino</option>
                <option value="3">Bissexual</option>
                <option value="4">Assexual</option>
                <option value="4">Pansexual</option>
              </select>
            </div>
          </form>
        </div>

        <div className="images">{renderImageProfiles()}</div>

        <div className="info_segurança">
          <hr className="divider"></hr>
          <h2 className="title_security">Segurança</h2>
          <div className="config_security">
            <button className="text_button" onClick={() => navigate("/")}>
              Desejo excluir minha conta
            </button>
            <a onClick={() => navigate("/")}></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracao;
