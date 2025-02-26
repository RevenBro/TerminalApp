"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"

const WELCOME_MESSAGE = "Welcome to Terminal v1.0.0\nType 'help' to see available commands"

interface OutputItem {
  type: string
  content: string | React.ReactNode
}

const Terminal: React.FC = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<OutputItem[]>([{ type: "welcome", content: WELCOME_MESSAGE }])
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
    let response: OutputItem | null = null

    switch (trimmedCmd) {
      case "help":
        response = {
          type: "help",
          content:
            "Available commands:\n- help: Show this help message\n- whoami: Display information about me\n- role: Display my professional role\n- clear: Clear the terminal\n- date: Show current date and time\n- echo [text]: Print the text\n- about: Display detailed information about me\n- links: Show my social media links",
        }
        break
      case "clear":
        setOutput([{ type: "welcome", content: WELCOME_MESSAGE }])
        return
      case "date":
        response = { type: "date", content: new Date().toLocaleString() }
        break
      case "whoami":
        response = { type: "whoami", content: "Abdullokh Saidakbarov" }
        break
      case "role":
        response = { type: "role", content: "Frontend Developer" }
        break
      case "about":
        response = {
          type: "about",
          content:
            "Aspiring Frontend Developer with a strong foundation in React.js and TypeScript. Passionate about continuous learning and eager to explore backend development. Committed to becoming a versatile full-stack developer. 🚀",
        }
        break
      case "links":
        response = {
          type: "links",
          content: (
            <div>
              <p>Here are my social media links:</p>
              <ul>
                <li>
                  <a
                    href="https://t.me/Saidakbarovv_A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/abdullakh_bro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:underline"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RevenBro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          ),
        }
        break
      default:
        if (trimmedCmd.startsWith("echo ")) {
          response = { type: "echo", content: trimmedCmd.slice(5) }
        } else {
          response = { type: "error", content: `Command not found: ${cmd}. Type 'help' for available commands.` }
        }
    }

    setOutput((prev) => [...prev, { type: "input", content: cmd }, response!])
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
          {output.map((item, index) => (
            <pre key={index} className={`whitespace-pre-wrap font-mono text-sm ${getTextColor(item.type)}`}>
              {item.type === "input" ? `$ ${item.content}` : item.content}
            </pre>
          ))}
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

function getTextColor(type: string): string {
  switch (type) {
    case "welcome":
      return "text-blue-400"
    case "help":
      return "text-yellow-400"
    case "input":
      return "text-green-400"
    case "error":
      return "text-red-400"
    case "about":
      return "text-purple-400"
    case "links":
      return "text-cyan-400"
    default:
      return "text-white"
  }
}

export default Terminal

