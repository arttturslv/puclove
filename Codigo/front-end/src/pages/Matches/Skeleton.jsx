import { } from "react-router-dom";
import React from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
export default function MatchesSkeleton() {

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                id="pagMatch" className="w-full h-screen bg-amareloOcre overflow-hidden ">

                <span className="w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">

                    <span className="m-4 flex gap-6 w-auto justify-center h-20"> 
                        <figure className="block w-12 h-12 bg-vermelhoSanguino rounded-full animate-pulse"/>
                        <figure className="block w-12 h-12 bg-vermelhoSanguino/80 rounded-full "/>
                        <figure className="block w-12 h-12 bg-vermelhoSanguino rounded-full animate-pulse"/>
                    </span> 

                    <span className="flex gap-6 w-auto justify-center "> 
                        <figure className="block w-[400px] h-[800px] bg-vermelhoSanguino/40 rounded-t-2xl">   
                            <span className="my-12 flex gap-12 w-auto justify-center relative top-[600px]">
                                <figure className="block w-12 h-12 bg-vermelhoSanguino rounded-full animate-pulse	"/>
                                <figure className="block w-12 h-12 bg-vermelhoSanguino rounded-full animate-pulse"/>
                                <figure className="block w-12 h-12 bg-vermelhoSanguino rounded-full animate-pulse"/>
                            </span>
                            <span className="gap-12 justify-center space-y-2 relative top-[400px] left-12">
                                <figure className="block w-56 h-6 bg-vermelhoSanguino/80 animate-pulse "/>
                                <figure className="block w-44 h-4 bg-vermelhoSanguino/80 animate-pulse"/>
                                <figure className="block w-44 h-4 bg-vermelhoSanguino/80 animate-pulse"/>
                            </span>    
                        </figure>
                    </span>
                </span>
            </motion.div>
        </div>
    )
}