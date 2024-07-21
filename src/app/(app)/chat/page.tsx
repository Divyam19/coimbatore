'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import Loading from "@/app/loading";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY   as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }
    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      console.log(response);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending content:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setUserInput("");
  };

  return (
    <div className="container m-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Chat Bot</h1>
      <div className="chat-container rounded-lg shadow-md p-4">
        <ChatHistory chatHistory={chatHistory} />
        {isLoading && <Loading />}
      </div>
      <div className="flex mt-4">
        <Input
          type="text"
          className="flex-grow px-4 py-2 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="Type your message"
          value={userInput}
          onChange={handleUserInput}
        />
        <Button
          className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-black hover:bg-blue-600 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </Button>
        <Button className="px-4 py-2 ml-2 rounded-lg bg-red-400 hover:bg-red-600 rounded-xl" onClick={clearChat}>
            Clear Chat
        </Button>
      </div>
      
    </div>
  );
};

export default Chat;




// 'use client'
// import { Input } from "@/components/ui/input";
// import { getGroqResponse } from "@/lib/api/groq";
// import { Ghost } from "lucide-react";
// import { send } from "process";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { useState } from "react"
// import Loading from "@/app/loading";
// import { Button } from "@/components/ui/button";
// import ChatHistory from "./ChatHistory";


// const Chat=()=>{
//     const[userInput,setUserInput]=useState("");
//     const [chatHistory, setChatHistory] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

//     const   model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    

//     const handleUserinput=(e:any)=>{
//         setUserInput(e.target.value);
//     };

//     const sendMessage=async()=>{
//         if(userInput.trim()===""){
//             return;
//         }
//         setIsLoading(true);
//         try{
//             const result= await model.generateContent(userInput);
//             const response=await result.response;
//             console.log(response);
//             setChatHistory([
//                 ...chatHistory,
//                 { type: "user", message: userInput },
//                 { type: "bot", message: response.text() },
//               ]);

//         }catch{
//             console.error("Error sending content");
//         }finally{
//             setUserInput("")
//             setIsLoading(false);
//         }
//     };

//     const clearChat=()=>{
//         setChatHistory([]);
//     };

//     return(
//         <div className="container m-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-4">Chat Bot</h1>
//             <div className="chat-container rounded-lg sadow-md p-4">
//                 <ChatHistory chatHistory={chatHistory}/>
//                 {/* <Loading isLoading={isLoading}/> */}

//             </div>

//             <div className="flex mt-4">
//                 <Input
//                     type="text"
//                     className="flex-grow px-4 py-2 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
//                     placeholder="Type your message"
//                     value={userInput}
//                     onChange={handleUserinput}
//                 />
            
//                 <Button
//                     className="px-4 py-2 ml rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
//                     onClick={sendMessage}
//                     disabled={isLoading}
//                 >
//                     Send
//                 </Button>
//             </div>
//             <Button  className="bg-red-500 hover:bg-red-600 rounded-xl" onClick={clearChat}>
//                 Clear Chat
//             </Button>

//         </div>

//     )
// }

// export default Chat