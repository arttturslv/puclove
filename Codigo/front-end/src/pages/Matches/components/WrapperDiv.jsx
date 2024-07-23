export default function WrapperDiv({title, children }) {
    return (
        <div className="space-y-2 bg-cinzaBlack pt-2 pb-4 px-2 rounded-lg">
        <h5 className="text-sm text-amareloOcre font-semibold">{title}</h5>
        <div className="rounded-lg h-auto bg-cinzaWhite flex gap-3 items-center">
            {children }
        </div>
        </div>
    )
}