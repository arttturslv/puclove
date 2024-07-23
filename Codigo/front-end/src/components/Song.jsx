import externalLink from "../assets/Icons/send.svg";

export default function SongOptions ({musica}) {
    const name = musica.name;
    const album = musica.album.name;
    const author = musica.artists[0].name;
    const imageURL = musica.album.images[2].url;
    const songURL = musica.external_urls.spotify;

    return  (
        <div className="rounded-lg group cursor-pointer  hover:text-amareloOcre bg-cinzaWhite flex gap-3 h-20 items-center">
        <div className="relative h-fit w-fit py-2 px-1.5 ">
            <img className="w-[4.2rem] relative rounded-md" src={imageURL} alt={"Capa da música - " + name} />
            <a href={songURL} target="blank" className="z-30 group-hover:opacity-100 opacity-0 absolute left-[30%] top-[32%] transition-all duration-200">
                <img className="w-8" src={externalLink} alt="" srcset="" />
            </a>
        </div>

        <div className="w-[70%]">
            <p className="font-semibold overflow-hidden truncate text-amareloOcre">{name}</p>
            <p className="text-sm overflow-hidden truncate text-amareloOcre">{author + " - " + album}</p>
            <p className="text-xs group-hover:visible invisible text-amareloOcre transition-all duration-100 ">Reproduzir no Spotify</p>

        </div>
    </div>
    )
}