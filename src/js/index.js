;(function () {
  // 定数
  const MOUSEDOWN = 'mousedown'
  const SELECTED = 'selected'
  const SPACE = 'Space'

  // 設定の取得
  const { scramble, pll, selector } = require('./config.js')

  // 要素の取得
  const viewTime = document.querySelector(selector.viewTime)
  const viewScramble = document.querySelector(selector.viewScramble)
  const btnStart = document.querySelector(selector.btnStart)
  const btnStop = document.querySelector(selector.btnStop)
  const btnReset = document.querySelector(selector.btnReset)
  const cellElem = document.querySelectorAll(selector.cells)

  // oo(数値(0〜99))で2桁「00」にフォーマット
  const oo = num => ('00' + Math.floor(num)).slice(-2)

  // formatTime(ミリ秒)で「00'00"00」にフォーマット
  const formatTime = time => {
    const centisec = (time % 1000) / 10
    const sec = time / 1000
    const min = sec / 60
    return `${oo(min)}'${oo(sec)}"${oo(centisec)}`
  }

  // redrawTime(ミリ秒)でTIMEを「00'00"00」で再描画
  const redrawTime = time => (viewTime.textContent = formatTime(time))

  // cells[x][y]に要素を格納
  let cells = new Array(5)
  cellElem.forEach((elem, i) => {
    if (!cells[i % 5]) cells[i % 5] = []
    cells[i % 5].push(elem)
  })

  // 表示をリセット
  const reset = () => {
    redrawTime(0)
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        cells[x][y].textContent =
          x === 2 && y === 2
            ? 'FREE'
            : x === 0 || x === 4 || y === 0 || y === 4
              ? `OLL${oo(Math.random() * 57 + 1)}`
              : pll[Math.floor(Math.random() * pll.length)]
      }
    }
  }
  reset()

  // カウンタとフラグを初期化
  let timer = null
  let isTimer = false
  let startTime = 0
  let countToAdd = 0

  // STARTがクリックされたとき
  const onStart = event => {
    if (!isTimer) {
      isTimer = true
      startTime = Date.now() - countToAdd
      timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        redrawTime(elapsedTime)
      }, 10)
    }
  }

  // STOPがクリックされたとき
  const onStop = event => {
    if (isTimer) {
      isTimer = false
      countToAdd = Date.now() - startTime
      clearInterval(timer)
    }
  }

  // RESETがクリックされたとき
  const onReset = event => {
    if (!isTimer) {
      reset()
    }
  }

  // セルがクリックされたとき
  const onCells = event => {
    if (!isTimer) {
      const target = event.target
      const isSelected = target.classList.contains(SELECTED)
      if (isSelected) {
        target.classList.remove(SELECTED)
      } else {
        target.classList.add(SELECTED)
      }
    }
  }

  // キーが押されたとき
  const onKeydown = event => {
    if (event.code === SPACE) {
      if (isTimer) {
        onStop()
      } else {
        onStart()
      }
    }
  }

  // イベントを設定
  btnStart.addEventListener(MOUSEDOWN, onStart)
  btnStop.addEventListener(MOUSEDOWN, onStop)
  btnReset.addEventListener(MOUSEDOWN, onReset)
  document.onkeydown = onKeydown
  cellElem.forEach(elem => elem.addEventListener(MOUSEDOWN, onCells))
})()
