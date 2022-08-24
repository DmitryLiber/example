export default function (modal, { title, name, phone, btn, send }) {
  $('.js-feedback').on('click', () => {

    const afterOpen = () => {
      $(".form").on('submit',() => {
        return false;
      }); 

      $(".js-feedback-send").on('click', () => {
        ;(async () => {
          const sendResult = send()
          if(await sendResult){
            console.log(sendResult)
            alert(sendResult)
            modal.closed()
          }
        })()
      });
    }

    modal.cfg({
      cross:false,
      afterOpen: [afterOpen],
    })

    modal.open(`
    <form class="form">
      <button class="cross cross_black form__cross js-modal-closed"></button>
      <fieldset>
        <legend>${title}</legend>
        <label for="name">${name}</label>
        <input type="text" id="name">

        <label for="phone">${phone}</label>
        <input type="text" id="phone">
      </fieldset>

      <button class="btn js-feedback-send">${btn}</button>
    </form>
    `)



  })
}
