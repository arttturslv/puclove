export default function MatchPreview({ notificationQnt, image, name }) {
    return (
        <div style={{ backgroundImage: `url(${image})` }} className="h-40 cursor-pointer hover:scale-105 transition-all w-32 max-md:w-40 max-md:h-40 max-sm:w-32 max-sm:h-32 bg-cover bg-[#434343] rounded-xl relative shadow-lg">
            <div className=" h-full flex bg-gradient-to-t from-[#000]/60 rounded-xl pb-1 pl-3 px-2 items-end font-bold">
                <h1 className="overflow-hidden truncate whitespace-nowrap text-ellipsis">{name}aaaaaaaaaaaaaa</h1>
            </div>
            {
                notificationQnt &&
                <span className="absolute -top-2 z-50 cursor-pointer -right-1">
                    <span className="bg-vermelhoSanguino p-1 px-1 rounded-full font-bold text-[10px]">+{notificationQnt}</span>
                </span>
            }
        </div>
    )
}