import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  globalSetup: '<rootDir>/__tests__/globalSetup.ts',
  globalTeardown: '<rootDir>/__tests__/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupFile.ts'],
}

export default config
