function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

function falsy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "false" || value === "0"
}

export namespace Flag {
  export const DWTCODE_AUTO_SHARE = truthy("DWTCODE_AUTO_SHARE")
  export const DWTCODE_GIT_BASH_PATH = process.env["DWTCODE_GIT_BASH_PATH"]
  export const DWTCODE_CONFIG = process.env["DWTCODE_CONFIG"]
  export declare const DWTCODE_TUI_CONFIG: string | undefined
  export declare const DWTCODE_CONFIG_DIR: string | undefined
  export const DWTCODE_CONFIG_CONTENT = process.env["DWTCODE_CONFIG_CONTENT"]
  export const DWTCODE_DISABLE_AUTOUPDATE = truthy("DWTCODE_DISABLE_AUTOUPDATE")
  export const DWTCODE_DISABLE_PRUNE = truthy("DWTCODE_DISABLE_PRUNE")
  export const DWTCODE_DISABLE_TERMINAL_TITLE = truthy("DWTCODE_DISABLE_TERMINAL_TITLE")
  export const DWTCODE_PERMISSION = process.env["DWTCODE_PERMISSION"]
  export const DWTCODE_DISABLE_DEFAULT_PLUGINS = truthy("DWTCODE_DISABLE_DEFAULT_PLUGINS")
  export const DWTCODE_DISABLE_LSP_DOWNLOAD = truthy("DWTCODE_DISABLE_LSP_DOWNLOAD")
  export const DWTCODE_ENABLE_EXPERIMENTAL_MODELS = truthy("DWTCODE_ENABLE_EXPERIMENTAL_MODELS")
  export const DWTCODE_DISABLE_AUTOCOMPACT = truthy("DWTCODE_DISABLE_AUTOCOMPACT")
  export const DWTCODE_DISABLE_MODELS_FETCH = truthy("DWTCODE_DISABLE_MODELS_FETCH")
  export const DWTCODE_DISABLE_CLAUDE_CODE = truthy("DWTCODE_DISABLE_CLAUDE_CODE")
  export const DWTCODE_DISABLE_CLAUDE_CODE_PROMPT =
    DWTCODE_DISABLE_CLAUDE_CODE || truthy("DWTCODE_DISABLE_CLAUDE_CODE_PROMPT")
  export const DWTCODE_DISABLE_CLAUDE_CODE_SKILLS =
    DWTCODE_DISABLE_CLAUDE_CODE || truthy("DWTCODE_DISABLE_CLAUDE_CODE_SKILLS")
  export const DWTCODE_DISABLE_EXTERNAL_SKILLS =
    DWTCODE_DISABLE_CLAUDE_CODE_SKILLS || truthy("DWTCODE_DISABLE_EXTERNAL_SKILLS")
  export declare const DWTCODE_DISABLE_PROJECT_CONFIG: boolean
  export const DWTCODE_FAKE_VCS = process.env["DWTCODE_FAKE_VCS"]
  export declare const DWTCODE_CLIENT: string
  export const DWTCODE_SERVER_PASSWORD = process.env["DWTCODE_SERVER_PASSWORD"]
  export const DWTCODE_SERVER_USERNAME = process.env["DWTCODE_SERVER_USERNAME"]
  export const DWTCODE_ENABLE_QUESTION_TOOL = truthy("DWTCODE_ENABLE_QUESTION_TOOL")

  // Experimental
  export const DWTCODE_EXPERIMENTAL = truthy("DWTCODE_EXPERIMENTAL")
  export const DWTCODE_EXPERIMENTAL_FILEWATCHER = truthy("DWTCODE_EXPERIMENTAL_FILEWATCHER")
  export const DWTCODE_EXPERIMENTAL_DISABLE_FILEWATCHER = truthy("DWTCODE_EXPERIMENTAL_DISABLE_FILEWATCHER")
  export const DWTCODE_EXPERIMENTAL_ICON_DISCOVERY =
    DWTCODE_EXPERIMENTAL || truthy("DWTCODE_EXPERIMENTAL_ICON_DISCOVERY")

  const copy = process.env["DWTCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
  export const DWTCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT =
    copy === undefined ? process.platform === "win32" : truthy("DWTCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const DWTCODE_ENABLE_EXA =
    truthy("DWTCODE_ENABLE_EXA") || DWTCODE_EXPERIMENTAL || truthy("DWTCODE_EXPERIMENTAL_EXA")
  export const DWTCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = number("DWTCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS")
  export const DWTCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = number("DWTCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX")
  export const DWTCODE_EXPERIMENTAL_OXFMT = DWTCODE_EXPERIMENTAL || truthy("DWTCODE_EXPERIMENTAL_OXFMT")
  export const DWTCODE_EXPERIMENTAL_LSP_TY = truthy("DWTCODE_EXPERIMENTAL_LSP_TY")
  export const DWTCODE_EXPERIMENTAL_LSP_TOOL = DWTCODE_EXPERIMENTAL || truthy("DWTCODE_EXPERIMENTAL_LSP_TOOL")
  export const DWTCODE_DISABLE_FILETIME_CHECK = truthy("DWTCODE_DISABLE_FILETIME_CHECK")
  export const DWTCODE_EXPERIMENTAL_PLAN_MODE = DWTCODE_EXPERIMENTAL || truthy("DWTCODE_EXPERIMENTAL_PLAN_MODE")
  export const DWTCODE_EXPERIMENTAL_WORKSPACES = DWTCODE_EXPERIMENTAL || truthy("DWTCODE_EXPERIMENTAL_WORKSPACES")
  export const DWTCODE_EXPERIMENTAL_MARKDOWN = !falsy("DWTCODE_EXPERIMENTAL_MARKDOWN")
  export const DWTCODE_MODELS_URL = process.env["DWTCODE_MODELS_URL"]
  export const DWTCODE_MODELS_PATH = process.env["DWTCODE_MODELS_PATH"]
  export const DWTCODE_DISABLE_CHANNEL_DB = truthy("DWTCODE_DISABLE_CHANNEL_DB")
  export const DWTCODE_SKIP_MIGRATIONS = truthy("DWTCODE_SKIP_MIGRATIONS")
  export const DWTCODE_DISABLE_CONFIG_DEPS = truthy("DWTCODE_DISABLE_CONFIG_DEPS")
  export const DWTCODE_STRICT_CONFIG_DEPS = truthy("DWTCODE_STRICT_CONFIG_DEPS")

  function number(key: string) {
    const value = process.env[key]
    if (!value) return undefined
    const parsed = Number(value)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
  }
}

// Dynamic getter for DWTCODE_DISABLE_PROJECT_CONFIG
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "DWTCODE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthy("DWTCODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for DWTCODE_TUI_CONFIG
// This must be evaluated at access time, not module load time,
// because tests and external tooling may set this env var at runtime
Object.defineProperty(Flag, "DWTCODE_TUI_CONFIG", {
  get() {
    return process.env["DWTCODE_TUI_CONFIG"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for DWTCODE_CONFIG_DIR
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "DWTCODE_CONFIG_DIR", {
  get() {
    return process.env["DWTCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for DWTCODE_CLIENT
// This must be evaluated at access time, not module load time,
// because some commands override the client at runtime
Object.defineProperty(Flag, "DWTCODE_CLIENT", {
  get() {
    return process.env["DWTCODE_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})
