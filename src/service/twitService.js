/* modules */
const path = require('path')
const fs = require('fs')
const Twit = require('twit')

/* internal dependencies */
const config = require('../config/production')
const getRandomImage = require('../util/getRandomImage')

const T = new Twit(config)

const uploadRandomImage = (images) => {
  if (images.length) {
    console.log('[1/4] - Selecionando uma imagem aleatóriamente supimpa')

    const imageToPost = getRandomImage(images)
    const imgPath = path.join(__dirname, '..', `/images/museum/${imageToPost}`)
    const b64content = fs.readFileSync(imgPath, { encoding: 'base64' })

    console.log('[2/4] - Fazendo upload da imagem para o museu')

    T.post('media/upload', { media_data: b64content })
      .then(({ data: uploadData }) => {
        console.log('[3/4] - Upload relizado com sucesso, agora é só mandar o tweet...')

        T.post('statuses/update', { media_ids: new Array(uploadData.media_id_string) })
          .then(tweetData => {
            console.log('[4/4] - Tweet sapecado com sucesso, damn nigga')
            moveUploadedImage(imageToPost)
          })
      })
  } else {
    console.log('Opa, tá na hora de adicionar mais fotos ao acervo bro');
  }
}

const moveUploadedImage = (imageToPost) => {
  const imagesFolderPath = path.join(__dirname, '..', '/images')
  const museumImgPath = `${imagesFolderPath}/museum/${imageToPost}`
  const postedImgPath = `${imagesFolderPath}/posted/${imageToPost}`

  fs.rename(museumImgPath, postedImgPath, (err) => {
    if (err) {
      console.log('Ocorreu um erro ao mover a imagem postada para pasta posted, dá uma olhada nisso ae plz')
    }
  })
}

module.exports = { uploadRandomImage }