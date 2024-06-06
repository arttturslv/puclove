import React from 'react';
import Input from "../Input";

export default function CadastroUm ({setSignProgress, register, errors, watch}){

    return (
      <>
          <span className="font-semibold text-[#fff] text-[20px] text-center mb-[10px]">Cadastre e conheça seu amor</span>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite seu nome</h4>
              <Input
                type="name"
                name="name"
                placeholder="Fala seu nome pra gente :)"
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Preencha o campo de nome*"
              }}
              required
            />
            </div>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite o e-mail</h4>
              <Input
                type="email"
                name="email"
                placeholder="email@sga.pucminas.br"
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Preencha o campo de email*",
                  validate: value => value.includes("@sga.pucminas.br") || "O email deve conter: @sga.pucminas.br"
              }}
              required
            />
            </div>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite a senha</h4>
              <Input
                showPass={true}
                type="password"
                name="password"
                placeholder="*********"
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Preencha o campo de senha*",
                  minLength: {
                    value: 7,
                    message: "A senha está menor que o tamanho mínimo*"
                  }
                }}
              required
            />
            </div>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Confirme a senha</h4>
              <Input
                showPass={true}
                type="password"
                name="passwordConfirm"
                placeholder="*********"
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Preencha o campo de email*",
                  validate: value => value === watch('password') || 'As senhas não batem*'
                }}
              required
            />
            </div>

            <div>
              <h4 className=" font-semibold text-[#fff] my-[3px] text-[15px]">Digite seu telefone</h4>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="(99) 99999-9999"
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Preencha o campo de telefone*",
                  minLength: {
                    value: 11,
                    message: "O número de telefone está incompleto*"
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Digite apenas números*"
                  }
                }}
              required
            />
            </div>

            <div className="justify-center flex py-4">
              <button onSubmit={()=> console.log("enviando...")} className=" font-extrabold hover:text-[#e2c09b] text-[#fff] hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl  w-[180px] h-[45px] mt-[10px] text-center">Continuar</button>
            </div>

</>
    )
};

          