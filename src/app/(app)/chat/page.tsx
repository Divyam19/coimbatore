'use client'

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./ChatHistory";
import Loading from "@/app/loading";
import { getproducts } from "@/lib/api/queries";

const Chat = () => {
  const [products, setProducts] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProductsLoading, setIsProductsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsProductsLoading(true);
        const response = await getproducts();
        const data = JSON.parse(response);
        setProducts(data);
        
        setChatHistory([{ type: "bot", message: "Hi, I'm Sol Mate. I'm here to solve all your energy needs. How can I help you?" }]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setChatHistory([{ type: "bot", message: "Hi, I'm Sol Mate. I'm here to solve all your energy needs. How can I help you?" }]);
      } finally {
        setIsProductsLoading(false);
      }
    };
    fetchData();
  }, []);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
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
      const conversationHistory = chatHistory.map(entry =>
        `${entry.type === 'user' ? 'Human' : 'AI'}: ${entry.message}`
      ).join('\n');

      // Append product information to the user's input
      const enhancedUserInput = `${userInput}\n\nAvailable products: ${JSON.stringify(products)}`;

      const prompt = `${conversationHistory}\nHuman: ${enhancedUserInput}\nAI:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", message: userInput }, // Only show original user input in chat history
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
    setChatHistory([]);
    setUserInput("");
  };

  return (
    <div className="container m-auto ">
      <div className="text-4xl font-bold">Sol-Mate</div>
      <div className="chat-container rounded-lg shadow-md p-4">
        {isProductsLoading ? (
          <Loading />
        ) : (
          <ChatHistory chatHistory={chatHistory} />
        )}
        {isLoading && <Loading />}
      </div>
      <div className="flex mt-4">
        <Input
          type="text"
          className="flex-grow px-4 py-2 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="Type your message"
          value={userInput}
          onChange={handleUserInput}
        />
        <Button
          className="px-4 py-2 ml-2 rounded-lg bg-green-500 text-black hover:bg-green-600 focus:outline-none"
          onClick={sendMessage}
          disabled={isLoading || isProductsLoading}
        >
          Send
        </Button>
        <Button 
          className="px-4 py-2 ml-2 rounded-lg bg-red-400 hover:bg-red-600 rounded-xl" 
          onClick={clearChat}
        >
          Clear Chat
        </Button>
      </div>
    </div>
  );
};

export default Chat;




// 'use client'

// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ChatHistory from "./ChatHistory";
// import Loading from "@/app/loading";
// import { getproducts } from "@/lib/api/queries";
// import { get } from "http";

// const Chat = () => {
//   const [products, setProducts] = useState([]);
//   const productss = JSON.stringify(products);
//   const [userInput, setUserInput] = useState("");
//   const [chatHistory, setChatHistory] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [defaultMessage, setDefaultMessage] = useState(`Hi, I'm Sol Mate. I'm here to solve all your energy needs. How can I help you? \n Ask me anything. from the list of products below.${JSON.stringify(productss)}`);
//   console.log(JSON.stringify(productss));
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getproducts();
//       const data = JSON.parse(response);
//       setProducts(data);
//     };
//     fetchData();
//     setChatHistory([
//       { type: "bot", message: `Hi, I'm Sol Mate. I'm here to solve all your energy needs. How can I help you? \n Ask me anything. I know about ${JSON.stringify(products)} products.` },
//     ]);
//   }, []);

//   // console.log(products);
//   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

//   const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserInput(e.target.value);
//   };

//   const sendMessage = async () => {
//     if (userInput.trim() === "") {
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const conversationHistory = chatHistory.map(entry =>
//         `${entry.type === 'user' ? 'Human' : 'AI'}: ${entry.message}`
//       ).join('\n');

//       const prompt = `${conversationHistory}\nHuman: ${userInput}\nAI:`;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;

//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { type: "user", message: userInput },
//         { type: "bot", message: response.text() },
//       ]);
//     } catch (error) {
//       console.error("Error sending content:", error);
//     } finally {
//       setUserInput("");
//       setIsLoading(false);
//     }
//   };

//   const clearChat = () => {
//     setChatHistory([]);
//     setUserInput("");
//   };

//   useEffect(() => {
//     setChatHistory([
//       { type: "bot", message: defaultMessage },
//     ]);    
//   }, []);

//   return (
//     <div className="container m-auto px-4 py-8">
//       <div className="chat-container rounded-lg shadow-md p-4">
//         <ChatHistory chatHistory={chatHistory} />
//         {isLoading && <Loading />}
//       </div>
//       <div className="flex mt-4">
//         <Input
//           type="text"
//           className="flex-grow px-4 py-2 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
//           placeholder="Type your message"
//           value={userInput}
//           onChange={handleUserInput}
//         />
//         <Button
//           className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-black hover:bg-blue-600 focus:outline-none"
//           onClick={sendMessage}
//           disabled={isLoading}
//         >
//           Send
//         </Button>
//         <Button 
//           className="px-4 py-2 ml-2 rounded-lg bg-red-400 hover:bg-red-600 rounded-xl" 
//           onClick={clearChat}
//         >
//           Clear Chat
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


// 'use client'

// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ChatHistory from "./ChatHistory";
// import Loading from "@/app/loading";
// import { getproducts } from "@/lib/api/queries";
// import { get } from "http";

// const Chat = () => {
//   const [products, setProducts] = useState([]);

//   const [userInput, setUserInput] = useState("");
//   const [chatHistory, setChatHistory] = useState<any[]>([{ type: "bot", message: `Hi, I'm Sol Mate. I'm here to solve all your energy needs. How can I help you? \n Ask me anything. I know about ${products} products.` }]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [defaultMessage, setDefaultMessage] = useState("Hi, I'm Sol Mate. I'm here to solve all your energy needs. How can I help you? \n Ask me anything.");

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getproducts();
//       const data = JSON.parse(response);
//       setProducts(data);
//     };
//     fetchData();
//     setChatHistory([
//       { type: "bot", message: `Hi, I'm Sol Mate. I'm here to solve all your energy needs. How can I help you? \n Ask me anything. I know about ${JSON.stringify(products)} products.` },
//     ]);
//   }, []);

//   // console.log(products);
//   const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

//   const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserInput(e.target.value);
//   };

//   const sendMessage = async () => {
//     if (userInput.trim() === "") {
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const conversationHistory = chatHistory.map(entry =>
//         `${entry.type === 'user' ? 'Human' : 'AI'}: ${entry.message}`
//       ).join('\n');

//       const prompt = `${conversationHistory}\nHuman: ${userInput}\nAI:`;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;

//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { type: "user", message: userInput },
//         { type: "bot", message: response.text() },
//       ]);
//     } catch (error) {
//       console.error("Error sending content:", error);
//     } finally {
//       setUserInput("");
//       setIsLoading(false);
//     }
//   };

//   const clearChat = () => {
//     setChatHistory([]);
//     setUserInput("");
//   };

//   useEffect(() => {
//     setChatHistory([
//       { type: "bot", message: defaultMessage },
//     ]);    
//   }, []);

//   return (
//     <div className="container m-auto px-4 py-8">
//       <div className="chat-container rounded-lg shadow-md p-4">
//         <ChatHistory chatHistory={chatHistory} />
//         {isLoading && <Loading />}
//       </div>
//       <div className="flex mt-4">
//         <Input
//           type="text"
//           className="flex-grow px-4 py-2 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-600"
//           placeholder="Type your message"
//           value={userInput}
//           onChange={handleUserInput}
//         />
//         <Button
//           className="px-4 py-2 ml-2 rounded-lg bg-blue-500 text-black hover:bg-blue-600 focus:outline-none"
//           onClick={sendMessage}
//           disabled={isLoading}
//         >
//           Send
//         </Button>
//         <Button 
//           className="px-4 py-2 ml-2 rounded-lg bg-red-400 hover:bg-red-600 rounded-xl" 
//           onClick={clearChat}
//         >
//           Clear Chat
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Chat;