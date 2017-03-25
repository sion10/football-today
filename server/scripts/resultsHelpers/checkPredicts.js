let Prediction = require('../../models/prediction');
let Tip = require('../../models/tip');

let checkPredicts = () => {
    console.log('started checking predicts')
    Prediction.find({ status: 'pending' }).exec()
        .then((predicts) => {
            predicts.forEach((predict) => {
                predict.populate('tips').execPopulate()
                    .then((item) => {
                        let counter = 0
                        let openCounter = 0
                        for (let i = 0; i < item.tips.length; i++) {
                            if (item.tips[i].status === 'lost') {
                                item.status = 'lost'
                                item.populate('user').execPopulate()
                                    .then((predWithUser) => {
                                        predWithUser.user.points < 2 ? predWithUser.user.points = 1 : predWithUser.user.points -= 1
                                        predWithUser.user.save()
                                            .then(() => {
                                                predict.save()
                                                return
                                            })
                                    })
                            }
                            else if (item.tips[i].status === 'open') {
                                openCounter++
                                if (openCounter === item.tips.length) {
                                    return
                                }
                            }
                            else {
                                counter++
                                if (counter === item.tips.length) {
                                    predict.status = 'won'
                                    predict.populate('user').execPopulate()
                                        .then((predWithUser) => {
                                            predWithUser.user.points += predict.coef
                                            predWithUser.user.save()
                                                .then(() => {
                                                    predict.save()
                                                    return
                                                })
                                        })
                                }
                            }
                        }
                    }).catch((err)=>console.log(err))
            })
        })
}

module.exports = checkPredicts