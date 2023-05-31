import dotenv from 'dotenv'

dotenv.config()

type IEnvVars =
  | 'PHRASE'
  | 'DEPLOYER'
  | 'ROOT_OWNER_ADDRESS'
  | 'REMAINING_GAS_TO'
  | 'NAME'
  | 'SYMBOL'
  | 'INITIAL_SUPPLY_TO'
  | 'INITIAL_SUPPLY'
  | 'DECIMALS'
  | 'DISABLE_MINT'
  | 'DISABLE_BURN_BY_ROOT'
  | 'PAUSE_BURN'

export function useEnv(key: IEnvVars | IEnvVars[], _default = ''): string {
  if (typeof key === 'string') {
    return process.env[key] ?? _default
  }
  if (typeof key === 'object') {
    for (const s of key) {
      if (process.env[s]) {
        return process.env[s]!
      }
    }
  }
  return _default
}
