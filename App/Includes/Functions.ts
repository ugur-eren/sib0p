export default new (class Functions {
    convertTime = (time: number, currentTime: number): string => {
        let past = currentTime - time;
        if (past < 10){
            return "Biraz önce"
        }
        if (past < 60){
            return past + " saniye önce"
        }
        if (Math.floor(past / 60) < 60){
            return Math.floor(past / 60) + " dakika önce"
        }
        if (Math.floor(past / 3600) < 24){
            return Math.floor(past / 3600) + " saat önce"
        }
        if (Math.floor(past / 86400) < 7){
            return Math.floor(past / 86400) + " gün önce"
        }
        if (Math.floor(past / 86400) < 31){
            return Math.floor(past / 604800) + " hafta önce"
        }
        if (Math.floor(past / 2592000) < 12){
            return Math.floor(past / 2592000) + " ay önce"
        }
        return Math.floor(past / 31104000) + " yıl önce"
    }
})()
