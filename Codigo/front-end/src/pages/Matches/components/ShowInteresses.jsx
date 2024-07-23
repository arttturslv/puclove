export default function ShowInteresses({interests, interestsList}) {
    return (
        <div className="flex flex-wrap w-[90%]">
            {interests.map(item => {
                console.log("inter ", interestsList[3], "\ni ", item);

                const hasEqualInterests = interestsList.some(interest => interest.name === item.name);
                if (hasEqualInterests) {
                    return (
                        <span className="border border-vermelhoSanguino px-3 mx-1 my-1 text-sm bg-vermelhoSanguino text-amareloPalido font-semibold rounded-lg">
                            {item.name}
                        </span>

                    )
                } else {
                    return (
                        <span className="border border-amareloOcre px-3 mx-1 my-1 text-sm text-amareloPalido font-semibold rounded-lg">
                            {item.name}
                        </span>
                    )
                }

            })}
        </div>
    )
}