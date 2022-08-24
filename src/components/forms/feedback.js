export default function (modal, { title, name, phone, btn }) {
  $('.js-feedback').on('click', () => {
    modal.open(`
    <div class="container">
      <form class="form">
        <h3>${title}</h3>
        <label for="name">${name}</label>
        <input type="text" id="name">

        <label for="phone">${phone}</label>
        <input type="text" id="phone">

        <button class="btn js-feedback-send">${btn}</button>
      </form>
    </div>
    `)
  })

  $('.js-feedback-send').on('click', (e) => {
    e.preventDefault()
    alert('form send')
  })
}
