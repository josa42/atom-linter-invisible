"use babel"

import LinterEsprimaProvider from './linter-invisible-provider'

module.exports = {

  activate() {
    if (atom.inDevMode()) {
      console.log('activate linter-invisible')
    }
    require('atom-package-deps').install('linter-invisible')
  },

  provideLinter() { return LinterEsprimaProvider }
}
