import React, {useEffect, useState} from 'react';
import Input from "../Input";
import Interesses from '../Interesses'

export default function CadastroDois ({placeholder, arrayInteresses, setPlaceholder, setSignProgress, register, errors}){

      const [isInteressesOpen, setInteressesOpen] = useState(true);

    function isInteressesValid() {
      console.log(placeholder)
      if(placeholder.length>0) {
        return true;
      }
      return false;
    }

    useEffect(() => {
      console.log('mudou, verifica error');
      
    }, [placeholder])

    return (
        <>
          <span className="font-semibold text-[#fff] text-[20px] text-center mb-[10px]">Cadastre e conheça seu amor</span>
          
          {isInteressesOpen && (
            <Interesses
              closeModalInteresses={() => setInteressesOpen(!isInteressesOpen)}
              setPlaceholder={setPlaceholder}
              opcoes={arrayInteresses}
            />
          )}

          <div>
            <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Qual seu curso</h4>
            <Input
              type="text"
              name="course"
              placeholder="Compartilhe seu curso com a gente!"
              errors={errors}
              register={register}
              validationSchema={{
                required: "Preencha o campo de curso*"
            }}
            required
          />
          </div>

          {/* OTIMIZAR COM O CUSTOM INPUT DEPOIS */}
          <div>
            <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Qual seu campus?</h4>
            <select
              className="text-[14px] text-[#fff] w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343]" 
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
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Selecione seus interesses</h4>
              <Input
                type="text"
                name="interests"
                value={placeholder}
                placeholder="Escolha seus interesses"
                errors={errors}
                register={register}
                onClick={()=> setInteressesOpen(!isInteressesOpen)}
              required
            />
            {!isInteressesValid && (<p className="text-right text-[12px] text-vermelhoSanguino">Adicione ao menos 3 interesses*</p>)}
            </div>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Qual seu instagram?</h4>
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
            
            {/* REFATORAR COM CUSTOM INPUT DEPOIS */}
            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">O que você busca?</h4>
              <select
                className="text-[14px] text-[#fff] w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343]" 
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

            <div className="justify-center flex py-4">
              <button onClick={() => setSignProgress("first")} className=" font-extrabold hover:text-[#e2c09b] text-[#fff] hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl  w-[180px] h-[45px] mt-[10px] text-center">Voltar</button>
              <button onClick={() => setSignProgress("third")} className=" font-extrabold hover:text-[#e2c09b] text-[#fff] hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl  w-[180px] h-[45px] mt-[10px] text-center" >Continuar</button>
            </div>
        </>
    )
};
