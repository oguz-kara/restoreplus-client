import util from 'util'

export function consoleLog(item: any) {
  console.log(
    util.inspect(item, { showHidden: false, depth: null, colors: true })
  )
}
