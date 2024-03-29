const TextDecoder = require('text-decoder')

module.exports = class NewlineDecoder {
  constructor (enc) {
    this.decoder = new TextDecoder(enc || 'utf-8')
    this.buffer = ''
  }

  push (data) {
    let pos = this.buffer.length
    if (typeof data === 'string') this.buffer += data
    else this.buffer += this.decoder.push(data)

    pos = this.buffer.indexOf('\n', pos)
    const lines = []
    while (pos > -1) {
      const end = (pos > 0 && this.buffer.charCodeAt(pos - 1) === 13) ? pos - 1 : pos
      lines.push(this.buffer.slice(0, end))
      this.buffer = this.buffer.slice(pos + 1)
      pos = this.buffer.indexOf('\n')
    }
    return lines
  }

  end () {
    const buf = this.buffer + this.decoder.end()
    this.buffer = ''
    return buf ? [buf] : []
  }
}
