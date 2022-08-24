export default class Modal {
  constructor() {
    this.count = 0
    this.afterClosed = ''
    this.hiding = false
    this.scrollWidth = ''
    this.cross = true
    this.init()
  }

  init() {
    $('body').prepend(
      '<div class="checkWidth" style="overflow-y:scroll;height:50px;width:50px;visibility:hidden;"></div>'
    )

    const scrollWidth = setTimeout(() => {
      this.scrollWidth =
        $('.checkWidth')[0].offsetWidth - $('.checkWidth')[0].clientWidth
      $('.checkWidth').remove()
    }, 10)

    //scrollWidth()

    $(window).on('size', () => {
      scrollWidth()

      console.log(this.scrollWidth)
    })

    $(document).on('click', '.modal__closed', () => this.closed())
    $(document).on('click', '.modal__cross', () => this.closed())

    $(document).on('keyup', (e) => {
      if (e.keyCode === 27) this.closed()
    })
  }

  cfg(newcfg) {
    Object.keys(newcfg).forEach((cfg) => (this[cfg] = newcfg[cfg]))
  }

  getLast() {
    return $('.modal' + this.count)
  }

  open(body) {
    if (this.count === 0) {
      $('body').css({
        overflow: 'hidden',
        'padding-right': `${this.scrollWidth}px`,
      })

      if ($(document).find('.header').length > 0) {
        $(document)
          .find('.header')
          .css({ 'margin-right': `${this.scrollWidth}px` })
      }
    }

    this.count++

    $('body').prepend(`
    <div class="modal modal${this.count}" style="z-index:${69 + this.count};">
      ${this.cross ? '<div class="cross modal__cross"></div>' : ''}
      <div class="modal__closed" style="right:${this.scrollWidth}px;"></div>
      <div class="modal__body">${body}</div>
    </div>
    `)

    setTimeout(() => $('.modal' + this.count).addClass('modal_show'), 0)
  }

  closed() {
    if (!this.hiding) {
      this.hiding = true
      const modal = $(document).find('.modal' + this.count)

      modal.removeClass('modal_show')

      setTimeout(() => {
        modal.remove()
        this.count--
        this.hiding = false

        if (this.count === 0) {
          $('body').attr('style', '')
          if ($(document).find('.header').length > 0) {
            $(document).find('.header').attr('style', '')
          }
        }

        if (this.afterClosed.length < 1) return

        this.afterClosed[1] === undefined
          ? this.afterClosed[0]()
          : this.afterClosed[0](this.afterClosed[1])
      }, 310)
    }
  }
}
