import * as React from "react"

export default function ElzaDashboard() {
  const [state, setState] = React.useState<"idle" | "listening" | "thinking" | "responding" | "executing">("idle")
  const [input, setInput] = React.useState("")
  const [currentTime, setCurrentTime] = React.useState("")
  const [messages, setMessages] = React.useState([
    { role: "assistant", text: "elZa online. How can I assist you today?" },
  ])
  const [tasks, setTasks] = React.useState([
    { id: 1, title: "Finish UI direction", done: true },
    { id: 2, title: "Prepare mentor demo", done: false },
    { id: 3, title: "Add AI core states", done: false },
  ])

  const micButtonRef = React.useRef<HTMLButtonElement | null>(null)

  function simulateVoice() {
    setState("listening")
    window.setTimeout(() => setState("thinking"), 1400)
    window.setTimeout(() => {
      setState("responding")
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Voice mode is active. This is where real speech input and response states will connect later.",
        },
      ])
    }, 2800)
    window.setTimeout(() => setState("idle"), 4200)
  }

  function handleSend() {
    if (!input.trim()) return
    const text = input.trim()
    setMessages((prev) => [...prev, { role: "user", text }])
    setInput("")
    setState("thinking")

    window.setTimeout(() => {
      let reply = "I understood the command. This response is part of the investor demo flow."

      if (/task|add/i.test(text)) {
        setTasks((prev) => [
          ...prev,
          { id: Date.now(), title: text.replace(/add task:?/i, "").trim() || "New task", done: false },
        ])
        setState("executing")
        reply = "Task added successfully. elZa is ready to manage your workflow."
      }

      if (/hello|hi|hey/i.test(text)) {
        reply = "Hello. I am elZa, your personal AI system."
      }

      window.setTimeout(() => {
        setState("responding")
        setMessages((prev) => [...prev, { role: "assistant", text: reply }])
        window.setTimeout(() => setState("idle"), 900)
      }, 900)
    }, 1200)
  }

  React.useEffect(() => {
    const updateTime = () => {
        const now = new Date()
        setCurrentTime(
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        )
    }

    updateTime()
    const interval = window.setInterval(updateTime, 1000)

    return () => window.clearInterval(interval)
  }, [])

  function toggleTask(id: number) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
    setState("executing")
    window.setTimeout(() => setState("idle"), 900)
  }

  const stateLabel = {
    idle: "Idle",
    listening: "Listening",
    thinking: "Thinking",
    responding: "Responding",
    executing: "Task Executing",
  }[state]

  const stateHint = {
    idle: "Awaiting your next command",
    listening: "Waveform grows while elZa listens",
    thinking: "Inner motion rotates while processing",
    responding: "Outer ring brightens for response",
    executing: "Subtle progress pulse during action",
  }[state]

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0f1d33_0%,#07111f_35%,#03060d_70%,#02040a_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-6 py-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between rounded-3xl border border-cyan-400/10 bg-white/5 px-5 py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.08)]">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Personal AI System</div>
            <div className="mt-1 text-2xl font-semibold tracking-wide">elZa</div>
          </div>

          <div className="rounded-full border border-cyan-300/10 bg-white/5 px-3 py-1 text-slate-300">
            {currentTime}
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-300">
              Active
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200">
              <Bell className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200">
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-[320px_minmax(520px,1fr)_320px]">
          <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Today</div>
                <h2 className="mt-1 text-lg font-medium">Tasks</h2>
              </div>
              <div className="rounded-full border border-cyan-400/10 bg-cyan-400/10 p-2 text-cyan-200">
                <ListTodo className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left transition hover:border-cyan-300/20 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
                        task.done
                          ? "border-emerald-300/30 bg-emerald-300/15 text-emerald-300"
                          : "border-white/20 bg-white/5 text-slate-400"
                      }`}
                    >
                      {task.done ? <Check className="h-3 w-3" /> : null}
                    </span>
                    <span className={`text-sm ${task.done ? "text-slate-400 line-through" : "text-slate-200"}`}>{task.title}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 transition group-hover:text-cyan-200" />
                </button>
              ))}
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/15">
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </section>

          <section className="relative overflow-hidden rounded-[36px] border border-cyan-300/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.08)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.10),transparent_42%)]" />

            <div className="relative flex h-full min-h-[560px] flex-col">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.32em] text-cyan-300/70">Core Interface</div>
                  <h1 className="mt-1 text-2xl font-semibold">AI Command Center</h1>
                </div>
                <div className="rounded-full border border-cyan-300/10 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">
                  {stateLabel}
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center py-4">
                <div className="relative flex h-[360px] w-[360px] items-center justify-center">
                  <div
                    className={`absolute rounded-full border border-cyan-300/25 ${
                      state === "responding"
                        ? "h-[356px] w-[356px] border-cyan-200/40 shadow-[0_0_35px_rgba(34,211,238,0.22)] animate-ping"
                        : state === "executing"
                        ? "h-[350px] w-[350px] border-emerald-300/35 shadow-[0_0_30px_rgba(110,231,183,0.18)] animate-spin"
                        : "h-[340px] w-[340px] border-cyan-300/25"
                    } opacity-60`}
                    style={{ animationDuration: state === "executing" ? "3.5s" : "2.2s" }}
                  />

                  <div
                    className={`absolute rounded-full border border-cyan-200/15 ${
                      state === "thinking" 
                        ? "h-[300px] w-[300px] border-sky-200/25 shadow-[0_0_24px_rgba(125,211,252,0.12)] animate-spin"
                        : "h-[290px] w-[290px] border-cyan-200/15"
                    }`}
                    style={{ animationDuration: "6s" }}
                  />

                  <div
                    className={`absolute rounded-full blur-3xl ${
                      state === "idle"
                        ? "h-44 w-44 bg-cyan-400/20 animate-pulse"
                        : state === "listening"
                        ? "h-60 w-60 bg-cyan-300/35 animate-pulse"
                        : state === "thinking"
                        ? "h-56 w-56 bg-sky-300/25 animate-pulse"
                        : state === "responding"
                        ? "h-64 w-64 bg-cyan-300/40 animate-pulse"
                        : "h-58 w-58 bg-emerald-300/25 animate-pulse"
                    }`}
                    style={{ animationDuration: state === "idle" ? "3.2s" : "1.2s" }}
                  />

                  <div
                    className={`absolute flex items-center justify-center overflow-hidden rounded-full border border-cyan-200/20 bg-slate-950/60 shadow-[0_0_60px_rgba(34,211,238,0.15)] ${
                      state === "listening" ? "scale-105" : "scale-100"
                    } transition-transform duration-500 h-[220px] w-[220px]`}
                  >
                    <video
                      className="h-full w-full object-cover opacity-85 scale-[2.2]"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster=""
                    >
                      <source src="/elza-core.mp4" type="video/mp4" />
                    </video>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,6,23,0.22)_100%)]" />
        
                  </div>

                  {state === "listening" ? (
                    <div className="absolute -bottom-8 flex items-end gap-1 opacity-90">
                      {[18, 32, 22, 46, 28, 38, 16, 26].map((h, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full bg-cyan-300/80 animate-pulse"
                          style={{ height: `${h}px`, animationDelay: `${i * 120}ms`, animationDuration: "900ms" }}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 text-center">
                  <div className="text-sm uppercase tracking-[0.35em] text-cyan-300/65">State</div>
                  <div className="mt-2 text-3xl font-semibold tracking-wide">{stateLabel}</div>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">{stateHint}</p>
                </div>
              </div>

              <div className="mt-2 rounded-[28px] border border-white/10 bg-slate-950/40 p-4">
                <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
                  <span>Conversation</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                    <span>Demo Flow</span>
                  </div>
                </div>
                <div className="max-h-44 space-y-3 overflow-auto pr-2">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl px-4 py-3 text-sm ${
                        message.role === "assistant"
                          ? "border border-cyan-300/10 bg-cyan-400/10 text-slate-100"
                          : "border border-white/10 bg-white/5 text-slate-300"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.06)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Personal Layer</div>
                <h2 className="mt-1 text-lg font-medium">Memory & Insights</h2>
              </div>
              <div className="rounded-full border border-cyan-400/10 bg-cyan-400/10 p-2 text-cyan-200">
                <BrainCircuit className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                "You usually work better at night.",
                "Your mentor review is due within 2 days.",
                "Task-focused layout is best for your demo.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-slate-300">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-300/10 bg-cyan-400/10 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-cyan-100">
                <Radar className="h-4 w-4" />
                Suggested next step
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Build the dashboard first, then demo one believable interaction: voice trigger, task creation, and AI state transitions.
              </p>
            </div>
          </section>
        </main>

        <footer className="mt-4 rounded-[30px] border border-cyan-300/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1 rounded-2xl border border-cyan-300/15 bg-slate-950/40 px-4 py-3 shadow-[0_0_18px_rgba(34,211,238,0.06)]">
              <div className="flex items-center gap-3">
                <Command className="h-4 w-4 text-cyan-300" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend()
                  }}
                  placeholder="Type a command for elZa..."
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                ref={micButtonRef}
                onClick={simulateVoice}
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/12 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.10)] transition hover:scale-105 hover:border-cyan-300/45 hover:bg-cyan-400/18"
                aria-label="Activate voice mode"
              >
                <span className="absolute inset-0 rounded-full bg-cyan-300/10 blur-md transition group-hover:bg-cyan-300/20" />
                <Mic className="relative h-5 w-5" />
              </button>

              <button
                onClick={handleSend}
                className="inline-flex h-14 items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/12 px-5 text-sm font-medium text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,0.08)] transition hover:scale-[1.02] hover:border-cyan-300/45 hover:bg-cyan-400/18"
              >
                Send
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .738-1.674C19.41 13.854 18 12.138 18 8a6 6 0 1 0-12 0c0 4.138-1.41 5.854-2.738 7.326" />
    </svg>
  )
}

function Settings2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
    </svg>
  )
}

function ListTodo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 6h10" /><path d="M11 12h10" /><path d="M11 18h10" /><path d="m3 6 1 1 2-2" /><path d="m3 12 1 1 2-2" /><path d="m3 18 1 1 2-2" />
    </svg>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5" /></svg>
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6" /></svg>
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.937A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" /></svg>
}

function BrainCircuit(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.176" /><path d="M12 5a3 3 0 1 1 5.997.176" /><path d="M15 13a3 3 0 1 1-6 0" /><path d="M9 13a3 3 0 1 0-6 0" /><path d="M15 13a3 3 0 1 0 6 0" /><path d="M6 13a3 3 0 0 1 3-3" /><path d="M18 13a3 3 0 0 0-3-3" /><path d="M12 8v8" /><path d="M9 17a3 3 0 0 0 6 0" /></svg>
}

function Radar(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19.07 4.93A10 10 0 1 0 21.95 11" /><path d="M12 12 7 7" /><path d="M12 18a6 6 0 0 0 6-6" /><path d="M12 8a4 4 0 0 1 4 4" /></svg>
}

function Command(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 3a3 3 0 1 0 3 3" /><path d="M6 3a3 3 0 1 0 3 3" /><path d="M6 15a3 3 0 1 0 3 3" /><path d="M18 15a3 3 0 1 0 3 3" /><path d="M8.59 13.51 15.42 6.68" /><path d="M8.59 6.68h6.83v6.83" /></svg>
}

function Mic(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 19v3" /><path d="M8 22h8" /><path d="M12 15a4 4 0 0 0 4-4V7a4 4 0 0 0-8 0v4a4 4 0 0 0 4 4Z" /><path d="M19 11a7 7 0 0 1-14 0" /></svg>
}

function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
}
