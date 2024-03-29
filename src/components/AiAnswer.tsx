import { useChatState } from "@yext/chat-headless-react";
import { AnimatePresence, motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";
import { useChatModeContext } from "../hooks";
import { cn } from "../utils/cn";
import { useEffect } from "react";
import MessageCard from "./cards/MessageCard";
import { HandThumbUpIcon } from "@heroicons/react/20/solid";

export default function AiAnswer() {
  const messages = useChatState((s) => s.conversation.messages);
  const firstBotMessage = messages.find((m) => m.source === "BOT");
  const isLoading = useChatState((s) => s.conversation.isLoading);
  const { chatMode } = useChatModeContext();

  useEffect(() => {
    const chatbox = document.getElementById("results");
    chatbox?.scrollTo({ top: 100, left: 100, behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={cn("flex w-full flex-col gap-4 rounded-2xl transition-all")}
    >
      {!firstBotMessage && isLoading && (
        <div className="flex flex-col gap-y-4 rounded-2xl bg-sky-100 p-4">
          <div className={cn("m-0 flex flex-row", chatMode && "hidden")}>
            <FaMagic className="my-auto mr-2 inline-block h-4 w-4" />
            <h3 className="my-0">Generating...</h3>
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={`bigdiv-${index}`}
              className={cn(" h-4 w-full overflow-hidden px-10")}
            >
              {/* The light beam div */}
              <motion.div
                key={`lildiv-${index}`}
                className=" bottom-0 left-0 top-0 w-full bg-gradient-to-r from-white to-blue-300"
                variants={{
                  start: { marginLeft: "-50%", opacity: 0 },
                  end: { marginLeft: "100%", opacity: 1 },
                }}
                initial="start"
                animate="end"
                transition={{
                  repeatDelay: 1,
                  delay: index * 0.25, // Delay each animation by 0.25s
                  duration: 1, // Animation duration
                  repeat: Infinity, // To loop the animation
                  ease: "linear", // To move at a constant speed
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
      {firstBotMessage && (
        <MessageCard message={firstBotMessage} idx={0} initial={true} />
      )}
      <AnimatePresence>
        {firstBotMessage && chatMode && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-8"
            id="chatbox"
          >
            {messages.slice(2).map((m, idx) => {
              return <MessageCard message={m} idx={idx} key={m.responseId} />;
            })}

            {isLoading && (
              <li className="flex py-2 transition-all">
                <span className="circle animate-loader"></span>
                <span className="circle animation-delay-200 animate-loader"></span>
                <span className="circle animation-delay-400 animate-loader"></span>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
