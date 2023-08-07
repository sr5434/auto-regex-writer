'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [code, setCode] = useState('');
  const [tests, setTests] = useState('');
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat({
      body: {
        code
      },
      api: "/api/chat",
      onResponse() {},
    });
  const submitHandler = async (e: any) => {
    await setCode(input);
    handleSubmit(e);
  }
  const lastMessage = messages[messages.length - 1];
  const generatedTest = lastMessage?.role === "assistant" ? lastMessage.content : "";

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center content-center justify-center py-2 min-h-screen container">
      <h1 className="text-5xl font-extrabold">Auto Regex Writer</h1>
      <p>Regular Expressions are hard to write. So, this app will write them for you!</p>
      <br />
      <form onSubmit={submitHandler}>
        <label className="block mb-2 pt-6 text-sm font-medium text-gray-900 dark:text-white" htmlFor="codeInput">Describe what regular expression you want and we will use AI to write it:</label>
        <textarea
          id="codeInput"
          value={input}
          onChange={handleInputChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <br />
        <button 
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-40 shadow-lg"
          >
          Generate RegEx
        </button>
      </form>
      <ReactMarkdown className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{generatedTest}</ReactMarkdown>
    </div>
  )
}
