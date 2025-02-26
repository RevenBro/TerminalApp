"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const WELCOME_MESSAGE = "Welcome to Terminal v1.0.0\nType 'help' to see available commands"

const Terminal: React.FC = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState(WELCOME_MESSAGE)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCommand(input)
    setInput("")
  }

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    let response = ""

    switch (trimmedCmd) {
      case "help":
        response =
          "Available commands:\n- help: Show this help message\n- clear: Clear the terminal\n- date: Show current date and time\n- echo [text]: Print the text\n- about: Show information about this terminal"
        break
      case "clear":
        setOutput("")
        return
      case "date":
        response = new Date().toLocaleString()
        break
      case "about":
        response = "This is a simple terminal emulator created with React and Next.js."
        break
      default:
        if (trimmedCmd.startsWith("echo ")) {
          response = trimmedCmd.slice(5) // Remove 'echo ' from the start
        } else {
          response = `Command not found: ${cmd}. Type 'help' for available commands.`
        }
    }

    setOutput((prev) => `${prev}\n$ ${cmd}\n${response}`)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-[#300a24] rounded-lg shadow-lg overflow-hidden w-full max-w-3xl h-[80vh] flex flex-col">
        <div className="flex items-center bg-gray-800 px-4 py-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div ref={terminalRef} className="p-4 flex-grow overflow-y-auto custom-scrollbar">
          <pre className="whitespace-pre-wrap text-green-400 font-mono text-sm">{output}</pre>
        </div>
        <form onSubmit={handleInputSubmit} className="p-4 bg-[#300a24] border-t border-gray-700">
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow bg-transparent outline-none text-green-400 font-mono text-sm"
              autoFocus
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Terminal

