const test = require('brittle')
const NL = require('.')

test('basic', function (t) {
  const nl = new NL()

  t.alike(nl.push('abe\nfest\ner\r\nsjov'), ['abe', 'fest', 'er'])
  t.alike(nl.end(), ['sjov'])
})

test('basic chunked', function (t) {
  const nl = new NL()

  t.alike(nl.push('abe\nfest\ner\r\nsjov'), ['abe', 'fest', 'er'])
  t.alike(nl.push('...'), [])
  t.alike(nl.push('!\r'), [])
  t.alike(nl.push('\n'), ['sjov...!'])
  t.alike(nl.end(), [])
})
