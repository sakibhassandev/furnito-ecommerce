import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Share2, Linkedin, Twitter, Facebook } from "lucide-react";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

export const OurTeamMember = ({ name, role, image }: TeamMemberProps) => {
  const [showSocial, setShowSocial] = useState(false);

  return (
    <motion.div
      className="relative group px-4 sm:px-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={image}
          alt={name}
          className="w-full h-[400px] sm:h-[300px] object-cover"
          width={1920}
          height={1080}
        />
        <motion.div
          className="absolute right-4 top-4 flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
            <Mail size={20} />
          </button>
          <button
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            onClick={() => setShowSocial(!showSocial)}
          >
            <Share2 size={20} />
          </button>
        </motion.div>

        {showSocial && (
          <motion.div
            className="absolute left-4 bottom-4 flex gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button className="p-2 bg-white text-[#0077B5] rounded hover:bg-gray-100">
              <Linkedin size={20} />
            </button>
            <button className="p-2 bg-white text-[#1DA1F2] rounded hover:bg-gray-100">
              <Twitter size={20} />
            </button>
            <button className="p-2 bg-white text-[#4267B2] rounded hover:bg-gray-100">
              <Facebook size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </motion.div>
  );
};
