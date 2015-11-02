"use babel"

import types from './types'

// const types = [{
//   'Non-breaking space'
// }]

export default {

  name: "Invisible",

  grammarScopes: ['*'],

  scope: 'file',

  lintOnFly: true,

  lint: function(textEditor) {

    return new Promise((resolve) => {
      const filePath = textEditor.getPath()
      const messages = textEditor.getText()
        .split(/\r?\n/)
        .reduce((all, line, lineIdx) => {
          return all.concat(this.extractMessages(line, lineIdx, filePath))
        }, [])
        .map(message => this.formatMessage(message))

      resolve(messages)
    })
  },

  extractMessages(line, lineIdx, filePath) {
    const messages = []


    types.forEach(type => {
      let match = line.match(type.exp)
      if (match) {
        messages.push({ type, match, line, lineIdx, filePath })
      }
    })

    return messages
  },

  formatMessage(message) {
    return {
      type: message.type.type,
      text: message.type.title,
      filePath: message.filePath,
      range: [
        [ message.lineIdx, message.match.index ],
        [ message.lineIdx, message.match.index +  message.match[0].length]
      ]
    }
  }
}
