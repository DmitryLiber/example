const delay = async (ms) =>
await new Promise((resolve) => setTimeout(resolve, ms))

const common = {
  forms: {
    feedback: {
      title: 'Обратный звонок',
      name: 'Ваше имя',
      phone: 'Ваш телефон',
      btn: 'Отправить',
      send:  () => delay(1000).then(() => JSON.stringify('Форма успешно отправленна!'))
    },
  },
}
