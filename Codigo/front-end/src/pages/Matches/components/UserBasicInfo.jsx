import {calculaIdade} from "../../../hooks/useCustom";

export default function UserBasicInfo({compatibleUser}) {
    return (
        <div>
            <h3 className="text-2xl font-semibold ">{compatibleUser?.name} - {calculaIdade(compatibleUser?.birthDate)}</h3>
            <h4 className="text-sm font-medium ">{compatibleUser?.course}</h4>
            <h4 className="text-sm font-light">{compatibleUser?.campus}</h4>
        </div>
    )
}