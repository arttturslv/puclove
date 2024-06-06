import externalLink from "../assets/Icons/send.svg";

export default function SongOptions ({setProfileSong, setSearchedSong, setSearchedList, musica}) {
    console.log("musica ", musica)
    const name = musica.name;
    const album = musica.album.name;
    const author = musica.artists[0].name;
    const imageURL = musica.album.images[2].url;
    const songURL = musica.external_urls.spotify;

    // function salvarMusica() {
    //     console.log("Musica escolhida: ");
    //     console.log(musica)
    //     setProfileSong({
    //         name,
    //         album,
    //         author,
    //         imageURL,
    //         songURL,
    //     });
    //     setSearchedList(undefined);
    //     setSearchedSong(name+" - "+album);
    // } 
    
    return  (
        <div onClick={() => salvarMusica()} className="rounded-lg group cursor-pointer  hover:text-amareloOcre bg-cinzaWhite flex gap-3 items-center">
            <img className="w-[20%] relative" src={imageURL} alt={"Capa da música - "+name} />
            <div className=" w-[70%] h-fit relative  ">
                <p className="font-semibold overflow-hidden truncate">{name}</p>
                <p className="text-sm overflow-hidden truncate">{author+" - "+album}</p>
                <a href={songURL} target="blank" className="hidden group-hover:block z-30 absolute bottom-0 right-0 p-2 cursor-pointer">
                    <img className="w-8" src={externalLink} alt="" srcset="" />
                </a>
            </div>
        </div>
    )
}