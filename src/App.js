import "./App.css";
import ChatForm from "./Components/ChatForm";
import Header from "./Components/Header";
import AnswerSec from "./Components/Answer";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const responseGenerate = async (inputText, setInputText) => {
    try {
      let options = {
        prompt: `Complete this sentence: "${inputText}"`,
        model: "gpt-3.5-turbo",
        max_tokens: 100,
        n: 1,
        stop: ".",
      };

      let completeOptions = {
        ...options,
        prompt: inputText,
      };

      const response = await openai.createCompletion(completeOptions);

      if (response.data.choices) {
        setMessages([
          {
            question: inputText,
            answer: response.data.choices[0].text,
          },
          ...messages,
        ]);
        setInputText("");
      }
    } catch (error) {
      console.error("An error occurred while generating response:", error);
      // Handle the error here, such as displaying an error message to the user
      // or logging the error for debugging purposes
    }
  };

  return (
    <div className="App">
      <Header />
      <ChatForm responseGenerate={responseGenerate} />
      <AnswerSec messages={messages} />
    </div>
  );
};

export default App;
