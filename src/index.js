import '@babel/polyfill'
import 'styles/style.scss'

import Modal from './components/modal/modal'
import Cards from 'components/cards/cards'
import FormFeedBack from 'components/forms/feedback'

const modal = new Modal()

$(document).ready(() => {
  FormFeedBack(modal, common.forms.feedback)
  Cards(modal)
})
