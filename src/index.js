/* modules */
const addHours = require('date-fns/add_hours')
const formatDate = require('date-fns/format')

/* internal dependencies */
const { getImages } = require('./service/imagesService')
const { uploadRandomImage } = require('./service/twitService')

const hourInSeconds = 216000

const performTweet = () => {
  const nextTweetDate = formatDate(addHours(new Date(), 1), 'H:mm (MM/DD)')
  console.log(`O próximo post vai rolar às ${nextTweetDate}`);

  getImages()
    .then(images => {
      uploadRandomImage(images)
    })
    .catch(err => {
      console.log(err)
    })
}

performTweet()
setInterval(() => {  performTweet() }, hourInSeconds)
